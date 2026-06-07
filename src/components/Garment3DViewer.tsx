"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import type { GarmentType } from "@/data/garments";
import { getFabricTextureStyle } from "@/lib/fabricTexture";
import {
  type GarmentViewKey,
  getClosestViewByAngle,
  getGarmentViewAsset,
  getGarmentViewAssetByView,
} from "@/lib/garmentAssets";

type Garment3DViewerProps = {
  garment: GarmentType;
  colorHex: string;
  colorName: string;
  productName?: string;
  fabric?: string;
};

type ViewerMode = "garment" | "fabric";

const thumbnailViews: Array<{ label: string; view: GarmentViewKey; angle: number; mode: ViewerMode }> = [
  { label: "Frontal", view: "front-3q-right", angle: 45, mode: "garment" },
  { label: "Lateral", view: "right", angle: 90, mode: "garment" },
  { label: "Espalda", view: "back", angle: 180, mode: "garment" },
  { label: "Detalle tela", view: "fabric-detail", angle: 45, mode: "fabric" },
];

export function Garment3DViewer({ garment, colorHex, colorName, productName, fabric }: Garment3DViewerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const spriteMaterialRef = useRef<THREE.SpriteMaterial | null>(null);
  const spriteRef = useRef<THREE.Sprite | null>(null);
  const fallbackMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const fallbackGroupRef = useRef<THREE.Group | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);
  const angleRef = useRef(45);
  const [angle, setAngle] = useState(45);
  const [activeMode, setActiveMode] = useState<ViewerMode>("garment");
  const [assetReady, setAssetReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  const activeAsset = useMemo(() => getGarmentViewAsset(garment, colorName, angle), [angle, colorName, garment]);
  const fabricAsset = useMemo(() => getGarmentViewAssetByView(garment, colorName, "fabric-detail"), [colorName, garment]);
  const displayAsset = activeMode === "fabric" ? fabricAsset : activeAsset;
  const activeView = displayAsset.view;

  useEffect(() => {
    queueMicrotask(() => setImageSrc(displayAsset.path));
  }, [displayAsset.path]);

  useEffect(() => {
    const currentHost = hostRef.current;
    if (!currentHost) return;
    const hostElement: HTMLDivElement = currentHost;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f7fbff");

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    hostElement.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight("#ffffff", "#dbe6f6", 1.8);
    scene.add(hemi);

    const key = new THREE.DirectionalLight("#ffffff", 2.2);
    key.position.set(4, 5, 5);
    scene.add(key);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.75, 64),
      new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.92, transparent: true, opacity: 0.86 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.72;
    floor.receiveShadow = true;
    scene.add(floor);

    const spriteMaterial = new THREE.SpriteMaterial({
      color: "#ffffff",
      transparent: true,
      depthWrite: false,
    });
    spriteMaterialRef.current = spriteMaterial;

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.y = -0.08;
    sprite.scale.set(3.65, 3.65, 1);
    spriteRef.current = sprite;
    scene.add(sprite);

    const fallbackMaterial = new THREE.MeshStandardMaterial({
      color: colorHex,
      map: createFabricTexture(colorHex),
      roughness: fabric?.toLowerCase().includes("dry") || fabric?.toLowerCase().includes("supplex") ? 0.56 : 0.82,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    fallbackMaterialRef.current = fallbackMaterial;

    const fallbackGroup = buildGarmentGroup({ garment, productName, material: fallbackMaterial });
    fallbackGroup.scale.setScalar(garment === "sport" && productName === "Jogger" ? 0.78 : 0.86);
    fallbackGroup.position.y = -0.08;
    fallbackGroup.visible = false;
    fallbackGroupRef.current = fallbackGroup;
    scene.add(fallbackGroup);

    textureLoaderRef.current = new THREE.TextureLoader();

    function resize() {
      const rect = hostElement.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 360);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(hostElement);

    let frame = 0;
    let raf = 0;
    function animate() {
      frame += 0.01;
      const normalized = ((angleRef.current % 360) + 360) % 360;
      sprite.position.y = Math.sin(frame) * 0.012 - 0.08;
      fallbackGroup.rotation.y = THREE.MathUtils.degToRad(normalized);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [colorHex, fabric, garment, productName]);

  useEffect(() => {
    const material = spriteMaterialRef.current;
    const loader = textureLoaderRef.current;
    if (!material || !loader) return;

    queueMicrotask(() => {
      setAssetReady(false);
      setUsingFallback(false);
    });

    if (activeMode === "fabric") {
      if (spriteRef.current) spriteRef.current.visible = true;
      if (fallbackGroupRef.current) fallbackGroupRef.current.visible = false;
      material.map?.dispose();
      material.map = createFabricTexture(colorHex, fabric);
      material.needsUpdate = true;
      queueMicrotask(() => setAssetReady(true));
      return;
    }

    const asset = activeAsset;

    loader.load(
      asset.path,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        material.map?.dispose();
        material.map = texture;
        material.needsUpdate = true;
        if (spriteRef.current) spriteRef.current.visible = true;
        if (fallbackGroupRef.current) fallbackGroupRef.current.visible = false;
        setAssetReady(true);
      },
      undefined,
      () => {
        loader.load(
          asset.fallbackPath,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map?.dispose();
            material.map = texture;
            material.needsUpdate = true;
            if (spriteRef.current) spriteRef.current.visible = true;
            if (fallbackGroupRef.current) fallbackGroupRef.current.visible = false;
            setAssetReady(true);
          },
          undefined,
          () => {
            if (spriteRef.current) spriteRef.current.visible = false;
            if (fallbackGroupRef.current) fallbackGroupRef.current.visible = true;
            setUsingFallback(true);
            setAssetReady(true);
          }
        );
      }
    );
  }, [activeAsset, activeMode, colorHex, fabric]);

  useEffect(() => {
    if (!fallbackMaterialRef.current) return;
    fallbackMaterialRef.current.color.set(colorHex);
    fallbackMaterialRef.current.map?.dispose();
    fallbackMaterialRef.current.map = createFabricTexture(colorHex, fabric);
    fallbackMaterialRef.current.needsUpdate = true;
  }, [colorHex, fabric]);

  function chooseView(nextMode: ViewerMode, nextAngle: number) {
    setActiveMode(nextMode);
    angleRef.current = nextAngle;
    setAngle(nextAngle);
  }

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (activeMode !== "garment") return;
    draggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || activeMode !== "garment") return;
    const delta = event.clientX - dragStartXRef.current;
    dragStartXRef.current = event.clientX;
    const nextAngle = angleRef.current + delta * 0.72;
    angleRef.current = nextAngle;
    setAngle(nextAngle);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div>
      <div
        className={`relative h-[460px] touch-none overflow-hidden rounded-lg bg-[radial-gradient(circle_at_30%_15%,#ffffff,#f8fbff_54%,#eef4fb)] sm:h-[560px] ${
          activeMode === "garment" ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={hostRef}
          className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${usingFallback && assetReady ? "opacity-100" : "opacity-0"}`}
        />
        {activeMode === "garment" && imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${garment} ${activeView}`}
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            draggable={false}
            className={`pointer-events-none z-10 scale-125 select-none object-contain p-2 transition-opacity duration-300 ${
              assetReady ? "opacity-100" : "opacity-0"
            }`}
            priority={false}
            onError={() => {
              if (imageSrc !== displayAsset.fallbackPath) setImageSrc(displayAsset.fallbackPath);
              else setUsingFallback(true);
            }}
          />
        ) : null}
        {activeMode === "fabric" ? (
          <div className={`absolute inset-8 z-20 flex items-center justify-center transition-opacity duration-300 ${assetReady ? "opacity-100" : "opacity-0"}`}>
            <div
              className="aspect-square w-full max-w-[360px] rounded-lg border border-white/80 shadow-inner"
              style={getFabricTextureStyle(colorHex, fabric)}
            />
          </div>
        ) : null}
        {!assetReady ? (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" />
        ) : null}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700 shadow-sm">
          {usingFallback ? "3D fallback" : activeMode === "fabric" ? "Detalle de tela" : "Pseudo-3D multivista"}
        </div>
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700 shadow-sm">
          {colorName}
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />
        </div>
        <div className="absolute bottom-4 left-4 rounded-lg bg-white/92 px-3 py-2 text-xs font-semibold leading-5 text-slate-600 shadow-sm">
          {activeMode === "fabric" ? fabric ?? "Textura de tela" : `Arrastra para girar · ${activeView}`}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {thumbnailViews.map((item) => {
          const thumbAsset = getGarmentViewAssetByView(garment, colorName, item.view);
          const selected = activeMode === item.mode && (item.mode === "fabric" || getClosestViewByAngle(angle) === item.view);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => chooseView(item.mode, item.angle)}
              className={`rounded-lg border bg-white p-2 text-center text-xs font-bold transition ${
                selected ? "border-blue-700 text-blue-700 ring-2 ring-blue-100" : "border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              <span
                className="block aspect-square rounded-md bg-slate-50 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${thumbAsset.path})`,
                }}
              />
              <span className="mt-2 block text-[11px] leading-4">{item.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold leading-5 text-blue-950">
        Vista referencial. El acabado final puede variar según tela y confección.
      </p>
    </div>
  );
}

function createFabricTexture(colorHex: string, fabric?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, 256, 256);
  const lowerFabric = fabric?.toLowerCase() ?? "";
  const spacing = lowerFabric.includes("oxford") || lowerFabric.includes("piqué") ? 10 : lowerFabric.includes("lino") ? 16 : 7;

  ctx.globalAlpha = 0.16;
  for (let index = 0; index < 256; index += spacing) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(index, 0, 1, 256);
    ctx.fillStyle = "#07122f";
    ctx.fillRect(0, index, 256, 1);
  }
  ctx.globalAlpha = lowerFabric.includes("chambray") || lowerFabric.includes("drill") ? 0.16 : 0.08;
  for (let index = -256; index < 256; index += spacing + 5) {
    ctx.beginPath();
    ctx.moveTo(index, 256);
    ctx.lineTo(index + 256, 0);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = lowerFabric.includes("french") ? 4 : 2;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function buildGarmentGroup({
  garment,
  productName,
  material,
}: {
  garment: GarmentType;
  productName?: string;
  material: THREE.MeshStandardMaterial;
}) {
  const group = new THREE.Group();
  if (garment === "camisa") group.add(buildShirt(material));
  if (garment === "pantalon") group.add(buildPants(material, false));
  if (garment === "sport") {
    if (productName === "Jogger") {
      const top = buildTShirt(material);
      top.position.x = -0.9;
      const pants = buildPants(material, true);
      pants.position.x = 0.95;
      group.add(top, pants);
    } else if (productName === "Short") {
      group.add(buildShort(material));
    } else if (productName === "Polera" || productName === "Casaca ligera") {
      group.add(buildHoodie(material));
    } else {
      group.add(buildTShirt(material));
    }
  }
  return group;
}

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(...position);
  item.rotation.set(...rotation);
  item.castShadow = true;
  item.receiveShadow = true;
  return item;
}

function buildShirt(material: THREE.Material) {
  const group = new THREE.Group();
  const torso = mesh(new THREE.BoxGeometry(1.45, 2.15, 0.28, 8, 12, 2), material, [0, 0, 0]);
  torso.scale.set(0.88, 1, 1);
  const leftSleeve = mesh(new THREE.CapsuleGeometry(0.18, 1.35, 8, 16), material, [-0.92, 0.25, 0], [0, 0, -0.22]);
  const rightSleeve = mesh(new THREE.CapsuleGeometry(0.18, 1.35, 8, 16), material, [0.92, 0.25, 0], [0, 0, 0.22]);
  const collar = mesh(new THREE.TorusGeometry(0.34, 0.06, 10, 36, Math.PI * 1.35), new THREE.MeshStandardMaterial({ color: "#f7fbff", roughness: 0.7 }), [0, 1.18, 0.08], [Math.PI / 2, 0, 0]);
  const placket = mesh(new THREE.BoxGeometry(0.07, 1.8, 0.035), new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.85 }), [0, 0.02, 0.17]);
  group.add(torso, leftSleeve, rightSleeve, collar, placket);
  return group;
}

function buildTShirt(material: THREE.Material) {
  const group = new THREE.Group();
  group.add(mesh(new THREE.BoxGeometry(1.35, 1.65, 0.25, 8, 8, 2), material, [0, 0.05, 0]));
  group.add(mesh(new THREE.CapsuleGeometry(0.2, 0.78, 8, 16), material, [-0.84, 0.55, 0], [0, 0, -0.72]));
  group.add(mesh(new THREE.CapsuleGeometry(0.2, 0.78, 8, 16), material, [0.84, 0.55, 0], [0, 0, 0.72]));
  group.add(mesh(new THREE.TorusGeometry(0.28, 0.055, 8, 32), new THREE.MeshStandardMaterial({ color: "#f3f7fb", roughness: 0.8 }), [0, 0.95, 0.09], [Math.PI / 2, 0, 0]));
  return group;
}

function buildHoodie(material: THREE.Material) {
  const group = buildTShirt(material);
  group.scale.set(1.08, 1.08, 1.08);
  group.add(mesh(new THREE.TorusGeometry(0.44, 0.13, 12, 36, Math.PI * 1.2), material, [0, 1.12, -0.04], [Math.PI / 2, 0, Math.PI * 0.15]));
  group.add(mesh(new THREE.BoxGeometry(0.62, 0.32, 0.04), new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.85, transparent: true, opacity: 0.22 }), [0, -0.38, 0.16]));
  return group;
}

function buildPants(material: THREE.Material, jogger: boolean) {
  const group = new THREE.Group();
  const waist = mesh(new THREE.BoxGeometry(1.25, 0.24, 0.22), material, [0, 0.95, 0]);
  const leftLeg = mesh(new THREE.CapsuleGeometry(jogger ? 0.22 : 0.18, 2.3, 10, 22), material, [-0.32, -0.25, 0], [0.02, 0, 0.03]);
  const rightLeg = mesh(new THREE.CapsuleGeometry(jogger ? 0.22 : 0.18, 2.3, 10, 22), material, [0.32, -0.25, 0], [0.02, 0, -0.03]);
  const creaseMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.9, transparent: true, opacity: 0.18 });
  group.add(waist, leftLeg, rightLeg);
  group.add(mesh(new THREE.BoxGeometry(0.035, 2.1, 0.025), creaseMat, [-0.32, -0.25, 0.22]));
  group.add(mesh(new THREE.BoxGeometry(0.035, 2.1, 0.025), creaseMat, [0.32, -0.25, 0.22]));
  return group;
}

function buildShort(material: THREE.Material) {
  const group = new THREE.Group();
  group.add(mesh(new THREE.BoxGeometry(1.35, 0.3, 0.24), material, [0, 0.55, 0]));
  group.add(mesh(new THREE.CapsuleGeometry(0.26, 0.9, 8, 16), material, [-0.35, 0.02, 0]));
  group.add(mesh(new THREE.CapsuleGeometry(0.26, 0.9, 8, 16), material, [0.35, 0.02, 0]));
  group.position.y = 0.35;
  return group;
}

# Configurador 3D de prendas

## Objetivo

Agregar visualizacion 3D interactiva para camisa, pantalon y ropa sport, con cambio de color en vivo segun la seleccion del usuario.

## Librerias revisadas

### Three.js

Three.js permite crear escenas WebGL con camara, luces, materiales, geometria, texturas y modelos importados. Es la opcion usada en el prototipo porque da control directo sobre:

- Color de material.
- Textura procedural de tela.
- Luces y sombras.
- Geometrias por tipo de prenda.
- Futuro reemplazo por modelos `.glb` o `.gltf`.

Referencias:

- `MeshStandardMaterial`: https://threejs.org/docs/pages/MeshStandardMaterial.html
- `WebGLRenderer`: https://threejs.org/docs/pages/WebGLRenderer.html
- `GLTFLoader`: https://threejs.org/docs/pages/GLTFLoader.html
- Guia de carga glTF: https://threejs.org/manual/en/load-gltf.html

### model-viewer

`<model-viewer>` es muy bueno para mostrar modelos `.glb` rapidamente y tambien permite manipular materiales desde JavaScript. Es una alternativa si se quiere integrar un visor mas simple, con menos codigo propio.

Referencia:

- Materiales y escena: https://modelviewer.dev/examples/scenegraph/

## Implementacion actual

Archivo principal:

- `src/components/Garment3DViewer.tsx`
- `src/components/Configurator.tsx`

El componente:

- Crea una escena Three.js dentro de un componente client.
- Usa `WebGLRenderer`, camara perspectiva, luces direccionales y hemisfericas.
- Construye prendas procedurales:
  - Camisa.
  - Pantalon.
  - Polo.
  - Jogger como conjunto sport.
  - Polera/casaca ligera.
  - Short.
- Aplica un `MeshStandardMaterial` con color dinamico.
- Crea una textura procedural tipo tejido usando `CanvasTexture`.
- Permite rotar la prenda arrastrando con el mouse o touch.
- Libera geometria, materiales, texturas y renderer al desmontarse.

## Imagenes realistas generadas

Se crearon tres assets raster de referencia, uno por categoria:

- `public/assets/garment-shirt-real.png`
- `public/assets/garment-pants-real.png`
- `public/assets/garment-sport-real.png`

Estas imagenes sirven como referencia visual realista dentro del modulo. El cambio de color interactivo se maneja en el visor 3D, porque cambiar el color de una foto raster con calidad comercial requiere mascaras, segmentacion o render IA por variante.

## Cambio de color

El color seleccionado en el configurador se convierte en `colorHex`. Ese valor se pasa a `Garment3DViewer` y actualiza:

- `material.color`.
- `material.map`, regenerando una textura de tela del mismo color.

Esto permite que camisa, pantalon y sport cambien de color sin recargar la pagina.

## Limitacion actual

Las prendas 3D son modelos procedurales, no modelos escaneados ni prendas confeccionadas en software de patronaje. Sirven como MVP visual para validar el flujo, el cambio de color y la interaccion.

Para llegar a una prenda mas realista se recomienda reemplazar cada geometria procedural por modelos `.glb`:

- `shirt.glb`
- `pants.glb`
- `polo.glb`
- `jogger.glb`
- `hoodie.glb`
- `short.glb`

## Como integrar modelos reales GLB

1. Crear o comprar modelos 3D con licencia comercial.
2. Exportarlos en formato `.glb`.
3. Guardarlos en `public/models`.
4. Usar `GLTFLoader` de Three.js.
5. Recorrer `gltf.scene.traverse`.
6. Detectar las mallas de tela.
7. Reemplazar o actualizar su material con `MeshStandardMaterial`.
8. Mantener accesorios, botones, cierres y costuras en materiales separados.

Ejemplo de logica esperada:

```ts
const loader = new GLTFLoader();
loader.load("/models/shirt.glb", (gltf) => {
  gltf.scene.traverse((node) => {
    if (node instanceof THREE.Mesh && node.name.includes("fabric")) {
      node.material = new THREE.MeshStandardMaterial({
        color: selectedColor,
        roughness: 0.82,
      });
    }
  });
  scene.add(gltf.scene);
});
```

## Recomendacion de siguiente etapa

Para calidad comercial, producir o adquirir modelos GLB por categoria:

- Camisa formal manga larga.
- Pantalon recto/formal.
- Jogger sport.
- Polo/polera sport.

La app ya tiene el punto de integracion: sustituir `buildGarmentGroup` en `Garment3DViewer.tsx` por carga GLB con `GLTFLoader`.

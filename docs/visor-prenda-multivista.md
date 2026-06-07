# Visor de prenda multivista

## Objetivo

El visor de PrendaExacta usa imagenes realistas por angulo para simular una rotacion 3D. La prioridad visual es calidad de catalogo ecommerce premium: fondo limpio, prenda aislada, costuras visibles, textura creible y proporciones consistentes.

Componente principal:

- `src/components/Garment3DViewer.tsx`

Utilidades:

- `src/lib/garmentAssets.ts`

## Pseudo-3D vs 3D real

Pseudo-3D multivista:

- Usa PNGs por vista.
- Cambia la imagen segun el angulo de arrastre.
- Es liviano, rapido para MVP y se ve mejor que geometria procedural simple.
- Requiere un asset por prenda, color y vista.

Modelo 3D real `.glb`:

- Usa mallas reales, materiales y luces.
- Permite rotacion continua y materiales editables.
- Requiere modelos profesionales, UVs y control de performance.

El visor procedural Three.js anterior sigue como fallback tecnico si faltan imagenes, pero no debe ser la experiencia visual principal.

## Estructura de assets

Ruta base:

```txt
public/assets/garments/{garment}/{color}/{view}.png
```

Tipos:

- `shirt`
- `pants`
- `sport`

Colores:

- `sky-blue`
- `white`
- `navy`
- `terracotta`
- `gray`

Vistas:

- `front`
- `front-3q-right`
- `right`
- `back`
- `left`
- `front-3q-left`
- `fabric-detail`

Total esperado:

```txt
3 prendas x 5 colores x 7 vistas = 105 PNG activos
```

## Resolucion por angulo

La utilidad `getClosestViewByAngle(angle)` resuelve:

- `0°` = `front`
- `45°` = `front-3q-right`
- `90°` = `right`
- `180°` = `back`
- `270°` = `left`
- `315°` = `front-3q-left`

El detalle de tela no depende del angulo; se carga con `getGarmentViewAssetByView(..., "fabric-detail")`.

## Generacion de imagenes realistas

Script principal:

```bash
npm run generate:real-garments
```

Comportamiento:

- Lee la matriz de prenda, color y vista.
- Usa `OPENAI_API_KEY` si existe.
- Guarda cada imagen en `public/assets/garments`.
- Si no hay clave, muestra una advertencia y termina sin fallar.
- No corre durante `npm run build`.
- No contiene claves hardcodeadas.

Los prompts piden imagen de producto fotorealista, fondo blanco, sombras suaves, costuras y construccion visibles. Tambien bloquean resultados tipo icono, wireframe, vector, infantil, logo, texto, modelo humano o maniqui.

## Importacion desde contact sheets premium

Para producir una tanda local desde las imagenes fuente:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/import-premium-garment-sheets.ps1
```

Fuentes actuales:

```txt
public/assets/source/shirt-premium-sheet.png
public/assets/source/pants-premium-sheet.png
public/assets/source/sport-premium-sheet.png
```

El script:

- Corta cada contact sheet en seis vistas.
- Recolorea preservando luz, sombra y detalle.
- Genera `fabric-detail.png` por color.
- Exporta PNGs cuadrados de `900x900`.

## Revision visual

Pagina dentro del prototipo:

```txt
/admin/asset-preview
```

Preview HTML estatico:

```bash
npm run preview:garments
```

Salida:

```txt
public/asset-preview/index.html
```

Revision automatica:

```bash
npm run verify:garments
npm run review:garments
```

`verify:garments` valida rutas, angulos y fallback gris.

`review:garments` revisa dimensiones, fondo, proporcion visible y posible apariencia plana. El reporte se guarda en:

```txt
public/assets/garments/asset-review-report.json
```

La revision automatica no reemplaza criterio visual: si una prenda se ve barata, plana o inconsistente, se debe regenerar.

## Como agregar un color

1. Agregar el color en `GarmentColorKey`.
2. Agregarlo en `garmentAssetColors`.
3. Agregar alias en `colorAliases` si el configurador usa nombres comerciales en espanol.
4. Generar las 7 vistas para `shirt`, `pants` y `sport`.
5. Ejecutar:

```bash
npm run verify:garments
npm run review:garments
```

## Como agregar una vista

1. Agregar el nombre a `GarmentViewKey`.
2. Si rota con angulo, agregarlo a `rotatableGarmentViews` y `viewAngles`.
3. Crear el PNG para cada prenda/color.
4. Agregar miniatura en `Garment3DViewer.tsx` si debe mostrarse al usuario.

## Migracion futura a GLB

Cuando se tengan modelos 3D reales:

1. Guardar modelos en `public/models`.
2. Usar `GLTFLoader` de Three.js.
3. Cargar modelo por tipo de prenda.
4. Separar mallas: tela, botones, cierres, cordones, etiquetas.
5. Aplicar materiales segun color y tela seleccionados.
6. Mantener imagenes multivista como fallback o skeleton premium.

Ejemplo conceptual:

```ts
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

## Limitaciones del MVP

- La rotacion cambia entre vistas discretas, no es geometria continua.
- Las arrugas no responden a medidas reales.
- Las imagenes se recolorean; para produccion ideal se debe generar o fotografiar cada color final.
- Las vistas deben revisarse visualmente para evitar inconsistencias de silueta.

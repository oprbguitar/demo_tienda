# PrendaExacta

PrendaExacta es un prototipo web responsive para configurar ropa masculina a medida en Lima. Permite disenar camisas, pantalones y ropa sport, comparar proveedores, registrar medidas, revisar cotizaciones y seguir el estado de un pedido desde una sola interfaz.

El proyecto esta construido con Next.js, TypeScript y Tailwind CSS, con datos simulados preparados para una futura integracion con Supabase.

## Web publicada

GitHub Pages:

```txt
https://oprbguitar.github.io/demo_tienda/
```

Repositorio:

```txt
https://github.com/oprbguitar/demo_tienda
```

## Funcionalidades

- Pagina principal comercial para hombres en Lima.
- Configurador de camisa, pantalon y ropa sport.
- Visor pseudo-3D multivista con imagenes realistas por prenda, color y angulo.
- Cambio de color sincronizado con la prenda y el resumen.
- Detalle de tela con textura segun material seleccionado.
- Paleta activa reducida a 5 colores controlados.
- Registro de medidas con persistencia temporal en `localStorage`.
- Cotizaciones simuladas de talleres verificados.
- Seguimiento de pedido con linea de tiempo.
- Vista prototipo de administracion.
- Pagina interna de revision de assets multivista.

## Rutas

```txt
/                         Inicio
/configurar/camisa        Configurador de camisa
/configurar/pantalon      Configurador de pantalon
/configurar/sport         Configurador sport
/medidas                  Registro de medidas
/cotizaciones             Comparacion de cotizaciones
/proveedores              Talleres y ranking
/seguimiento              Estado del pedido
/admin                    Panel prototipo
/admin/asset-preview      Revision visual de assets
```

## Visor de prenda

El visor principal esta en:

```txt
src/components/Garment3DViewer.tsx
```

Usa imagenes realistas por angulo para simular una rotacion 3D. Las vistas activas son:

```txt
front
front-3q-right
right
back
left
front-3q-left
fabric-detail
```

La estructura de assets es:

```txt
public/assets/garments/{garment}/{color}/{view}.png
```

Colores activos:

```txt
sky-blue
white
navy
terracotta
gray
```

Total activo validado:

```txt
3 prendas x 5 colores x 7 vistas = 105 PNG
```

El visor conserva un fallback procedural con Three.js por si una imagen falta, pero la experiencia principal usa imagenes realistas.

Mas detalle tecnico:

```txt
docs/visor-prenda-multivista.md
```

## Datos simulados

Los datos del prototipo estan en:

```txt
src/data/colors.ts
src/data/fabrics.ts
src/data/garments.ts
src/data/providers.ts
src/data/quotes.ts
```

El almacenamiento temporal usa `localStorage` mediante:

```txt
src/lib/storage.ts
```

No hay pagos reales, autenticacion real ni conexion a base de datos todavia.

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

Si el puerto 3000 esta ocupado, Next.js puede usar otro puerto. En las pruebas locales de este proyecto se uso tambien:

```txt
http://localhost:3100
```

## Validaciones

```bash
npm run verify:garments
npm run review:garments
npm run lint
npm run build
```

Que revisa cada comando:

- `verify:garments`: confirma rutas de assets, angulos y fallback.
- `review:garments`: revisa dimensiones, fondos y senales basicas de calidad visual.
- `lint`: revisa codigo.
- `build`: genera la build de produccion.

## Preview de assets

Para generar una pagina HTML estatica de revision:

```bash
npm run preview:garments
```

Salida:

```txt
public/asset-preview/index.html
```

Tambien se puede revisar desde la app:

```txt
/admin/asset-preview
```

## Generacion de imagenes realistas

El script principal es:

```bash
npm run generate:real-garments
```

Usa `OPENAI_API_KEY` si esta disponible. Si no existe, avisa y termina sin fallar. No se ejecuta durante el build y no contiene claves hardcodeadas.

Tambien existe un importador local desde contact sheets premium:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/import-premium-garment-sheets.ps1
```

## Despliegue en GitHub Pages

El repositorio incluye un workflow en:

```txt
.github/workflows/github-pages.yml
```

Cada push a `main` genera una exportacion estatica de Next.js y la publica en GitHub Pages.

URL esperada:

```txt
https://oprbguitar.github.io/demo_tienda/
```

Configuracion usada para Pages:

```txt
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/demo_tienda
```

El archivo `next.config.ts` aplica `basePath`, `assetPrefix`, `output: "export"` e imagenes sin optimizacion cuando se despliega en GitHub Pages.

## Despliegue alternativo

Tambien se puede publicar en Vercel:

1. Subir este repositorio a GitHub.
2. Crear un proyecto en Vercel desde el repositorio.
3. Usar los comandos por defecto:

```txt
Build command: npm run build
Install command: npm install
Output: Next.js default
```

No se requiere configurar variables de entorno para correr el prototipo. `OPENAI_API_KEY` solo es necesaria si se van a generar nuevos assets con el script de imagenes.

## Estado

Estado actual validado:

- 105 assets activos revisados.
- Rotacion pseudo-3D probada en desktop y mobile.
- Textos revisados sin desbordes visibles.
- Detalle de tela sincronizado con color y tipo de tela.
- `npm run lint` correcto.
- `npm run build` correcto.

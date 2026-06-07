# PrendaExacta - Documentacion tecnica

## Resumen

PrendaExacta es un prototipo web responsive para configurar camisas, pantalones y ropa sport masculina a medida, comparar cotizaciones de talleres de Lima y simular seguimiento de pedido.

## Stack

- Next.js con App Router.
- TypeScript.
- Tailwind CSS.
- Datos simulados en `src/data`.
- Persistencia temporal con `localStorage`.

## Estructura principal

- `src/app`: rutas del prototipo.
- `src/components`: componentes reutilizables de interfaz.
- `src/data`: telas, colores, prendas, proveedores y cotizaciones simuladas.
- `src/lib/storage.ts`: lectura y escritura segura en `localStorage`.
- `public/assets`: imagenes generadas para referencia visual y soporte grafico.

## Persistencia local

El prototipo guarda temporalmente:

- `prendaexacta.camisa`: configuracion de camisa.
- `prendaexacta.pantalon`: configuracion de pantalon.
- `prendaexacta.sport`: configuracion de ropa sport.
- `prendaexacta.medidas`: medidas registradas en centimetros.
- `prendaexacta.cotizacion`: cotizacion seleccionada.

Esta persistencia solo vive en el navegador del usuario y no representa una base de datos real.

## Preparacion para Supabase

La estructura separa datos simulados, componentes y almacenamiento local para facilitar una futura migracion. En una siguiente etapa, Supabase podria reemplazar o complementar:

- Configuraciones de pedido.
- Perfiles de cliente.
- Proveedores verificados.
- Cotizaciones por pedido.
- Estados de seguimiento.
- Panel administrativo.

## Rutas

- `/`: inicio, propuesta de valor y flujo general.
- `/configurar/camisa`: configurador de camisa.
- `/configurar/pantalon`: configurador de pantalon.
- `/configurar/sport`: configurador de ropa sport.
- `/medidas`: registro y guia de medidas.
- `/cotizaciones`: comparador de cotizaciones simuladas.
- `/proveedores`: ranking filtrable de talleres.
- `/seguimiento`: linea de tiempo del pedido.
- `/admin`: panel administrativo simulado.

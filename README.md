# PrendaExacta

Prototipo web responsive para crear prendas masculinas a medida en Lima.

Permite configurar camisa, pantalon y ropa sport, revisar telas, colores, medidas, cotizaciones y proveedores desde una interfaz demostrativa.

## Web publicada

[https://oprbguitar.github.io/demo_tienda/](https://oprbguitar.github.io/demo_tienda/)

## Crear el proyecto localmente

Requisitos:

- Node.js 20 o superior
- npm

Instalacion:

```bash
npm install
```

Desarrollo:

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

Validacion:

```bash
npm run lint
npm run build
```

## Rutas principales

```txt
/                    Inicio
/configurar/camisa   Configurador de camisa
/configurar/pantalon Configurador de pantalon
/configurar/sport    Configurador sport
/medidas             Registro de medidas
/cotizaciones        Cotizaciones
/proveedores         Proveedores
/seguimiento         Seguimiento
```

## Crear una version para GitHub Pages

El repositorio incluye un workflow en `.github/workflows/github-pages.yml`.

Cada push a `main` publica automaticamente la version estatica en GitHub Pages.

Configuracion usada por el despliegue:

```txt
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/demo_tienda
```

## Nota

Este repositorio contiene solo el prototipo publico. La documentacion interna detallada de trabajo local se mantiene fuera de Git para conservar privacidad.

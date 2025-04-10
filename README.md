# 🛍️ Coffee Shop - Frontend

Este proyecto es el frontend de **Coffee Shop**, una tienda en línea enfocada en productos de café. Está desarrollado con **React** y **TypeScript**, estructurado por módulos, y preparado para un despliegue en producción mediante **Docker** sobre **AWS EC2**. Utiliza **NGINX** como proxy inverso.

---

## 📑 Índice

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura General de la App](#-estructura-general-de-la-app)
- [Estructura de Carpetas](#-estructura-de-carpetas-src)
- [Variables de Entorno](#-variables-de-entorno)
- [Accesibilidad y UX](#-accesibilidad-y-experiencia-de-usuario-ux)
- [Consideraciones de Seguridad](#-consideraciones-de-seguridad)
- [Ejecución en Local](#-ejecución-en-local)
- [Ejecución con Docker](#-ejecución-con-docker)
- [Infraestructura de Despliegue](#-infraestructura-de-despliegue)
- [Pruebas Unitarias](#-pruebas-unitarias)

---

## 🚀 Tecnologías Utilizadas

- React + Vite
- TypeScript
- CSS
- Redux Toolkit
- React Hook Form
- Card Validator
- Bootstrap
- SweetAlert2
- Docker
- NGINX
- AWS EC2

---

## 🧭 Estructura General de la App

- **Inicio (Home)**: Vista con tarjetas de productos.
- **Carrito (Offcanvas)**: Añade productos, modifica cantidades, sincroniza con otras pestañas (localStorage). Toasts informan cambios.
- **Checkout Page**: Muestra los productos del carrito, permite editar cantidades y proceder al pago.
- **Modal de Tarjeta**: Valida datos en tiempo real usando `react-hook-form` y `card-validator`, reflejando visualmente con `CreditCardPreview`.
- **Summary Modal (Backdrop)**: Muestra el resumen del pedido con opción de confirmar pago.
- **Transaction Detail Page**: Muestra el estado de la compra. Si hay error, se presenta un `SweetAlert`.

---

## 🗂️ Estructura de Carpetas (`src/`)

```
src/
├── assets/               # Estilos globales e imágenes
├── components/
│   ├── Alerts/           # Toasts
│   ├── Card/             # Carrito, contador, sincronizador
│   └── Layout/           # Navbar y estructura general
├── modules/
│   ├── products/
│   │   ├── components/   # ProductCard, CreditCardPreview
│   │   ├── controllers/  # Lógica de negocio (getProducts, checkout)
│   │   ├── models/       # Comunicación con la API
│   │   └── interfaces/   # Interfaces TypeScript
├── pages/                # Home, Checkout, TransactionDetail
├── services/
│   └── HttpClient.ts     # Cliente HTTP base
├── store/                # Redux slices y store global
└── utils/                # Funciones reutilizables (formato, errores, respuestas)
```

---

## 🧪 Variables de Entorno

El archivo `.env.example` contiene la variable que se reutiliza para peticiones a la API:

```env
VITE_API_BASE_URL=http://localhost:3002
```

Para producción debe ser la URL de tu backend (por ejemplo, `https://api.coffeeshop.com`).

---

## ♿ Accesibilidad y Experiencia de Usuario (UX)

- La interfaz es completamente **responsive**, gracias a **Bootstrap** y estilos personalizados con CSS.
- El diseño está pensado para ofrecer una **experiencia sencilla, clara y visualmente atractiva** en cualquier dispositivo (desktop, tablet o móvil).
- Elementos como `toasts`, `modals` y `backdrops` refuerzan la retroalimentación visual sin interrumpir el flujo del usuario.

---

## 🔐 Consideraciones de Seguridad

- En producción, **todo el tráfico HTTP es redirigido a HTTPS** mediante NGINX.
- **No se almacenan datos de tarjetas**, ni en el frontend ni en el backend.
- La validación de tarjetas se realiza únicamente del lado del cliente y se descarta tras su uso.

---

## 🖥️ Ejecución en Local

1. Clona el repositorio y copia el archivo de variables:

```bash
cp .env.example .env
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta la app:

```bash
npm run dev
```

---

## 🐳 Ejecución con Docker

### Dockerfile (modo producción)

Asegúrate de tener la variable `VITE_API_BASE_URL` en el entorno de build si usas `envsubst`.

### `docker-compose.yml`

```yaml
version: "3.9"

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: coffee-shop-frontend
    restart: always
    ports:
      - "4000:3000"
    environment:
      - NODE_ENV=production
```

### Comando de despliegue

```bash
docker-compose up --build -d
```

La aplicación quedará accesible en [http://localhost:4000](http://localhost:4000)

---

## 🌐 Infraestructura de Despliegue

La aplicación se encuentra desplegada en producción bajo el siguiente esquema:

- 🚀 **EC2 (AWS)**: Ejecuta el contenedor Docker de React.
- 🐳 **Docker**: Empaqueta la app con configuración de producción.
- 🌐 **NGINX**: Actúa como reverse proxy para servir estáticos y manejar HTTPS/redirecciones.
- 🌍 **VITE_API_BASE_URL**: Se configura dinámicamente según el entorno (desarrollo o producción).

Este enfoque asegura un entorno ligero, replicable y preparado para escalar.

---

## 🧪 Pruebas Unitarias

El frontend cuenta con pruebas unitarias realizadas con **Jest** y **React Testing Library**.

---

Se implementaron pruebas unitarias para garantizar la funcionalidad de componentes clave:

- **utils**: `formatCop`, `generateRandomEmail`, `mapApiErrors`, `handleResponse`
- **store**: `cartSlice`, `store`
- **services**: `HttpClient`
- **modules/products**:
  - `models`: `product.model`, `checkout.model`, `transaction.model`
  - `controllers`: `getProducts`, `CheckoutController`, `GetByTransactionId`

### ⚙️ Ejecutar tests

```bash
npm run test
npm run test:watch
npm run test:cov
```

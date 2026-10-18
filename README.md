# Papelería Ratolí - Documentación Técnica

---
Sobre la autora: 

<div align="center">
  <img src="assets/images/readme/foto-perfil.png" alt="Blanca Dum" width="120" style="border-radius: 50%;">
    
  ### Blanca De Uña Martín
  **Desarrollo Web Fullstack**
  
  Apasionada por la maquetación web, el Clean Code y la creación de interfaces responsivas y centradas en la Experiencia de Usuario (UX).
  
  📧 Contacto: <a href="mailto:blancadum@gmail.com">blancadum@gmail.com</a> 
  <p>🔗 LinkedIn: <a href="https://linkedin.com/in/blancadum" target="_blank">linkedin.com/in/blancadum</a></p>
</div>

---
## 1. Introducción

Este proyecto ha sido desarrollado siguiendo principios de **Clean Code**, aprendidos transversalmente en toda mi formación. Dicho de otra forma, aplicando en la práctica los principios de modularidad y diseño responsivo. 

El **objetivo principal** ha sido construir una tienda online estática que tenga la fluidez y mantenibilidad de un _framework_ moderno, pero utilizando únicamente **Vanilla HTML, CSS y JS**. Todo ello en el marco de la asignatura de Desarrollo de Interfaces de IOC (EAC 1).

Además, se ha añadido una capa semántica de datos mediante atributos HTML5 para simular el comportamiento de un CMS.

> Un **CMS** o **Content Management System** (Sistema de gestión de contenidos), es una herramienta que permite a los usuarios crear, editar y gestionar el contenido de una página web sin necesidad de tener conocimientos técnicos avanzados.

---

## 2. Aspectos Técnicos

### 2.1. Arquitectura Basada en Componentes (Principio DRY)

Para evitar la duplicación masiva de código (principio _Don't Repeat Yourself_), la interfaz no repite código estructural. Se ha optado por una arquitectura donde la cabecera, el menú lateral, el pie de página y otros elementos se cargan dinámicamente mediante un motor asíncrono en `src/scripts/app.js` (usando la API `fetch()`). Esto permite una mayor reutilización de código y facilita el mantenimiento de la interfaz.

### 2.2. Transclusión y Sistema de Plantillas (PLP y PDP)

Las páginas de listados de categorías (**PLP** o **Product Listing Page**) y fichas de producto (**PDP** o **Product Detail Page**) han sido optimizadas mediante procesos de **Transclusión**.

- Los archivos HTML de los productos actúan como un **"contenedor vacío"**, una especie de wrapper que pasa información mediante atributos HTML5 (**`data-title`**, **`data-img_path`**, etc.), de forma similar a como funcionan los componentes de React.
- El **script de JavaScript** detecta la etiqueta especial **`{{INNER_HTML}}`** y vuelca los datos sobre una plantilla universal.
- **Ventaja**: El diseño visual está centralizado. Si se necesita alterar la apariencia de las fichas de producto (ej: cambiar los colores, la tipografía o el tamaño de los botones) se edita **un único archivo** (`pdp-layout.html`) y el cambio se aplica automáticamente a todo el catálogo.

### 2.3. Gestión de Datos y Productos (Simulación de CMS)

En este proyecto no se utiliza un motor de base de datos real, sino que se simula la inyección de datos de producto separando el diseño del contenido mediante los mencionados atributos HTML5. Esto prepara la estructura base del código para poder conectar fácilmente un archivo JSON de configuración o una API real en el futuro sin tener que reescribir el HTML.

### 2.4. Estrategia SEO y Configuración de Servidor

Se ha preparado el entorno para usar **URLs Amigables** (Slugs limpios sin `.html`) y control de estado HTTP.

- **`.htaccess`**: Se ha dejado configurado este archivo de servidor Apache para garantizar un enrutamiento correcto en la página de error **404 (Not Found)**. Al personalizar esta página de error, se evita la página por defecto del servidor (que no sigue la identidad corporativa de la marca), mejorando así la experiencia de usuario (UX).

### 2.5. Sistema de Diseño Responsivo

Toda la interfaz se gobierna desde `src/styles/style.css` utilizando **Variables Nativas CSS** (`:root`) volcadas directamente desde la Guía de Estilos:

- **Tipografía UI/UX**: Combinación de `Montserrat` (lecturabilidad en interfaces) y `Libre Baskerville` (elegancia en bloques de texto).
- **Cuadrícula Matemática**: El grid de productos y categorías se adapta mediante un híbrido de Flexbox y reglas matemáticas `calc()` que garantizan un ajuste perfecto (4 tarjetas por hilera en _desktop_) colapsando de manera completamente fluida en pantallas menores.

---

## 3. Aspectos a mejorar en próximas actualizaciones (Roadmap)

A pesar del alto nivel de optimización lograda, este proyecto sienta las bases para futuras implementaciones que acercarían el código a un entorno _Fullstack_ profesional:

1. **Base de Datos Frontend (Arquitectura JSON)**: Eliminar completamente la necesidad de tener un archivo `.html` físico para cada producto. La mejora consistiría en tener un único archivo `producto.html` que lea el ID de la URL y haga una petición `fetch()` a un `catalogo.json` para renderizar los datos del artículo dinámicamente.
2. **Sistema de Carrito Persistente**: Utilizar la memoria `localStorage` del navegador para que, al pulsar en "Añadir al carrito", el producto se guarde en la sesión del usuario. Esto permitiría actualizar el contador numérico del menú lateral y simular un flujo de compra (_Checkout_) ininterrumpido.
3. **Buscador Predictivo Global**: Expandir el buscador inteligente (actualmente implementado de forma exclusiva en la sección Blog) para que indexe todo el catálogo de productos y sugiera resultados desde la barra de navegación principal.
4. **Optimización de Rendimiento (WebP y Minificación)**: Implementar un sistema de compilación de _Assets_ para minificar el código CSS/JS y convertir masivamente las imágenes PNG a formato **WebP**. Esto reduciría drásticamente el peso de la web mejorando los tiempos de carga (Lighthouse Score).
5. **Estrategia SEO Avanzada (Schema.org y Sitemaps)**: Automatizar la generación de un archivo `sitemap.xml` para facilitar la indexación a los motores de búsqueda. Adicionalmente, inyectar **Datos Estructurados (JSON-LD)** en las Fichas de Producto para que Google pueda leer el precio y la disponibilidad directamente desde el código, mostrando la web en los resultados de _Google Shopping_ (_Rich Snippets_).

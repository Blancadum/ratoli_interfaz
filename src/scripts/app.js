async function loadComponents() {
    // Calculamos la profundidad (basePath) leyendo la ruta del propio script
    const scriptTag = document.querySelector('script[src$="app.js"]');
    const srcAttr = scriptTag.getAttribute('src');
    const basePath = srcAttr.replace('src/scripts/app.js', '');
    const isPage = basePath.includes('..');
    
    async function load(id, url) {
        const el = document.getElementById(id);
        if(el) {
            try {
                const resp = await fetch(basePath + url);
                if (!resp.ok) {
                    throw new Error("HTTP " + resp.status);
                }
                let html = await resp.text();
                // Fix hrefs in the loaded HTML based on depth
                if (isPage) {
                    html = html.replace(/href="pages\//g, 'href="' + basePath + 'pages/');
                    html = html.replace(/href="index\.html"/g, 'href="' + basePath + 'index.html"');
                    html = html.replace(/src="assets\//g, 'src="' + basePath + 'assets/');
                }
                
                // Reemplazo dinámico de parámetros (data-* attributes)
                Object.keys(el.dataset).forEach(key => {
                    const regex = new RegExp('{{' + key + '}}', 'g');
                    html = html.replace(regex, el.dataset[key]);
                });

                // Soporte para transclusión (inyectar el HTML interno original dentro del componente)
                if (html.includes('{{INNER_HTML}}')) {
                    html = html.replace('{{INNER_HTML}}', el.innerHTML);
                }

                el.innerHTML = html;
            } catch(e) {
                console.error("Error loading component:", url, e);
                el.innerHTML = `<p style='color:red; text-align:center; padding: 20px; border: 2px dashed red;'>
                    ⚠️ <b>Error cargando ${url}</b><br>
                    Si ves este error, es porque has abierto el archivo haciendo doble clic (ruta file:///).<br>
                    Para que funcione, debes hacer clic derecho en <b>index.html</b> y seleccionar <b>"Open with Live Server"</b>.
                </p>`;
            }
        }
    }

    await load('header-placeholder', 'src/components/header.html');
    await load('aside-placeholder', 'src/components/aside.html');
    await load('mobile-nav-placeholder', 'src/components/mobile-nav.html');
    await load('search-filter-placeholder', 'src/components/search-filter.html');
    await load('category-grid-placeholder', 'src/components/category-grid.html');
    await load('featured-products-placeholder', 'src/components/featured-products.html');
    await load('promo-banner-placeholder', 'src/components/promo-banner.html');
    await load('hero-placeholder', 'src/components/hero.html');
    await load('trust-badges-placeholder', 'src/components/trust-badges.html');
    await load('plp-placeholder', 'src/components/plp-layout.html');
    await load('pdp-placeholder', 'src/components/pdp-layout.html');
    await load('footer-placeholder', 'src/components/footer.html');
    
    initApp();
}

function initApp() {

    window.addEventListener('scroll', function() {
        const heroSection = document.getElementById('herosection');
        const header1 = document.getElementById('header-1');
        const header2 = document.getElementById('header-2');
        
        const footerSimple = document.getElementById('footer-simple');
        const footerComplete = document.getElementById('footer-complete');

        // 1. Lógica para el Header
        if (heroSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            if (heroBottom <= 60) {
                // Pasó el hero: mostrar Header 2, ocultar Header 1
                header1.style.display = 'none';
                header2.style.display = 'flex';
            } else {
                // En el hero: mostrar Header 1, ocultar Header 2
                header1.style.display = 'flex';
                header2.style.display = 'none';
            }
        }

        // 2. Lógica para el Footer
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight - 30; // Margen de 30px al final

        if (scrollPosition >= threshold) {
            // Llegó al final: ocultar footer simple, mostrar completo
            footerSimple.style.display = 'none';
            footerComplete.style.display = 'block';
        } else {
            // Durante el scroll: mostrar footer simple, ocultar completo
            footerSimple.style.display = 'block';
            footerComplete.style.display = 'none';
        }
    });

    // 3. Lógica del Menú Lateral Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeMenuBtn = document.getElementById('close-menu');
    
    const burgerBtn1 = document.getElementById('burger-btn-1');
    const burgerBtn2 = document.getElementById('burger-btn-2');

    function openMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(burgerBtn1) burgerBtn1.addEventListener('click', openMenu);
    if(burgerBtn2) burgerBtn2.addEventListener('click', openMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    // Submenús desplegables
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            if (submenu.classList.contains('open')) {
                submenu.classList.remove('open');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            } else {
                submenu.classList.add('open');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 4. Lógica de la mascota (Queso)
    const closeMascotBtn = document.getElementById('close-mascot');
    const cheeseMascot = document.getElementById('cheese-mascot');
    if (closeMascotBtn && cheeseMascot) {
        closeMascotBtn.addEventListener('click', () => {
            cheeseMascot.style.display = 'none';
        });
    }

}

document.addEventListener('DOMContentLoaded', loadComponents);

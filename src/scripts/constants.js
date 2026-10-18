/**
 * Constantes de la aplicación Papelería Ratolí
 * Fuente única de verdad (Single Source of Truth) para categorías, iconos y rutas.
 */

export const ASSET_PATHS = {
    FALLBACK_IMAGE: 'assets/images/falta-imagen.png',
    LOGO: 'assets/images/home/ratoli.png',
    MASCOT_CHEESE: 'assets/images/home/cheese.png'
};

export const CATEGORIES = [
    {
        id: 'material-escolar',
        title: 'Material Escolar',
        path: 'pages/material-escolar/material-escolar.html',
        icon: 'assets/images/cuaderno.png',
        subcategories: [
            {
                id: 'lapices-boligrafos',
                title: 'Lápices y Bolígrafos',
                path: 'pages/material-escolar/lapices-boligrafos.html',
                icon: 'assets/images/material-escolar/lapices-boligrafos/lapiz-de-color.png'
            },
            {
                id: 'carpetas-archivadores',
                title: 'Carpetas y Archivadores',
                path: 'pages/material-escolar/carpetas-archivadores.html',
                icon: 'assets/images/material-escolar/carpetas-archivadores/carpetas.png'
            },
            {
                id: 'reglas-compases',
                title: 'Reglas y Compases',
                path: 'pages/material-escolar/reglas-compases.html',
                icon: 'assets/images/falta-imagen.png'
            }
        ]
    },
    {
        id: 'manualidades',
        title: 'Manualidades',
        path: 'pages/manualidades/manualidades.html',
        icon: 'assets/images/manualidades/manualidades.png',
        subcategories: [
            {
                id: 'pinturas-acuarelas',
                title: 'Pinturas y Acuarelas',
                path: 'pages/manualidades/pinturas-acuarelas.html',
                icon: 'assets/images/manualidades/pinturas-acuarelas/pinturas.png'
            },
            {
                id: 'pinceles-rotuladores',
                title: 'Pinceles y Rotuladores',
                path: 'pages/manualidades/pinceles-rotuladores.html',
                icon: 'assets/images/manualidades/pinceles-rotuladores/pinceles.png'
            },
            {
                id: 'papel-cartulinas',
                title: 'Papel Especial y Cartulinas',
                path: 'pages/manualidades/papel-cartulinas.html',
                icon: 'assets/images/manualidades/papel-cartulinas/papel.png'
            },
            {
                id: 'pegamentos-tijeras',
                title: 'Pegamentos y Tijeras',
                path: 'pages/manualidades/pegamentos-tijeras.html',
                icon: 'assets/images/manualidades/pegamentos-tijeras/pegamento-tijeras.png'
            }
        ]
    },
    {
        id: 'literatura',
        title: 'Literatura Infantil y Juvenil',
        path: 'pages/literatura/literatura.html',
        icon: 'assets/images/literatura/libro.png',
        subcategories: [
            {
                id: 'cuentos-infantiles',
                title: 'Cuentos Infantiles',
                path: 'pages/literatura/cuentos-infantiles.html',
                icon: 'assets/images/literatura/cuentos-infantiles/cuentos-infantiles.png'
            },
            {
                id: 'lectura-juvenil',
                title: 'Lectura Juvenil',
                path: 'pages/literatura/lectura-juvenil.html',
                icon: 'assets/images/falta-imagen.png'
            },
            {
                id: 'libros-educativos',
                title: 'Libros Educativos',
                path: 'pages/literatura/libros-educativos.html',
                icon: 'assets/images/literatura/libros-educativos/diccionario.png'
            },
            {
                id: 'libros-de-texto',
                title: 'Libros de texto',
                path: 'pages/literatura/libros-de-texto.html',
                icon: 'assets/images/literatura/libros-de-texto/libro-texto.png'
            }
        ]
    },
    {
        id: 'otros',
        title: 'Mucho más',
        items: [
            {
                id: 'mochilas',
                title: 'Mochilas Escolares',
                path: 'pages/mochilas/mochilas.html',
                icon: 'assets/images/mochilas/mochila.png'
            },
            {
                id: 'estuches',
                title: 'Estuches',
                path: 'pages/estuches/estuches.html',
                icon: 'assets/images/estuches/estuche.png'
            },
            {
                id: 'regalos-juguetes',
                title: 'Regalos y Juguetes',
                path: 'pages/regalos-juguetes/regalos-juguetes.html',
                icon: 'assets/images/regalos-juguetes/juguetes.png'
            }
        ]
    }
];

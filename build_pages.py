import os
import shutil

assets_dir = 'assets/images/tienda'
pages_dir = 'pages'
categories_to_process = ['libros', 'manualidades', 'material-escolar', 'mochilas', 'regalos-juguetes', 'tecnologia', 'estuches']

plp_template = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE} | Papelería Ratolí</title>
    <link rel="stylesheet" href="{ROOT_PATH}src/styles/style.css">
</head>
<body>
    <div id="header-placeholder"></div>
    <div id="aside-placeholder"></div>
    <div id="mobile-nav-placeholder"></div>
    
    <div id="plp-placeholder" data-title="{TITLE}" data-root_path="{ROOT_PATH}">
{CARDS}
    </div>
    
    <div id="footer-placeholder"></div>
    <script src="{ROOT_PATH}src/scripts/app.js"></script>
</body>
</html>"""

pdp_template = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE} | Papelería Ratolí</title>
    <link rel="stylesheet" href="{ROOT_PATH}src/styles/style.css">
</head>
<body>
    <div id="header-placeholder"></div>
    <div id="aside-placeholder"></div>
    <div id="mobile-nav-placeholder"></div>
    
    <div id="pdp-placeholder" 
         data-title="{TITLE}" 
         data-root_path="{ROOT_PATH}"
         data-img_path="{IMG_PATH}">
    </div>
    
    <div id="footer-placeholder"></div>
    <script src="{ROOT_PATH}src/scripts/app.js"></script>
</body>
</html>"""

def get_title(name):
    return name.replace('-', ' ').title()

def get_root_path(depth):
    return '../' * depth if depth > 0 else './'

def process_directory(current_asset_path, current_page_path, dir_name, depth):
    if not os.path.exists(current_page_path):
        os.makedirs(current_page_path)
    
    items = sorted(os.listdir(current_asset_path))
    dirs = [item for item in items if os.path.isdir(os.path.join(current_asset_path, item))]
    files = [item for item in items if os.path.isfile(os.path.join(current_asset_path, item)) and item.endswith('.png')]
    
    if dirs:
        cards_html = ""
        for d in dirs:
            dir_title = get_title(d)
            link = f"{dir_name}/{d}.html" if depth > 0 else f"{d}.html"
            
            img_src = ""
            sub_files = [f for f in os.listdir(os.path.join(current_asset_path, d)) if f.endswith('.png')]
            if sub_files:
                img_src = f"{get_root_path(depth)}assets/images/tienda/{os.path.relpath(os.path.join(current_asset_path, d), 'assets/images/tienda')}/{sub_files[0]}"
            else:
                img_src = f"{get_root_path(depth)}assets/images/tienda/home/ratoli.png"
            
            cards_html += f"""        <a href="{link}" class="subcategory-card">
            <div class="subcategory-card-img-wrapper">
                <img src="{img_src}" alt="{dir_title}">
            </div>
            <div class="subcategory-card-info">
                <h3 class="subcategory-card-title">{dir_title}</h3>
            </div>
        </a>\n"""
            
            process_directory(os.path.join(current_asset_path, d), os.path.join(current_page_path, d), d, depth + 1)
        
        plp_file_path = f"{current_page_path}.html" if depth > 0 else os.path.join(current_page_path, f"{dir_name}.html")
        with open(plp_file_path, 'w') as f:
            f.write(plp_template.format(
                TITLE=get_title(dir_name),
                ROOT_PATH=get_root_path(depth),
                CARDS=cards_html
            ))
            
    else:
        cards_html = ""
        for file in files:
            file_base = file[:-4]
            file_title = get_title(file_base)
            link = f"{dir_name}/{file_base}.html" if depth > 0 else f"{file_base}.html"
            img_src = f"{get_root_path(depth)}assets/images/tienda/{os.path.relpath(current_asset_path, 'assets/images/tienda')}/{file}"
            
            cards_html += f"""        <a href="{link}" class="product-card">
            <div class="product-card-img-wrapper">
                <img src="{img_src}" alt="{file_title}">
            </div>
            <div class="product-card-info">
                <h3 class="product-card-title">{file_title}</h3>
                <span class="product-card-price">19,99 €</span>
            </div>
        </a>\n"""
            
            pdp_html_path = os.path.join(current_page_path, f"{file_base}.html")
            with open(pdp_html_path, 'w') as f:
                f.write(pdp_template.format(
                    TITLE=file_title,
                    ROOT_PATH=get_root_path(depth+1),
                    IMG_PATH=img_src
                ))
        
        plp_file_path = f"{current_page_path}.html" if depth > 0 else os.path.join(current_page_path, f"{dir_name}.html")
        with open(plp_file_path, 'w') as f:
            f.write(plp_template.format(
                TITLE=get_title(dir_name),
                ROOT_PATH=get_root_path(depth),
                CARDS=cards_html
            ))

# Clean the pages directory
for item in os.listdir(pages_dir):
    if item == 'blog' or item == 'producto':
        continue
    path = os.path.join(pages_dir, item)
    if os.path.isdir(path):
        shutil.rmtree(path)
    elif item.endswith('.html') and item != 'index.html':
        os.remove(path)

# Rebuild structure
for cat in categories_to_process:
    asset_path = os.path.join(assets_dir, cat)
    page_path = os.path.join(pages_dir, cat)
    if os.path.exists(asset_path):
        process_directory(asset_path, page_path, cat, depth=1)

print("Pages built successfully with lightweight components!")

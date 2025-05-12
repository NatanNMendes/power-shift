document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(
        "button[aria-controls='mobile-menu']"
    );
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = menuButton.querySelector("svg:first-of-type");
    const modals = document.querySelectorAll(".modal");
    const modalBtns = document.querySelectorAll(".close_modal_btn");
    const imgBtns = document.querySelectorAll(".img_btn");
    const closeIcon = menuButton.querySelector("svg:last-of-type");
    closeIcon.classList.add("hidden");

    menuButton.addEventListener("click", function () {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
        menuIcon.classList.toggle("hidden", !isExpanded);
        closeIcon.classList.toggle("hidden", isExpanded);
    });
    console.log(modals);
    console.log(modalBtns);
    console.log(imgBtns);

    imgBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            console.log("click");
            openModal(index);
        });
    });

    function openModal(i) {
        console.log("openModal");
        modals[i].classList.remove("hidden");
    }

    modalBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            console.log("click");
            closeModal(index);
        });
    });
    
    function closeModal(i) {
        console.log("closeModal");
        modals[i].classList.add("hidden");
    }

    document.getElementById("toggleFilterProducer").addEventListener("click", function () {
        const filterContents = document.querySelectorAll(".filterContentProducer");
        const expandIcon = document.querySelector(".expand-icon-producer");
        const collapseIcon = document.querySelector(".collapse-icon-producer");
    
        filterContents.forEach(filterContent => {
            if (filterContent.classList.contains("hidden")) {
                filterContent.classList.remove("hidden");
                filterContent.classList.add("show");
            } else {
                filterContent.classList.remove("show");
                filterContent.classList.add("hidden");
            }
        });
    
        expandIcon.classList.toggle("hidden");
        collapseIcon.classList.toggle("hidden");
    });

    document.getElementById("toggleFilterCategory").addEventListener("click", function () {
        const filterContents = document.querySelectorAll(".filterContentCategory");
        const expandIcon = document.querySelector(".expand-icon-category");
        const collapseIcon = document.querySelector(".collapse-icon-category");
    
        filterContents.forEach(filterContent => {
            if (filterContent.classList.contains("hidden")) {
                filterContent.classList.remove("hidden");
                filterContent.classList.add("show");
            } else {
                filterContent.classList.remove("show");
                filterContent.classList.add("hidden");
            }
        });
    
        expandIcon.classList.toggle("hidden");
        collapseIcon.classList.toggle("hidden");
    });

    function filterProducts() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const priceRange = parseInt(document.getElementById('priceRange').value);
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand[]"]:checked')).map(cb => cb.value.toLowerCase());
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category[]"]:checked')).map(cb => cb.value.toLowerCase());

        document.querySelectorAll('.group.relative.cursor-pointer').forEach(product => {
            const productPrice = parseFloat(product.dataset.price);
            const productBrand = product.dataset.brand.toLowerCase();
            const productCategory = product.dataset.category.toLowerCase();
            const productName = product.dataset.name.toLowerCase();

            const matchesSearch = productName.includes(searchQuery);
            const matchesPrice = productPrice <= priceRange;
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (matchesSearch && matchesPrice && matchesBrand && matchesCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('priceRange').addEventListener('input', filterProducts);
    
    document.querySelectorAll('input[name="brand[]"], input[name="category[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Atualizar os produtos com data-attributes
    document.querySelectorAll('.group.relative.cursor-pointer').forEach(product => {
        const brandElement = product.querySelector('div > div > span');
        const priceElement = product.querySelector('p');
        const nameElement = product.querySelector('h3 a');

        product.dataset.brand = brandElement ? brandElement.textContent.trim() : '';
        product.dataset.price = priceElement ? priceElement.textContent.replace(/[^\d,]/g, '').replace(',', '.') : '0';
        product.dataset.name = nameElement ? nameElement.textContent.trim() : '';
        product.dataset.category = product.querySelector('div > div > span') ? 
            getCategoryFromBrand(product.dataset.brand) : '';
    });

    
    document.querySelectorAll('input[name="brand[]"], input[name="category[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });


});

function getCategoryFromBrand(brand) {
    const categoryMap = {
        'fueltech': 'injection',
        'nos': 'nitrous',
        'nox': 'exhaust',
        'enkei': 'rim',
        'momo': 'rim',
        'falken': 'tire',
        'bbs': 'rim',
        'borla': 'exhaust'
    };
    return categoryMap[brand.toLowerCase()] || '';
}

function updatePrice(value) {
document.getElementById('priceValue').textContent = 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

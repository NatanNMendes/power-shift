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
});

function updatePrice(value) {
    let formattedValue = parseInt(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('priceValue').textContent = `R$ ${formattedValue}`;
}
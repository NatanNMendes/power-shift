document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector("button[aria-controls='mobile-menu']");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = menuButton.querySelector("svg:first-of-type");
    const closeIcon = menuButton.querySelector("svg:last-of-type");
    closeIcon.classList.add("hidden");
    
    menuButton.addEventListener("click", function () {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
        menuIcon.classList.toggle("hidden", !isExpanded);
        closeIcon.classList.toggle("hidden", isExpanded);
    });
});

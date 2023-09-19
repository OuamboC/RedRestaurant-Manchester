
window.onload = () => {
    const menu_btn = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-nav");
const main_nav = document.querySelector(".main-nav");

// Add a click event listener to the hamburger button
menu_btn.addEventListener("click", function () {
    // Toggle the is-active class on the hamburger button
    menu_btn.classList.toggle("is-active");
    // Toggle the is-active class on the mobile nav element
    mobile_menu.classList.toggle("is-active");
    // Toggle the hidden class on the main nav element
    main_nav.classList.toggle("hidden");
});
}
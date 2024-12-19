document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll(".task-list li");
    listItems.forEach((item, index) => {
    item.style.setProperty('--i', index + 1); // Setzt die CSS-Variable für jedes Element
    });
})
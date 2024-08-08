function toggleSubMenu(event) {
    event.stopPropagation(); // Prevent the click event from closing the nav menu
    var submenu = document.getElementById('projects-submenu');
    var arrow = document.querySelector('.arrow');
    if (submenu.classList.contains('show')) {
        submenu.classList.remove('show');
        arrow.classList.remove('down');
    } else {
        submenu.classList.add('show');
        arrow.classList.add('down');
    }
}

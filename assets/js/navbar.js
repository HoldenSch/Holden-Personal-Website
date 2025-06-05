// Navbar Component - Reusable navigation for all pages
// Projects configuration - add new projects here
const projectsConfig = [
    { title: "Arcs iOS App", href: "projects/arcs-ios-app/" },
    { title: "Super Mario Level Generator", href: "projects/super-mario-level-generator/" },
    { title: "Guess Who?", href: "projects/guess-who/" },
    { title: "Hawaiian Monkseal", href: "projects/monk-seal/" },
    { title: "Volunteer App", href: "projects/volunteer-app/" },
    { title: "Canvas Calendar", href: "projects/canvas-calendar/" }
];

// Function to detect if we're in a subfolder and adjust paths accordingly
function getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/projects/')) {
        return '../../'; // We're in a project subfolder
    }
    return ''; // We're in the root directory
}

// Main navbar configuration
const navbarConfig = {
    logoHref: "about-me-temp.html",
    logoImage: "images/holden-pfp.png",
    logoTitle: "Harvard University",
    logoSubtitle1: "Computer Science",
    logoSubtitle2: "& Economics",
    homeHref: "index.html",
    resumeHref: "about-me-temp.html"
};

// Adjust paths based on current location
function getAdjustedConfig() {
    const basePath = getBasePath();
    return {
        logoHref: basePath + navbarConfig.logoHref,
        logoImage: basePath + navbarConfig.logoImage,
        logoTitle: navbarConfig.logoTitle,
        logoSubtitle1: navbarConfig.logoSubtitle1,
        logoSubtitle2: navbarConfig.logoSubtitle2,
        homeHref: basePath + navbarConfig.homeHref,
        resumeHref: basePath + navbarConfig.resumeHref
    };
}

// Adjust project hrefs based on current location
function getAdjustedProjects() {
    const basePath = getBasePath();
    return projectsConfig.map(project => ({
        title: project.title,
        href: basePath + project.href
    }));
}

// Generate projects submenu HTML
function generateProjectsSubmenu() {
    const adjustedProjects = getAdjustedProjects();
    return adjustedProjects.map(project => 
        `<li><a href="${project.href}" class="project-link">${project.title}</a></li>`
    ).join('\n                    ');
}

// Generate header HTML (with or without logo)
function generateHeader(includeLogo = true) {
    const config = getAdjustedConfig();
    const logoHTML = includeLogo ? `
            <!-- Logo -->
            <a href="${config.logoHref}" class="logo">
                <span class="symbol"><img src="${config.logoImage}" alt="" /></span>
                <div class="text">
                    <span class="title" style="color: #9F1D2E">${config.logoTitle}</span><br />
                    <span>${config.logoSubtitle1}</span></br>	
                    <span>& ${config.logoSubtitle2}</span>
                </div>
            </a>` : '';

    return `<header id="header">
        <div class="inner">
            ${logoHTML}
            <!-- Nav -->
            <nav>
                <ul>
                    <li><a href="#menu">Menu</a></li>
                </ul>
            </nav>
        </div>
    </header>`;
}

// Generate menu HTML with simpler structure
function generateMenu() {
    const config = getAdjustedConfig();
    return `<div id="mobile-menu" class="mobile-menu">
        <div class="mobile-menu-header">
            <h2>Menu</h2>
            <button class="mobile-menu-close">&times;</button>
        </div>
        <div class="mobile-menu-content">
            <ul class="mobile-menu-nav">
                <li><a href="${config.homeHref}" class="menu-link">Home</a></li>
                <li><a href="${config.resumeHref}" class="menu-link">Resume</a></li>
                <li class="menu-item-with-submenu">
                    <a href="#" class="menu-link projects-toggle">Projects <span class="arrow">▶</span></a>
                    <ul class="submenu">
                        ${generateProjectsSubmenu()}
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div id="mobile-menu-overlay" class="mobile-menu-overlay"></div>`;
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const projectsToggle = document.querySelector('.projects-toggle');
    const submenu = document.querySelector('.submenu');
    const arrow = document.querySelector('.arrow');

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Use event delegation for hamburger menu - more reliable approach
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent is the menu link
        const target = e.target.closest('a[href="#menu"]');
        if (target) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        }
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    if (projectsToggle) {
        projectsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            submenu.classList.toggle('show');
            arrow.classList.toggle('down');
        });
    }

    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.menu-link:not(.projects-toggle), .project-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMobileMenu, 150); // Small delay for better UX
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Main function to initialize navbar
function initializeNavbar(options = {}) {
    const { includeLogo = true } = options;
    
    // Insert header
    const headerHTML = generateHeader(includeLogo);
    const wrapperElement = document.querySelector('#wrapper');
    
    if (!wrapperElement) {
        return;
    }
    
    wrapperElement.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Insert menu after body
    const menuHTML = generateMenu();
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    
    // Initialize mobile menu functionality with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeMobileMenu();
    }, 100); // Increased delay to 100ms
}

// Auto-initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the home page by looking for specific elements
    const isHomePage = document.querySelector('.tiles') !== null;
    
    // Initialize navbar with logo on home page, without logo on other pages
    initializeNavbar({ includeLogo: isHomePage });
});

// Export for manual initialization if needed
window.NavbarComponent = {
    initialize: initializeNavbar,
    addProject: function(title, href) {
        projectsConfig.push({ title, href });
    },
    updateProjects: function(newProjects) {
        projectsConfig.length = 0;
        projectsConfig.push(...newProjects);
    }
}; 
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-inner');
    const enlargedView = document.getElementById('enlargedView');
    const enlargedImage = document.getElementById('enlargedImage');
    
    // Process each carousel separately
    carousels.forEach(carousel => {
        const originalImages = carousel.querySelectorAll('img');
        
        // Clone images to create an infinite loop effect
        originalImages.forEach(img => {
            const clone = img.cloneNode(true);
            carousel.appendChild(clone);
        });
    });
  
    // Add click handlers for all images in all carousels (original and cloned)
    carousels.forEach(carousel => {
        carousel.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', function() {
                // Pause all carousels
                carousels.forEach(c => {
                    c.style.animationPlayState = 'paused';
                });
                
                enlargedImage.src = img.src;
                enlargedImage.alt = img.alt;
                enlargedView.style.display = 'flex';
            });
        });
    });
  
    // Close enlarged view when clicking on it
    enlargedView.addEventListener('click', closeEnlargedView);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && enlargedView.style.display === 'flex') {
            closeEnlargedView();
        }
    });
});
  
function closeEnlargedView() {
    const carousels = document.querySelectorAll('.carousel-inner');
    const enlargedView = document.getElementById('enlargedView');
    
    // Resume all carousel animations
    carousels.forEach(carousel => {
        carousel.style.animationPlayState = 'running';
    });
    
    enlargedView.style.display = 'none';
}
  
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel-inner img');
    const enlargedView = document.getElementById('enlargedView');
    const enlargedImage = document.getElementById('enlargedImage');
    
    // Clone images to create an infinite loop effect
    images.forEach(img => {
      const clone = img.cloneNode(true);
      carousel.appendChild(clone);
    });
  
    images.forEach(img => {
      img.addEventListener('click', function() {
        carousel.style.animationPlayState = 'paused'; // Stop the animation
        enlargedImage.src = img.src; // Set the source of the enlarged image
        enlargedView.style.display = 'flex'; // Display the enlarged view
      });
    });
  
    // Restart the carousel animation
    enlargedView.addEventListener('click', closeEnlargedView);
  });
  
  function closeEnlargedView() {
    const carousel = document.querySelector('.carousel-inner');
    const enlargedView = document.getElementById('enlargedView');
    
    carousel.style.animationPlayState = 'running'; // Resume the animation
    enlargedView.style.display = 'none'; // Hide the enlarged view
  }
  
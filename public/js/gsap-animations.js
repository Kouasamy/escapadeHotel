// GSAP Smooth Scroll and Scroll Animations
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// SMOOTH SCROLL
// ============================================
// Smooth scroll behavior using CSS and GSAP
const initSmoothScroll = () => {
  // Add smooth scroll CSS and prevent horizontal scroll
  if (!document.getElementById('smooth-scroll-style')) {
    const style = document.createElement('style');
    style.id = 'smooth-scroll-style';
    style.textContent = `
      html, body {
        overflow-x: hidden;
        width: 100%;
        max-width: 100%;
      }
      
      * {
        max-width: 100%;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Enhance anchor link scrolling with smooth behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Use native smooth scroll with offset
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Animation for text elements (fade in + slide up) - Optimized and Reduced
const animateTextElements = () => {
  // Limit to critical text elements only to reduce load
  const textElements = document.querySelectorAll(
    '.main-title, .hero-text'
  );
  
  // Batch animations for better performance
  const batch = [];
  
  textElements.forEach((el) => {
    if (el.hasAttribute('data-animated')) return;
    
    // Only animate if element is not too small (performance optimization)
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    // Reduced animation - simpler and faster
    gsap.set(el, {
      opacity: 0,
      willChange: 'opacity'
    });
    
    batch.push({
      element: el,
      animation: gsap.to(el, {
        opacity: 1,
        duration: 0.8, // Reduced from 1.4 to 0.8
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none none',
          once: true,
          markers: false
        },
        onComplete: () => {
          el.style.willChange = 'auto';
        }
      })
    });
    
    el.setAttribute('data-animated', 'true');
  });
  
  return batch;
};

// Animation for images - Disabled for performance, only critical images
const animateImageElements = () => {
  // Only animate hero/background images, skip others for performance
  const imageElements = document.querySelectorAll(
    '.hero-background-image'
  );
  
  const batch = [];
  
  imageElements.forEach((img) => {
    if (img.hasAttribute('data-animated')) return;
    
    // Simplified animation - just opacity fade, no scale
    gsap.set(img, {
      opacity: 0,
      willChange: 'opacity'
    });
    
    batch.push({
      element: img,
      animation: gsap.to(img, {
        opacity: 1,
        duration: 0.6, // Reduced from 1.6 to 0.6
        ease: 'power1.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none none',
          once: true,
          markers: false
        },
        onComplete: () => {
          img.style.willChange = 'auto';
        }
      })
    });
    
    img.setAttribute('data-animated', 'true');
  });
  
  return batch;
};

// Animation for video elements - Disabled for performance
const animateVideoElements = () => {
  // Videos should play immediately without animation delays
  // Animation disabled for better performance
  const videoElements = document.querySelectorAll('video');
  
  videoElements.forEach((video) => {
    if (video.hasAttribute('data-animated')) return;
    // Set opacity to 1 immediately, no animation
    video.style.opacity = '1';
    video.setAttribute('data-animated', 'true');
  });
};

// Animation for cards and sections - Disabled for performance
const animateCardElements = () => {
  // Card animations disabled for better performance
  // Elements will appear immediately
  const cardElements = document.querySelectorAll(
    '.suite-card, .welcome-content, .hero-content, .experience-section'
  );
  
  cardElements.forEach((card) => {
    if (card.hasAttribute('data-animated')) return;
    
    // No animation, just set visible immediately
    card.style.opacity = '1';
    card.setAttribute('data-animated', 'true');
  });
};

// Stagger animation for grid items - Disabled for performance
const animateGridItems = () => {
  // Grid animations disabled for better performance
  const grids = document.querySelectorAll('.suite-grid, .grid');
  
  grids.forEach((grid) => {
    if (grid.hasAttribute('data-animated')) return;
    
    const items = Array.from(grid.children);
    
    // No animation, just set visible immediately
    items.forEach(item => {
      item.style.opacity = '1';
    });
    
    grid.setAttribute('data-animated', 'true');
  });
};

// Initialize all animations - Optimized and Reduced
const initScrollAnimations = () => {
  // Wait for GSAP to be loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Retry after a short delay
    setTimeout(initScrollAnimations, 100);
    return;
  }
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Reduced initialization - only critical animations
    // Reduced delays for faster page rendering
    animateTextElements();
    animateImageElements();
    animateVideoElements();
    animateCardElements();
    animateGridItems();
    
    // Minimal refresh delay
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 100);
  });
};

// Initialize everything when DOM is ready
const init = () => {
  initSmoothScroll();
  initScrollAnimations();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Refresh animations on window resize (for responsive adjustments) - Optimized
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
});

// Optimize ScrollTrigger performance
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  ignoreMobileResize: true
});

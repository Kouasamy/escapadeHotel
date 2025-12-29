/**
 * Performance Enhancer - Optimisations avancées pour améliorer le chargement
 * Ce script optimise le chargement sans modifier le design
 */

(function() {
  'use strict';

  // Optimiser le chargement des ressources critiques
  function optimizeCriticalResources() {
    // Précharger les CSS critiques si pas déjà fait
    const criticalCSS = ['css/style1.css', 'css/footer.css', 'css/hero-footer-responsive.css'];
    criticalCSS.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = function() {
          this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      }
    });
  }

  // Optimiser les images avec Intersection Observer
  function optimizeImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            // Précharger les images adjacentes
            preloadAdjacentImages(img);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px' // Précharger 200px avant
      });

      // Observer toutes les images lazy
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Précharger les images adjacentes pour un scroll fluide
  function preloadAdjacentImages(currentImg) {
    const parent = currentImg.closest('.plats-slider-track, .gallery-slider, .slider');
    if (!parent) return;

    const allImages = Array.from(parent.querySelectorAll('img'));
    const currentIndex = allImages.indexOf(currentImg);

    // Précharger l'image suivante et précédente
    [currentIndex - 1, currentIndex + 1].forEach(index => {
      if (index >= 0 && index < allImages.length) {
        const img = allImages[index];
        if (img && img.src && !img.complete) {
          const preloadImg = new Image();
          preloadImg.src = img.src;
        }
      }
    });
  }

  // Optimiser les vidéos
  function optimizeVideos() {
    const videos = document.querySelectorAll('video[preload="none"]');
    videos.forEach(video => {
      // Changer preload="none" en "metadata" pour les vidéos visibles
      if (isInViewport(video)) {
        video.preload = 'metadata';
      }
    });
  }

  // Vérifier si un élément est dans le viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Précharger les pages suivantes probables
  function prefetchNextPages() {
    // Précharger les pages les plus visitées
    const likelyPages = [
      'page_suite.html',
      'restaurant.html',
      'lounge.html',
      'page_evenementiel.html'
    ];

    likelyPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      link.as = 'document';
      document.head.appendChild(link);
    });
  }

  // Optimiser les polices
  function optimizeFonts() {
    // Forcer le chargement des polices critiques
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Les polices sont chargées
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }

  // Réduire le reflow/repaint
  function reduceReflow() {
    // Utiliser requestAnimationFrame pour les animations
    if (window.requestAnimationFrame) {
      // Optimiser les transitions CSS
      const style = document.createElement('style');
      style.textContent = `
        * {
          will-change: auto;
        }
        .reveal, .plats-slide-img, img {
          will-change: transform, opacity;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialisation
  function init() {
    // Optimisations immédiates
    optimizeCriticalResources();
    optimizeFonts();
    reduceReflow();

    // Optimisations après chargement
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeImages();
        optimizeVideos();
        prefetchNextPages();
      });
    } else {
      optimizeImages();
      optimizeVideos();
      prefetchNextPages();
    }

    // Précharger les pages au survol des liens
    document.addEventListener('mouseover', function(e) {
      const link = e.target.closest('a[href]');
      if (link && link.href && !link.href.startsWith('#')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
      }
    }, { passive: true });
  }

  // Démarrer les optimisations
  init();
})();


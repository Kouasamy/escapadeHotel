/**
 * Optimiseur de performance global
 * Améliore le chargement de la page sur tous les types d'écrans
 */

(function() {
  'use strict';

  // Détecter le type de connexion
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  /**
   * Différer le chargement des images non critiques
   */
  function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      // Utiliser Intersection Observer pour un chargement plus efficace
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
              }
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px' // Commencer à charger 50px avant que l'image soit visible
        });
        imageObserver.observe(img);
      }
    });
  }

  /**
   * Optimiser le chargement des vidéos
   */
  function optimizeVideos() {
    const videos = document.querySelectorAll('video[preload="metadata"], video[preload="auto"]');
    videos.forEach(function(video) {
      // Sur connexion lente ou mobile, utiliser preload="none"
      if (isSlowConnection || (isMobile && !video.hasAttribute('fetchpriority'))) {
        video.preload = 'none';
        video.loading = 'lazy';
        
        // Charger la vidéo seulement quand elle est visible
        if ('IntersectionObserver' in window) {
          const videoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                const video = entry.target;
                video.preload = 'metadata';
                video.load();
                observer.unobserve(video);
              }
            });
          }, {
            rootMargin: '100px'
          });
          videoObserver.observe(video);
        }
      }
    });
  }

  /**
   * Différer le chargement des scripts non critiques
   */
  function deferNonCriticalScripts() {
    // Scripts à charger après le rendu initial
    const scriptsToDefer = [
      'js/gsap-animations.js',
      'js/video-lazy-loader.js',
      'js/booking-form.js'
    ];

    scriptsToDefer.forEach(function(scriptPath) {
      const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
      if (existingScript && !existingScript.hasAttribute('defer') && !existingScript.hasAttribute('async')) {
        existingScript.setAttribute('defer', '');
      }
    });
  }

  /**
   * Optimiser les polices
   */
  function optimizeFonts() {
    // Précharger les polices critiques
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        // Les polices sont chargées
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }

  /**
   * Réduire la taille des images sur mobile
   */
  function optimizeImagesForMobile() {
    if (isMobile && window.devicePixelRatio > 1) {
      const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"], img[src*=".webp"]');
      images.forEach(function(img) {
        // Ajouter des attributs pour le responsive loading
        if (!img.hasAttribute('sizes')) {
          img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
        }
      });
    }
  }

  /**
   * Précharger les ressources critiques au scroll
   */
  function preloadOnScroll() {
    let hasScrolled = false;
    const preloadResources = [
      'css/responsive.css',
      'js/gsap-animations.js'
    ];

    function preloadResourcesOnScroll() {
      if (!hasScrolled) {
        hasScrolled = true;
        preloadResources.forEach(function(resource) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = resource;
          document.head.appendChild(link);
        });
      }
    }

    // Précharger après le premier scroll ou après 2 secondes
    window.addEventListener('scroll', preloadResourcesOnScroll, { once: true, passive: true });
    setTimeout(preloadResourcesOnScroll, 2000);
  }

  /**
   * Optimiser le rendu initial
   */
  function optimizeInitialRender() {
    // Masquer le contenu non critique jusqu'au chargement
    const nonCriticalElements = document.querySelectorAll('[data-non-critical]');
    nonCriticalElements.forEach(function(el) {
      el.style.visibility = 'hidden';
    });

    // Afficher après le chargement
    window.addEventListener('load', function() {
      nonCriticalElements.forEach(function(el) {
        el.style.visibility = 'visible';
      });
    });
  }

  /**
   * Initialiser toutes les optimisations
   */
  function init() {
    // Optimisations immédiates
    optimizeImages();
    optimizeVideos();
    optimizeFonts();
    optimizeImagesForMobile();
    deferNonCriticalScripts();

    // Optimisations différées
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        preloadOnScroll();
        optimizeInitialRender();
      });
    } else {
      preloadOnScroll();
      optimizeInitialRender();
    }
  }

  // Démarrer immédiatement
  init();
})();

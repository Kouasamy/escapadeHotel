/**
 * Image Optimizer - Optimise le chargement des images pour améliorer les performances
 * 
 * Ce script ajoute automatiquement :
 * - Lazy loading aux images en dessous de la ligne de flottaison
 * - Preload pour les images critiques
 * - Optimisation du chargement progressif
 */

(function() {
  'use strict';

  // Configuration : Images critiques qui doivent être chargées immédiatement
  const criticalImages = [
    'images/568_819.svg', // Logo
    'images/568_939.svg', // Menu icon
    'images/568_837.svg', // Lang separator
    'images/568_838.svg', // Réserver une suite button
    'images/568_833.svg', // Réserver un espace button
    'images/568_842.svg', // Form field bg
    'images/568_843.svg', // Form arrow
    'images/568_844.svg', // Form field bg
    'images/568_934.svg', // Form arrow
    'images/568_938.svg', // Form field bg
    'images/568_943.svg', // Minus icon
    'images/568_944.svg', // Plus icon
    'images/568_840.svg', // Contact button
  ];

  // Configuration : Images qui doivent être préchargées - LISTE ÉTENDUE POUR CHARGEMENT RAPIDE
  const preloadImages = [
    'images/574_538.png', // Title border (utilisé fréquemment)
    'Menu/images/542_446.svg', // Close icon
    'images/568_819.svg', // Logo (utilisé partout)
    'images/568_939.svg', // Menu icon (utilisé partout)
    'images/568_837.svg', // Lang separator (utilisé partout)
    'images/568_838.svg', // Réserver une suite button
    'images/568_833.svg', // Réserver un espace button
    'images/568_840.svg', // Contact button
  ];

  /**
   * Vérifie si une image est critique (au-dessus de la ligne de flottaison)
   */
  function isCriticalImage(src) {
    return criticalImages.some(critical => src.includes(critical));
  }

  /**
   * Vérifie si une image est dans la zone visible initiale
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Optimise une image individuelle - CHARGEMENT RAPIDE
   */
  function optimizeImage(img) {
    const src = img.getAttribute('src');
    if (!src) return;

    // Ajouter fetchpriority="high" pour les images critiques
    if (isCriticalImage(src)) {
      img.setAttribute('fetchpriority', 'high');
      // Pas de lazy loading pour les images critiques
      img.removeAttribute('loading');
      img.setAttribute('loading', 'eager');
    } else {
      // Charger les images visibles immédiatement sans lazy loading
      if (!img.hasAttribute('loading')) {
        if (isInViewport(img)) {
          // Image déjà visible, charger immédiatement
          img.setAttribute('fetchpriority', 'high');
          img.setAttribute('loading', 'eager');
        } else {
          // Image hors viewport - lazy loading mais avec priorité plus élevée
          img.setAttribute('loading', 'lazy');
          img.setAttribute('fetchpriority', 'auto');
        }
      } else if (img.getAttribute('loading') === 'lazy') {
        // Si déjà en lazy, ajouter fetchpriority pour accélérer
        img.setAttribute('fetchpriority', 'auto');
      }
    }

    // Utiliser decoding="async" pour améliorer les performances (non-bloquant)
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    // Ajouter width et height si manquants pour éviter le layout shift
    // (pour les images qui n'ont pas déjà ces attributs)
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      // Essayer de déduire depuis les classes CSS si possible
      const classes = img.className || '';
      const widthMatch = classes.match(/w-\[(\d+)px\]|w-(\d+)/);
      const heightMatch = classes.match(/h-\[(\d+)px\]|h-(\d+)/);
      
      if (widthMatch) {
        img.setAttribute('width', widthMatch[1] || widthMatch[2] || '');
      }
      if (heightMatch) {
        img.setAttribute('height', heightMatch[1] || heightMatch[2] || '');
      }
    }
  }

  /**
   * Précharge les images critiques
   */
  function preloadCriticalImages() {
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimise toutes les images de la page
   */
  function optimizeAllImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    
    images.forEach(img => {
      optimizeImage(img);
      img.setAttribute('data-optimized', 'true');
    });
  }

  /**
   * Utilise l'Intersection Observer pour le lazy loading avancé
   */
  function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Charger l'image si elle utilise data-src
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            // Précharger les images adjacentes dans les sliders
            if (img.closest('.plats-slider-track')) {
              preloadAdjacentSliderImages(img);
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '500px' // Commencer à charger 500px avant que l'image soit visible pour un chargement beaucoup plus rapide
      });

      // Observer toutes les images avec lazy loading
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Précharge les images adjacentes dans un slider pour un scroll fluide
   */
  function preloadAdjacentSliderImages(currentImg) {
    const sliderTrack = currentImg.closest('.plats-slider-track');
    if (!sliderTrack) return;

    const allImages = Array.from(sliderTrack.querySelectorAll('img.plats-slide-img'));
    const currentIndex = allImages.indexOf(currentImg);

    // Précharger l'image suivante et précédente pour un scroll fluide
    [currentIndex - 1, currentIndex + 1].forEach(index => {
      if (index >= 0 && index < allImages.length) {
        const adjacentImg = allImages[index];
        if (adjacentImg && adjacentImg.src && !adjacentImg.complete) {
          // Forcer le chargement en créant une nouvelle image
          const preloadImg = new Image();
          preloadImg.src = adjacentImg.src;
        }
      }
    });
  }
  
  /**
   * Optimise spécifiquement les images des galeries (restaurant et lounge)
   */
  function optimizeGalleryImages() {
    const galleryImages = document.querySelectorAll('.plats-slide-img');
    
    if ('IntersectionObserver' in window) {
      const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Précharger les images adjacentes dans le slider
            preloadAdjacentSliderImages(img);
            galleryObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '600px' // Précharger 600px avant que l'image soit visible pour un chargement beaucoup plus rapide
      });
      
      galleryImages.forEach(img => {
        galleryObserver.observe(img);
      });
    }
  }

  /**
   * Initialisation
   */
  function init() {
    // Précharger les images critiques
    preloadCriticalImages();

    // Optimiser toutes les images existantes
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeAllImages();
        setupIntersectionObserver();
        optimizeGalleryImages();
      });
    } else {
      optimizeAllImages();
      setupIntersectionObserver();
      optimizeGalleryImages();
    }

    // Observer les nouvelles images ajoutées dynamiquement
    const observer = new MutationObserver(() => {
      optimizeAllImages();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Démarrer l'optimisation
  init();

  // Exposer une fonction pour optimiser manuellement si nécessaire
  window.optimizeImages = optimizeAllImages;
})();


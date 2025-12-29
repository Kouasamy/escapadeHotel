/**
 * Video Lazy Loader
 * Charge les vidéos de manière optimisée uniquement quand elles sont proches du viewport
 * Améliore significativement les performances de chargement initial
 */

(function() {
  'use strict';

  const LOAD_MARGIN = '300px'; // Commencer à charger 300px avant que la vidéo soit visible
  const LOADED_FLAG = 'videoLoaded';

  /**
   * Charge une vidéo
   */
  function loadVideo(video) {
    if (video.dataset[LOADED_FLAG] === 'true') return;

    const source = video.querySelector('source[data-src]');
    if (!source) return;

    const src = source.getAttribute('data-src');
    if (!src) return;

    // Définir le src réel
    source.setAttribute('src', src);
    source.removeAttribute('data-src');

    // Si la vidéo a un data-src direct, l'utiliser aussi
    if (video.dataset.src) {
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
    }

    // Charger la vidéo
    video.load();
    video.dataset[LOADED_FLAG] = 'true';

    // Essayer de jouer la vidéo si elle a autoplay
    if (video.hasAttribute('autoplay')) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // La lecture automatique a échoué, réessayer après un court délai
          setTimeout(() => {
            video.play().catch(() => {});
          }, 500);
        });
      }
    }
  }

  /**
   * Initialise l'Intersection Observer pour le lazy loading des vidéos
   */
  function initVideoObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback : charger toutes les vidéos si IntersectionObserver n'est pas supporté
      document.querySelectorAll('.lazy-video, video[preload="none"]').forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: LOAD_MARGIN
    });

    // Observer toutes les vidéos avec lazy loading
    document.querySelectorAll('.lazy-video, video[preload="none"][data-src]').forEach((video) => {
      // Ne pas observer les vidéos critiques (hero)
      if (!video.closest('#hero')) {
        observer.observe(video);
      }
    });
  }

  /**
   * Initialisation
   */
  function init() {
    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initVideoObserver);
    } else {
      initVideoObserver();
    }
  }

  // Démarrer
  init();

  // Exposer une fonction pour charger manuellement une vidéo si nécessaire
  window.loadVideo = loadVideo;
})();


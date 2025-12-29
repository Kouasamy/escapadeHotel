/**
 * Script pour supprimer complètement tous les contrôles vidéo
 * S'exécute immédiatement et surveille les nouvelles vidéos ajoutées
 * Force la lecture automatique en boucle au responsive mobile
 */

(function() {
  'use strict';

  /**
   * Force la lecture automatique d'une vidéo (spécialement pour mobile)
   */
  function forceVideoPlay(video) {
    if (!video || video.tagName !== 'VIDEO') return;

    // S'assurer que les attributs nécessaires sont présents
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    video.muted = true;
    video.loop = true;

    // Forcer la lecture programmatique
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        // Si la lecture automatique échoue, réessayer après interaction utilisateur
        console.log('Auto-play prevented, will retry:', error);
        // Réessayer après un court délai
        setTimeout(function() {
          video.muted = true;
          video.play().catch(function(err) {
            console.log('Retry play failed:', err);
          });
        }, 500);
      });
    }

    // Réessayer la lecture si la vidéo est en pause
    video.addEventListener('pause', function() {
      if (video.paused && !video.ended) {
        video.muted = true;
        video.play().catch(function(err) {
          console.log('Resume play failed:', err);
        });
      }
    }, { passive: true });

    // Réessayer la lecture si la vidéo s'arrête
    video.addEventListener('ended', function() {
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(function(err) {
        console.log('Restart play failed:', err);
      });
    }, { passive: true });
  }

  /**
   * Supprime les contrôles d'une vidéo spécifique
   */
  function removeVideoControls(video) {
    if (!video || video.tagName !== 'VIDEO') return;

    // Supprimer l'attribut controls
    video.removeAttribute('controls');
    video.setAttribute('controls', 'false');
    
    // Désactiver les contrôles via l'API
    if (video.controls !== undefined) {
      video.controls = false;
    }

    // Supprimer les contrôles natifs via CSS inline
    video.style.setProperty('-webkit-appearance', 'none', 'important');
    video.style.setProperty('-moz-appearance', 'none', 'important');
    video.style.setProperty('appearance', 'none', 'important');

    // Empêcher l'affichage des contrôles
    try {
      if (video.webkitSupportsFullscreen !== undefined) {
        video.webkitSupportsFullscreen = false;
      }
    } catch (e) {
      // Ignorer les erreurs
    }

    // Supprimer les event listeners liés aux contrôles
    video.addEventListener('loadedmetadata', function() {
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
      if (video.controls !== undefined) {
        video.controls = false;
      }
      // Forcer la lecture après le chargement des métadonnées
      forceVideoPlay(video);
    }, { once: true });

    // Forcer la lecture dès que possible
    if (video.readyState >= 2) {
      forceVideoPlay(video);
    } else {
      video.addEventListener('loadeddata', function() {
        forceVideoPlay(video);
      }, { once: true });
    }

    // Empêcher l'affichage des contrôles au survol
    video.addEventListener('mouseenter', function() {
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
      if (video.controls !== undefined) {
        video.controls = false;
      }
    }, { passive: true });

    video.addEventListener('mouseleave', function() {
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
      if (video.controls !== undefined) {
        video.controls = false;
      }
    }, { passive: true });

    // Empêcher l'affichage des contrôles au touch (mobile)
    video.addEventListener('touchstart', function(e) {
      e.preventDefault();
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
      if (video.controls !== undefined) {
        video.controls = false;
      }
      forceVideoPlay(video);
    }, { passive: false });

    video.addEventListener('touchend', function(e) {
      e.preventDefault();
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
      if (video.controls !== undefined) {
        video.controls = false;
      }
    }, { passive: false });
  }

  /**
   * Supprime les contrôles de toutes les vidéos existantes
   */
  function removeAllVideoControls() {
    const videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
      removeVideoControls(video);
      forceVideoPlay(video);
    });
  }

  /**
   * Initialise la suppression des contrôles
   */
  function init() {
    // Supprimer les contrôles des vidéos existantes
    removeAllVideoControls();

    // Observer les nouvelles vidéos ajoutées au DOM
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            // Vérifier si c'est une vidéo
            if (node.tagName === 'VIDEO') {
              removeVideoControls(node);
            }
            // Vérifier les vidéos dans les enfants
            const videos = node.querySelectorAll && node.querySelectorAll('video');
            if (videos) {
              videos.forEach(removeVideoControls);
            }
          }
        });
      });
    });

    // Observer les changements dans le document
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      // Attendre que le body soit disponible
      document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        removeAllVideoControls();
      });
    }

    // Forcer la lecture après la première interaction utilisateur (nécessaire pour mobile)
    function enableVideoAutoplay() {
      const videos = document.querySelectorAll('video');
      videos.forEach(function(video) {
        if (video.paused) {
          video.muted = true;
          video.play().catch(function(err) {
            console.log('Auto-play after interaction failed:', err);
          });
        }
      });
    }

    // Écouter les interactions utilisateur pour débloquer l'autoplay
    ['touchstart', 'touchend', 'click', 'scroll'].forEach(function(eventType) {
      document.addEventListener(eventType, function() {
        enableVideoAutoplay();
      }, { once: true, passive: true });
    });

    // Réappliquer périodiquement pour s'assurer que les contrôles restent cachés et que les vidéos jouent
    setInterval(function() {
      removeAllVideoControls();
      enableVideoAutoplay();
    }, 1000);
  }

  // Démarrer immédiatement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Réappliquer immédiatement
  removeAllVideoControls();
})();


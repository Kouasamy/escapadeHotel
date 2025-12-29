// Bouton scroll to top avec animation scroll-hide
(function() {
  'use strict';
  
  let lastScroll = 0;
  let ticking = false;
  let scrollToTopButton = null;
  const SCROLL_THRESHOLD = 300; // Afficher le bouton après 300px de scroll
  
  function initScrollToTop() {
    // Sélectionner le bouton scroll to top
    scrollToTopButton = document.getElementById('scroll-to-top');
    
    // Si le bouton n'existe pas, réessayer après un court délai
    if (!scrollToTopButton) {
      setTimeout(initScrollToTop, 100);
      return;
    }
    
    // Ajouter l'événement de clic pour remonter en haut
    scrollToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Scroll fluide vers le haut de la page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    function checkScroll() {
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Afficher le bouton si on a scrollé assez (plus de SCROLL_THRESHOLD px)
      if (currentScroll > SCROLL_THRESHOLD) {
        if (scrollToTopButton) {
          scrollToTopButton.classList.add('visible');
          scrollToTopButton.classList.remove('scroll-hide');
        }
      } else {
        // Cacher le bouton si on est en haut de la page
        if (scrollToTopButton) {
          scrollToTopButton.classList.remove('visible');
        }
      }
      
      // Gestion de l'animation scroll-hide (se cache au scroll vers le bas, apparaît au scroll vers le haut)
      if (currentScroll < 50) {
        // Toujours afficher si on est en haut de la page
        if (scrollToTopButton) {
          scrollToTopButton.classList.remove('scroll-hide');
        }
        lastScroll = currentScroll;
        return;
      }
      
      // Calculer la différence de scroll
      const scrollDifference = Math.abs(currentScroll - lastScroll);
      
      // Seulement agir si le scroll est significatif (évite les micro-mouvements)
      if (scrollDifference < 3) {
        return;
      }
      
      // Si on scroll vers le bas ET qu'on a dépassé 100px, cacher
      if (currentScroll > lastScroll && currentScroll > 100) {
        if (scrollToTopButton && scrollToTopButton.classList.contains('visible')) {
          scrollToTopButton.classList.add('scroll-hide');
        }
      } 
      // Si on scroll vers le haut, afficher immédiatement (si on a scrollé assez)
      else if (currentScroll < lastScroll && currentScroll > SCROLL_THRESHOLD) {
        if (scrollToTopButton) {
          scrollToTopButton.classList.remove('scroll-hide');
        }
      }
      
      lastScroll = currentScroll;
    }
    
    // Initialiser lastScroll
    lastScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    
    // Vérifier immédiatement au chargement
    checkScroll();
    
    // Écouter le scroll avec throttling et passive pour de meilleures performances
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Écouter aussi le touchmove pour mobile
    window.addEventListener('touchmove', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Écouter aussi wheel pour certains navigateurs
    window.addEventListener('wheel', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
  
  // Initialiser dès que possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    // Si le DOM est déjà chargé, attendre un peu pour être sûr que tout est prêt
    setTimeout(initScrollToTop, 50);
  }
  
  // Réinitialiser après le chargement complet de la page
  window.addEventListener('load', function() {
    setTimeout(initScrollToTop, 100);
  });
})();


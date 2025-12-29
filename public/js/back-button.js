// Bouton de retour avec animation scroll-hide
// Utilise le système de suivi de navigation personnalisé
(function() {
  'use strict';
  
  let lastScroll = 0;
  let ticking = false;
  let backButton = null;
  
  function initBackButton() {
    // Sélectionner le bouton de retour
    backButton = document.getElementById('back-button');
    
    // Si le bouton n'existe pas, réessayer après un court délai
    if (!backButton) {
      setTimeout(initBackButton, 100);
      return;
    }
    
    // Ajouter l'événement de clic pour revenir en arrière
    backButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Utiliser le système de navigation personnalisé si disponible
      if (window.EscapadeNavigation && typeof window.EscapadeNavigation.goBack === 'function') {
        window.EscapadeNavigation.goBack();
        return;
      }
      
      // Fallback : utiliser l'historique du navigateur
      try {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'index.html';
        }
      } catch (error) {
        try {
          window.history.back();
        } catch (e) {
          window.location.href = 'index.html';
        }
      }
    });
    
    function checkScroll() {
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Toujours afficher si on est en haut de la page (moins de 50px)
      if (currentScroll < 50) {
        if (backButton) backButton.classList.remove('scroll-hide');
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
        if (backButton) backButton.classList.add('scroll-hide');
      } 
      // Si on scroll vers le haut, afficher immédiatement
      else if (currentScroll < lastScroll) {
        if (backButton) backButton.classList.remove('scroll-hide');
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
    document.addEventListener('DOMContentLoaded', initBackButton);
  } else {
    // Si le DOM est déjà chargé, attendre un peu pour être sûr que tout est prêt
    setTimeout(initBackButton, 50);
  }
  
  // Réinitialiser après le chargement complet de la page
  window.addEventListener('load', function() {
    setTimeout(initBackButton, 100);
  });
})();


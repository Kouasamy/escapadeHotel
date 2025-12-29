// Scroll behavior: hide hero header and footer when scrolling down, show when scrolling up - FONCTIONNE SUR TOUTE LA PAGE
(function() {
  'use strict';
  
  let lastScroll = 0;
  let ticking = false;
  let header = null;
  let headerInner = null;
  let footer = null;
  let contactBtn = null;
  let reserveSpaceBtn = null;
  
  function initScrollHide() {
    // Sélectionner les éléments - chercher sur toute la page
    header = document.querySelector('.hero-header') || document.querySelector('.site-header');
    headerInner = document.querySelector('.site-header__inner');
    footer = document.querySelector('.hero-footer');
    contactBtn = document.querySelector('.hero-footer .contact-btn') || document.querySelector('.btn-wrapper.contact-btn') || document.getElementById('contactFab');
    reserveSpaceBtn = document.querySelector('.btn-wrapper.btn-reserve-space-mobile');
    
    // Si les éléments n'existent pas, réessayer après un court délai
    if (!header && !footer && !contactBtn) {
      setTimeout(initScrollHide, 100);
      return;
    }
    
    function checkScroll() {
      // Vérifier si le menu overlay est ouvert (sur mobile/tablette uniquement)
      const menuContainer = document.querySelector('.menu-container');
      const isMenuOpen = menuContainer && !menuContainer.classList.contains('is-hidden');
      const isMobileOrTablet = window.innerWidth <= 1024; // Tablet et mobile
      
      // Si le menu est ouvert sur mobile/tablette, ne pas appliquer scroll-hide
      if (isMenuOpen && isMobileOrTablet) {
        return;
      }
      
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Toujours afficher si on est en haut de la page (moins de 50px)
      if (currentScroll < 50) {
        if (header) header.classList.remove('scroll-hide');
        if (headerInner) headerInner.classList.remove('scroll-hide');
        if (footer) footer.classList.remove('scroll-hide');
        if (contactBtn) contactBtn.classList.remove('scroll-hide');
        if (reserveSpaceBtn) reserveSpaceBtn.classList.remove('scroll-hide');
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
        if (header) header.classList.add('scroll-hide');
        if (headerInner) headerInner.classList.add('scroll-hide');
        if (footer) footer.classList.add('scroll-hide');
        if (contactBtn) contactBtn.classList.add('scroll-hide');
        if (reserveSpaceBtn) reserveSpaceBtn.classList.add('scroll-hide');
      } 
      // Si on scroll vers le haut, afficher immédiatement (PEU IMPORTE OÙ ON EST SUR LA PAGE)
      else if (currentScroll < lastScroll) {
        if (header) header.classList.remove('scroll-hide');
        if (headerInner) headerInner.classList.remove('scroll-hide');
        if (footer) footer.classList.remove('scroll-hide');
        if (contactBtn) contactBtn.classList.remove('scroll-hide');
        if (reserveSpaceBtn) reserveSpaceBtn.classList.remove('scroll-hide');
      }
      
      lastScroll = currentScroll;
    }
    
    // Initialiser lastScroll
    lastScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    
    // Vérifier immédiatement au chargement
    checkScroll();
    
    // Écouter le scroll avec throttling et passive pour de meilleures performances
    // Utiliser window pour capturer le scroll sur toute la page
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
    document.addEventListener('DOMContentLoaded', initScrollHide);
  } else {
    // Si le DOM est déjà chargé, attendre un peu pour être sûr que tout est prêt
    setTimeout(initScrollHide, 50);
  }
  
  // Réinitialiser après le chargement complet de la page
  window.addEventListener('load', function() {
    setTimeout(initScrollHide, 100);
  });
})();













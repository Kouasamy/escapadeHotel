(() => {
  'use strict';
  
  // Fonction pour cacher TOUT le contenu sauf le loader
  function hideAllContent() {
    // Cacher tout le body sauf le loader
    const body = document.body;
    if (body) {
      body.style.overflow = 'hidden';
    }
    
    // Cacher toutes les sections et le contenu principal
    const mainContent = document.querySelector('main') || document.querySelector('section') || document.body;
    if (mainContent) {
      const allSections = mainContent.querySelectorAll('section:not(#page-loader), main > *, body > section:not(#page-loader)');
      allSections.forEach(section => {
        if (section.id !== 'page-loader') {
          section.style.opacity = '0';
          section.style.visibility = 'hidden';
          section.style.pointerEvents = 'none';
        }
      });
    }
    
    // Cacher aussi les éléments directement dans le body
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
      if (child.id !== 'page-loader') {
        child.style.opacity = '0';
        child.style.visibility = 'hidden';
        child.style.pointerEvents = 'none';
      }
    });
  }
  
  // Fonction pour cacher le header et le footer pendant le chargement
  function hideHeaderAndFooter() {
    const header = document.querySelector('.hero-header') || document.querySelector('.site-header');
    const headerInner = document.querySelector('.site-header__inner');
    const footer = document.querySelector('.hero-footer');
    const contactBtn = document.querySelector('.hero-footer .contact-btn') || document.querySelector('.btn-wrapper.contact-btn');
    const reserveSpaceBtn = document.querySelector('.btn-wrapper.btn-reserve-space-mobile');
    
    if (header) {
      header.style.opacity = '0';
      header.style.visibility = 'hidden';
      header.style.pointerEvents = 'none';
    }
    if (headerInner) {
      headerInner.style.opacity = '0';
      headerInner.style.visibility = 'hidden';
      headerInner.style.pointerEvents = 'none';
    }
    if (footer) {
      footer.style.opacity = '0';
      footer.style.visibility = 'hidden';
      footer.style.pointerEvents = 'none';
    }
    if (contactBtn) {
      contactBtn.style.opacity = '0';
      contactBtn.style.visibility = 'hidden';
      contactBtn.style.pointerEvents = 'none';
    }
    if (reserveSpaceBtn) {
      reserveSpaceBtn.style.opacity = '0';
      reserveSpaceBtn.style.visibility = 'hidden';
      reserveSpaceBtn.style.pointerEvents = 'none';
    }
  }
  
  // Fonction pour afficher TOUT le contenu après le chargement
  function showAllContent() {
    // Réactiver le scroll du body
    const body = document.body;
    if (body) {
      body.style.overflow = '';
    }
    
    // Afficher toutes les sections et le contenu principal
    const mainContent = document.querySelector('main') || document.querySelector('section') || document.body;
    if (mainContent) {
      const allSections = mainContent.querySelectorAll('section:not(#page-loader), main > *, body > section:not(#page-loader)');
      allSections.forEach(section => {
        if (section.id !== 'page-loader') {
          section.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
          section.style.opacity = '';
          section.style.visibility = '';
          section.style.pointerEvents = '';
        }
      });
    }
    
    // Afficher aussi les éléments directement dans le body
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
      if (child.id !== 'page-loader') {
        child.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
        child.style.opacity = '';
        child.style.visibility = '';
        child.style.pointerEvents = '';
      }
    });
    
    // Forcer le reflow pour déclencher la transition
    if (body) body.offsetHeight;
    
    // Afficher avec une transition douce
    setTimeout(() => {
      const allSections = mainContent.querySelectorAll('section:not(#page-loader), main > *, body > section:not(#page-loader)');
      allSections.forEach(section => {
        if (section.id !== 'page-loader') {
          section.style.opacity = '1';
          section.style.visibility = 'visible';
        }
      });
      
      bodyChildren.forEach(child => {
        if (child.id !== 'page-loader') {
          child.style.opacity = '1';
          child.style.visibility = 'visible';
        }
      });
    }, 50);
  }
  
  // Fonction pour afficher le header et le footer après le chargement
  function showHeaderAndFooter() {
    const header = document.querySelector('.hero-header') || document.querySelector('.site-header');
    const headerInner = document.querySelector('.site-header__inner');
    const footer = document.querySelector('.hero-footer');
    const contactBtn = document.querySelector('.hero-footer .contact-btn') || document.querySelector('.btn-wrapper.contact-btn');
    const reserveSpaceBtn = document.querySelector('.btn-wrapper.btn-reserve-space-mobile');
    
    if (header) {
      header.style.opacity = '';
      header.style.visibility = '';
      header.style.pointerEvents = '';
      header.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }
    if (headerInner) {
      headerInner.style.opacity = '';
      headerInner.style.visibility = '';
      headerInner.style.pointerEvents = '';
      headerInner.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }
    if (footer) {
      footer.style.opacity = '';
      footer.style.visibility = '';
      footer.style.pointerEvents = '';
      footer.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }
    if (contactBtn) {
      contactBtn.style.opacity = '';
      contactBtn.style.visibility = '';
      contactBtn.style.pointerEvents = '';
      contactBtn.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }
    if (reserveSpaceBtn) {
      reserveSpaceBtn.style.opacity = '';
      reserveSpaceBtn.style.visibility = '';
      reserveSpaceBtn.style.pointerEvents = '';
      reserveSpaceBtn.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }
    
    // Forcer le reflow pour déclencher la transition
    if (header) header.offsetHeight;
    if (headerInner) headerInner.offsetHeight;
    if (footer) footer.offsetHeight;
    if (contactBtn) contactBtn.offsetHeight;
    if (reserveSpaceBtn) reserveSpaceBtn.offsetHeight;
    
    // Afficher avec une transition douce
    setTimeout(() => {
      if (header) {
        header.style.opacity = '1';
        header.style.visibility = 'visible';
      }
      if (headerInner) {
        headerInner.style.opacity = '1';
        headerInner.style.visibility = 'visible';
      }
      if (footer) {
        footer.style.opacity = '1';
        footer.style.visibility = 'visible';
      }
      if (contactBtn) {
        contactBtn.style.opacity = '1';
        contactBtn.style.visibility = 'visible';
      }
      if (reserveSpaceBtn) {
        reserveSpaceBtn.style.opacity = '1';
        reserveSpaceBtn.style.visibility = 'visible';
      }
    }, 50);
  }
  
  const initLoader = () => {
    const loader = document.getElementById('page-loader');
    if (!loader) {
      // Si le loader n'existe pas, afficher quand même tout le contenu
      showAllContent();
      showHeaderAndFooter();
      return;
    }

    // Cacher TOUT le contenu au début (sauf le loader)
    hideAllContent();
    hideHeaderAndFooter();

    const hideLoader = () => {
      if (loader.classList.contains('is-hidden')) return;
      loader.classList.add('is-hidden');
      
      // Ajouter la classe page-loaded au body et retirer data-loading
      document.body.classList.add('page-loaded');
      document.body.removeAttribute('data-loading');
      
      // Afficher TOUT le contenu après un court délai pour une transition fluide
      setTimeout(() => {
        showAllContent();
        showHeaderAndFooter();
      }, 300);
      
      setTimeout(() => {
        loader.remove();
      }, 600);
    };

    // Attendre que toutes les ressources soient chargées
    if (document.readyState === 'complete') {
      // Attendre encore un peu pour s'assurer que tout est vraiment chargé
      setTimeout(hideLoader, 100);
    } else {
      window.addEventListener('load', () => {
        // Attendre encore un peu après l'événement load pour s'assurer que tout est chargé
        setTimeout(hideLoader, 200);
      }, { once: true });
    }
  };

  // Cacher immédiatement au chargement du script
  if (document.readyState === 'loading') {
    // Cacher dès que le DOM est disponible
    document.addEventListener('DOMContentLoaded', () => {
      hideAllContent();
      hideHeaderAndFooter();
      initLoader();
    }, { once: true });
  } else {
    // Si le DOM est déjà chargé, cacher immédiatement puis initialiser
    hideAllContent();
    hideHeaderAndFooter();
    initLoader();
  }
})();


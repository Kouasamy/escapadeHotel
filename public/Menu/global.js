document.addEventListener('DOMContentLoaded', () => {
  const baseImage = document.querySelector('.image-container img:not(.image-transition-layer)');
  const transitionLayer = document.querySelector('.image-transition-layer');
  const navItems = document.querySelectorAll('.nav-item');
  const closeButton = document.querySelector('.menu-close-button');
  const closeButtonIcon = closeButton ? closeButton.querySelector('img') : null;
  const menuContainer = document.querySelector('.menu-container');

  if (!baseImage || !transitionLayer || !navItems.length) return;

  const originalSrc = baseImage.getAttribute('src');
  
  // Précharger toutes les images du menu pour améliorer les performances
  const preloadedImages = new Map();
  navItems.forEach((item) => {
    const hoverSrc = item.getAttribute('data-image');
    if (!hoverSrc) return;
    
    // Précharger l'image en arrière-plan
    const img = new Image();
    img.src = hoverSrc;
    preloadedImages.set(hoverSrc, img);
  });

  // Variable pour suivre l'image actuellement affichée
  let currentDisplayedImage = null;

  // Fonction pour afficher une image (utilisée par desktop et mobile/tablette)
  function showImage(imageSrc) {
    // Ne rien faire si c'est déjà l'image affichée
    if (currentDisplayedImage === imageSrc) return;
    
    // L'image est déjà préchargée, on peut l'utiliser directement
    const preloadedImg = preloadedImages.get(imageSrc);
    if (preloadedImg && preloadedImg.complete) {
      transitionLayer.setAttribute('src', imageSrc);
      transitionLayer.classList.add('is-visible');
      currentDisplayedImage = imageSrc; // Mettre à jour l'image actuelle
    } else {
      // Si pas encore chargée, on charge normalement
      transitionLayer.setAttribute('src', imageSrc);
      transitionLayer.classList.add('is-visible');
      currentDisplayedImage = imageSrc; // Mettre à jour l'image actuelle
    }
  }

  navItems.forEach((item) => {
    const hoverSrc = item.getAttribute('data-image');
    if (!hoverSrc) return;

    // Événement pour desktop (mouseenter)
    item.addEventListener('mouseenter', () => {
      showImage(hoverSrc);
    });

    // Événements pour mobile et tablette (touchstart et touchend)
    // Ces événements permettent d'afficher l'image au touch sur mobile/tablette
    item.addEventListener('touchstart', (e) => {
      // Ne pas empêcher le comportement par défaut pour permettre la navigation
      // mais afficher l'image
      showImage(hoverSrc);
    });

    item.addEventListener('touchend', (e) => {
      // Afficher l'image même après le touchend pour qu'elle reste visible
      showImage(hoverSrc);
    });

    // Événement click pour mobile/tablette (fallback)
    // Cela fonctionne aussi sur desktop mais ne gêne pas
    item.addEventListener('click', () => {
      // Afficher l'image au clic (pour mobile/tablette)
      showImage(hoverSrc);
    });

    // Supprimer le comportement mouseleave pour que l'image reste affichée
    // L'image ne changera que lorsqu'un autre nav-item sera survolé ou touché
  });

  if (closeButton && menuContainer) {
    const runClose = (e) => {
      e.preventDefault();
      if (closeButtonIcon) closeButtonIcon.classList.add('is-closing');
      menuContainer.classList.add('is-closing');
      
      // Retirer la classe du body
      document.body.classList.remove('menu-overlay-open');
      
      // Réafficher le header et le footer quand le menu se ferme
      const header = document.querySelector('.hero-header') || document.querySelector('.site-header');
      const headerInner = document.querySelector('.site-header__inner');
      const footer = document.querySelector('.hero-footer');
      const contactBtn = document.querySelector('.hero-footer .contact-btn') || document.querySelector('.btn-wrapper.contact-btn');
      const reserveSpaceBtn = document.querySelector('.btn-wrapper.btn-reserve-space-mobile');
      
      const isMobileOrTablet = window.innerWidth <= 1024;
      
      if (isMobileOrTablet) {
        if (header) {
          header.style.display = '';
          header.classList.remove('scroll-hide');
        }
        if (headerInner) {
          headerInner.style.display = '';
          headerInner.classList.remove('scroll-hide');
        }
        if (footer) {
          footer.style.display = '';
          footer.classList.remove('scroll-hide');
        }
        if (contactBtn) {
          contactBtn.style.display = '';
          contactBtn.classList.remove('scroll-hide');
        }
        if (reserveSpaceBtn) {
          reserveSpaceBtn.style.display = '';
          reserveSpaceBtn.classList.remove('scroll-hide');
        }
      } else {
        if (header) header.classList.remove('scroll-hide');
        if (headerInner) headerInner.classList.remove('scroll-hide');
        if (footer) footer.classList.remove('scroll-hide');
        if (contactBtn) contactBtn.classList.remove('scroll-hide');
        if (reserveSpaceBtn) reserveSpaceBtn.classList.remove('scroll-hide');
      }
      
      // After animation, fully hide and disable interactions
      setTimeout(() => {
        menuContainer.classList.remove('is-closing');
        menuContainer.classList.add('is-hidden');
        menuContainer.style.pointerEvents = 'none';
        if (closeButtonIcon) closeButtonIcon.classList.remove('is-closing');
      }, 300);
    };

    closeButton.addEventListener('click', runClose);
    if (closeButtonIcon) closeButtonIcon.addEventListener('click', runClose);
  }
  
  // Cacher le header et le footer quand le menu s'ouvre (si ouvert depuis un autre script)
  const menuButton = document.querySelector('.menu-button');
  if (menuButton && menuContainer) {
    menuButton.addEventListener('click', () => {
      // Ajouter une classe au body pour indiquer que le menu est ouvert
      document.body.classList.add('menu-overlay-open');
      
      const header = document.querySelector('.hero-header') || document.querySelector('.site-header');
      const headerInner = document.querySelector('.site-header__inner');
      const footer = document.querySelector('.hero-footer');
      const contactBtn = document.querySelector('.hero-footer .contact-btn') || document.querySelector('.btn-wrapper.contact-btn');
      const reserveSpaceBtn = document.querySelector('.btn-wrapper.btn-reserve-space-mobile');
      
      const isMobileOrTablet = window.innerWidth <= 1024;
      
      if (isMobileOrTablet) {
        if (header) {
          header.style.display = 'none';
          header.classList.add('scroll-hide');
        }
        if (headerInner) {
          headerInner.style.display = 'none';
          headerInner.classList.add('scroll-hide');
        }
        if (footer) {
          footer.style.display = 'none';
          footer.classList.add('scroll-hide');
        }
        if (contactBtn) {
          contactBtn.style.display = 'none';
          contactBtn.classList.add('scroll-hide');
        }
        if (reserveSpaceBtn) {
          reserveSpaceBtn.style.display = 'none';
          reserveSpaceBtn.classList.add('scroll-hide');
        }
      } else {
        if (header) header.classList.add('scroll-hide');
        if (headerInner) headerInner.classList.add('scroll-hide');
        if (footer) footer.classList.add('scroll-hide');
        if (contactBtn) contactBtn.classList.add('scroll-hide');
        if (reserveSpaceBtn) reserveSpaceBtn.classList.add('scroll-hide');
      }
    });
  }
});
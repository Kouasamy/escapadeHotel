// Script pour détecter quand le header est sur un fond blanc et changer sa couleur
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.site-header');
  const headerInner = document.querySelector('.site-header__inner');
  const heroFooter = document.querySelector('.hero-footer');
  
  // Variable pour suivre la dernière position de scroll et la direction
  let lastScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  let isScrollingUp = false;
  
  // Fonction pour vérifier si un élément est sur un fond blanc ou clair
  function isOnWhiteBackground(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Obtenir l'élément à la position de l'élément
    const elementBelow = document.elementFromPoint(centerX, centerY);
    if (!elementBelow) return false;
    
    // Vérifier les parents jusqu'à trouver un élément avec un fond défini
    let current = elementBelow;
    let parent = current;
    
    // Remonter jusqu'au body
    while (parent && parent !== document.body) {
      const styles = window.getComputedStyle(parent);
      const bgColor = styles.backgroundColor;
      const bgImage = styles.backgroundImage;
      
      // Si background-image n'est pas "none", considérer comme non-blanc
      if (bgImage && bgImage !== 'none' && !bgImage.includes('rgba(0, 0, 0')) {
        return false;
      }
      
      // Extraire les valeurs RGB du background-color
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const r = parseInt(rgbMatch[0]);
        const g = parseInt(rgbMatch[1]);
        const b = parseInt(rgbMatch[2]);
        const alpha = rgbMatch[3] ? parseFloat(rgbMatch[3]) : 1;
        
        // Si le fond est blanc ou très clair (RGB > 240) et opaque
        if (alpha > 0.5 && r > 240 && g > 240 && b > 240) {
          return true;
        }
        
        // Si le fond est opaque et clair
        if (alpha > 0.8 && (r + g + b) / 3 > 200) {
          return true;
        }
      }
      
      parent = parent.parentElement;
    }
    
    return false;
  }

  // Fonction pour vérifier si un élément est sur une section avec fond blanc
  function checkElementBackground(element, className, onlyOnScrollUp) {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Vérifier le point au centre de l'élément
    const pointBelow = document.elementFromPoint(centerX, centerY);
    
    if (!pointBelow) {
      element.classList.remove(className);
      return;
    }
    
    // Vérifier si c'est sur une section avec classe bg-white ou style background blanc
    let currentElement = pointBelow;
    let isOnWhite = false;
    
    while (currentElement && currentElement !== document.body) {
      const styles = window.getComputedStyle(currentElement);
      const bgColor = styles.backgroundColor;
      const classes = currentElement.className;
      
      // Vérifier les classes Tailwind ou CSS qui indiquent un fond blanc
      if (typeof classes === 'string' && (
        classes.includes('bg-white') || 
        classes.includes('details-section') ||
        classes.includes('welcome-section') ||
        classes.includes('bg-[#fff]') ||
        classes.includes('bg-[#ffffff]') ||
        classes.includes('restaurant-section') ||
        classes.includes('faq-section') ||
        classes.includes('lounge-section')
      )) {
        isOnWhite = true;
        break;
      }
      
      // Vérifier le background-color calculé
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const r = parseInt(rgbMatch[0]);
        const g = parseInt(rgbMatch[1]);
        const b = parseInt(rgbMatch[2]);
        const alpha = rgbMatch[3] ? parseFloat(rgbMatch[3]) : 1;
        
        if (alpha > 0.5 && r > 240 && g > 240 && b > 240) {
          isOnWhite = true;
          break;
        }
      }
      
      currentElement = currentElement.parentElement;
    }
    
    // Appliquer la classe seulement si on scroll vers le haut ET qu'il y a un fond blanc
    // Ou retirer la classe si on scroll vers le bas
    if (onlyOnScrollUp) {
      if (isOnWhite && isScrollingUp) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    } else {
      if (isOnWhite) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }
  }

  // Fonction pour vérifier si le header est sur une section avec fond blanc
  function checkHeaderBackground() {
    // Détecter la direction du scroll
    const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    isScrollingUp = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
    
    // Si on est en haut de la page (moins de 50px), retirer les classes pour headerInner et heroFooter
    if (currentScrollY < 50) {
      if (headerInner) headerInner.classList.remove('header-inner-on-white');
      if (heroFooter) heroFooter.classList.remove('hero-footer-on-white');
      // Ne pas retourner ici, continuer pour vérifier le header principal
    }
    
    if (header) {
      const headerRect = header.getBoundingClientRect();
      const headerBottom = headerRect.bottom;
      const headerCenterX = headerRect.left + headerRect.width / 2;
      
      // Vérifier le point juste en dessous du header
      const pointBelow = document.elementFromPoint(headerCenterX, headerBottom + 10);
      
      if (!pointBelow) {
        header.classList.remove('header-on-white');
        if (headerInner) headerInner.classList.remove('header-inner-on-white');
        return;
      }
      
      // Vérifier si c'est sur une section avec classe bg-white ou style background blanc
      let element = pointBelow;
      let isOnWhite = false;
      
      while (element && element !== document.body) {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        const classes = element.className;
        
        // Vérifier les classes Tailwind ou CSS qui indiquent un fond blanc
        if (typeof classes === 'string' && (
          classes.includes('bg-white') || 
          classes.includes('details-section') ||
          classes.includes('welcome-section') ||
          classes.includes('bg-[#fff]') ||
          classes.includes('bg-[#ffffff]') ||
          classes.includes('restaurant-section') ||
          classes.includes('faq-section') ||
          classes.includes('lounge-section')
        )) {
          isOnWhite = true;
          break;
        }
        
        // Vérifier le background-color calculé
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          const alpha = rgbMatch[3] ? parseFloat(rgbMatch[3]) : 1;
          
          if (alpha > 0.5 && r > 240 && g > 240 && b > 240) {
            isOnWhite = true;
            break;
          }
        }
        
        element = element.parentElement;
      }
      
      if (isOnWhite) {
        header.classList.add('header-on-white');
        // Pour headerInner, appliquer seulement si on scroll vers le haut
        if (headerInner && isScrollingUp) {
          headerInner.classList.add('header-inner-on-white');
        } else if (headerInner) {
          headerInner.classList.remove('header-inner-on-white');
        }
      } else {
        header.classList.remove('header-on-white');
        if (headerInner) headerInner.classList.remove('header-inner-on-white');
      }
    }
    
    // Vérifier aussi headerInner indépendamment - seulement au scroll vers le haut
    if (headerInner) {
      checkElementBackground(headerInner, 'header-inner-on-white', true);
    }
    
    // Vérifier hero-footer - seulement au scroll vers le haut
    if (heroFooter) {
      checkElementBackground(heroFooter, 'hero-footer-on-white', true);
    }
  }

  // Vérifier au chargement
  checkHeaderBackground();

  // Vérifier au scroll avec throttling
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        checkHeaderBackground();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Vérifier lors du redimensionnement
  window.addEventListener('resize', function() {
    checkHeaderBackground();
  });
});


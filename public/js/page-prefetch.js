/**
 * Page Prefetch - Optimise le chargement des pages pour une navigation rapide
 * 
 * Ce script :
 * - Précharge les pages liées au survol des liens
 * - Optimise le chargement des ressources critiques
 * - Améliore la navigation entre les pages
 */

(function() {
  'use strict';

  // Configuration : Pages à précharger avec leurs ressources critiques
  const pageResources = {
    'page_suite.html': {
      css: ['css/suite.css', 'css/style1.css'],
      js: ['js/suite.js']
    },
    'restaurant.html': {
      css: ['css/style1.css'],
      js: []
    },
    'lounge.html': {
      css: ['css/style1.css'],
      js: []
    },
    'page_evenementiel.html': {
      css: ['css/style1.css'],
      js: []
    }
  };

  /**
   * Précharge une page et ses ressources critiques
   */
  function prefetchPage(href) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    // Précharger la page HTML
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);

    // Précharger les ressources CSS associées
    const pageName = href.split('/').pop() || href;
    const resources = pageResources[pageName];
    
    if (resources) {
      resources.css.forEach(cssPath => {
        const cssLink = document.createElement('link');
        cssLink.rel = 'prefetch';
        cssLink.href = cssPath;
        cssLink.as = 'style';
        document.head.appendChild(cssLink);
      });

      resources.js.forEach(jsPath => {
        const jsLink = document.createElement('link');
        jsLink.rel = 'prefetch';
        jsLink.href = jsPath;
        jsLink.as = 'script';
        document.head.appendChild(jsLink);
      });
    }
  }

  /**
   * Précharge les pages au survol des liens
   */
  function setupLinkPrefetch() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Précharger au survol (desktop)
      link.addEventListener('mouseenter', () => {
        prefetchPage(href);
      }, { once: true, passive: true });

      // Précharger au touchstart (mobile)
      link.addEventListener('touchstart', () => {
        prefetchPage(href);
      }, { once: true, passive: true });
    });
  }

  /**
   * Précharge les pages critiques au chargement
   */
  function prefetchCriticalPages() {
    // Précharger page_suite.html si on est sur index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
      prefetchPage('page_suite.html');
    }
  }

  /**
   * Optimise la navigation en préchargeant les pages suivantes probables
   */
  function optimizeNavigation() {
    // Détecter la page actuelle et précharger les pages suivantes probables
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
      // Sur la page d'accueil, précharger les pages principales
      setTimeout(() => {
        prefetchPage('page_suite.html');
        prefetchPage('restaurant.html');
      }, 2000); // Attendre 2 secondes pour ne pas surcharger le chargement initial
    }
  }

  /**
   * Initialisation
   */
  function init() {
    // Précharger les pages critiques
    prefetchCriticalPages();

    // Configurer le préchargement au survol des liens
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setupLinkPrefetch();
        optimizeNavigation();
      });
    } else {
      setupLinkPrefetch();
      optimizeNavigation();
    }

    // Observer les nouveaux liens ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      setupLinkPrefetch();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Démarrer l'optimisation
  init();
})();


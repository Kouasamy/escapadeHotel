// Système de suivi de navigation pour le bouton de retour
// Ce script suit les pages visitées dans sessionStorage
(function() {
  'use strict';
  
  const STORAGE_KEY = 'escapade-navigation-history';
  const MAX_HISTORY_LENGTH = 50; // Limiter la taille de l'historique
  
  function getNavigationHistory() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }
  
  function saveNavigationHistory(history) {
    try {
      // Limiter la taille de l'historique
      if (history.length > MAX_HISTORY_LENGTH) {
        history = history.slice(-MAX_HISTORY_LENGTH);
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      // Ignorer les erreurs de stockage
    }
  }
  
  function getCurrentPage() {
    // Obtenir le nom de la page actuelle depuis l'URL
    const path = window.location.pathname;
    let page = path.split('/').pop() || 'index.html';
    
    // Si la page est vide ou juste "/", c'est la page d'accueil
    if (!page || page === '/' || page === '') {
      page = 'index.html';
    }
    
    // Inclure le chemin relatif si nécessaire (pour Menu/index.html)
    if (path.includes('Menu/')) {
      page = 'Menu/index.html';
    }
    
    return page;
  }
  
  function addToHistory(page) {
    const history = getNavigationHistory();
    const lastPage = history[history.length - 1];
    
    // Ne pas ajouter si c'est la même page que la dernière
    if (lastPage !== page) {
      history.push(page);
      saveNavigationHistory(history);
    }
  }
  
  function getPreviousPage() {
    const history = getNavigationHistory();
    if (history.length < 2) {
      return null; // Pas assez de pages dans l'historique
    }
    
    // Retourner l'avant-dernière page (la page précédente)
    return history[history.length - 2];
  }
  
  function goBack() {
    const history = getNavigationHistory();
    
    if (history.length < 2) {
      // Pas d'historique, utiliser l'historique du navigateur
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
      return;
    }
    
    // Retirer la page actuelle de l'historique
    const currentPage = getCurrentPage();
    if (history[history.length - 1] === currentPage) {
      history.pop();
    }
    
    // Obtenir la page précédente
    const previousPage = history[history.length - 1];
    
    // Sauvegarder l'historique mis à jour
    saveNavigationHistory(history);
    
    if (previousPage) {
      // Rediriger vers la page précédente
      window.location.href = previousPage;
    } else {
      // Si pas de page précédente, aller à l'accueil
      window.location.href = 'index.html';
    }
  }
  
  // Initialiser : ajouter la page actuelle à l'historique
  function init() {
    const currentPage = getCurrentPage();
    const history = getNavigationHistory();
    
    // Si l'historique est vide ou si la dernière page n'est pas la page actuelle
    // (pour éviter les doublons lors des rechargements)
    if (history.length === 0 || history[history.length - 1] !== currentPage) {
      addToHistory(currentPage);
    }
  }
  
  // Exposer les fonctions globalement pour le bouton de retour
  window.EscapadeNavigation = {
    addToHistory: addToHistory,
    getPreviousPage: getPreviousPage,
    goBack: goBack,
    getCurrentPage: getCurrentPage
  };
  
  // Initialiser au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


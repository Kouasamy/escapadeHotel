/**
 * Background Loader
 * Ajoute un lazy loading efficace pour les éléments utilisant des images de fond.
 *
 * Utilisation :
 *  - Ajouter l'attribut data-bg="chemin/vers/image.jpg" sur un élément.
 *  - Optionnel : data-bg-priority="high" pour charger immédiatement.
 *  - Optionnel : data-bg-placeholder="chemin/placeholder.jpg" pour afficher un aperçu.
 */

(() => {
  const LOAD_MARGIN = '250px';
  const LOADED_FLAG = 'bgLoaded';

  function setPlaceholder(element) {
    if (element.dataset.bgPlaceholder) {
      element.style.backgroundImage = `url("${element.dataset.bgPlaceholder}")`;
      element.style.backgroundSize = element.style.backgroundSize || 'cover';
      element.style.backgroundPosition = element.style.backgroundPosition || 'center';
    } else if (!element.style.backgroundImage) {
      element.style.backgroundColor = element.dataset.bgColor || 'rgba(0,0,0,0.04)';
    }
  }

  function loadBackground(element) {
    const src = element.dataset.bg;
    if (!src || element.dataset[LOADED_FLAG]) return;

    const image = new Image();
    image.onload = () => {
      element.style.backgroundImage = `url("${src}")`;
      element.classList.add('lazy-bg-loaded');
      element.dataset[LOADED_FLAG] = 'true';
      element.style.removeProperty('backgroundColor');
    };
    image.onerror = () => {
      element.dataset[LOADED_FLAG] = 'error';
      element.classList.add('lazy-bg-error');
    };
    image.src = src;
  }

  function initObserver(elements) {
    if (!('IntersectionObserver' in window)) {
      elements.forEach(loadBackground);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadBackground(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: LOAD_MARGIN });

    elements.forEach((element) => {
      if (element.dataset.bgPriority === 'high') {
        loadBackground(element);
      } else {
        setPlaceholder(element);
        observer.observe(element);
      }
    });
  }

  function init() {
    const elements = Array.from(document.querySelectorAll('[data-bg]'));
    if (!elements.length) return;

    initObserver(elements);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


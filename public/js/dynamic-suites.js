/**
 * Script pour charger dynamiquement les suites depuis l'API Laravel
 * À ajouter dans index.html et page_suite.html
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Pour index.html - galerie horizontale
    const suiteGalleryTrack = document.querySelector('.suite-gallery-track');
    
    // Pour page_suite.html - grille de cartes
    const suiteGrid = document.querySelector('#dynamic-suites-container') || document.querySelector('.suite-grid');
    
    const container = suiteGalleryTrack || suiteGrid;
    if (!container) return;

    try {
        const response = await fetch('/api/suites');
        if (!response.ok) throw new Error('Erreur lors du chargement des suites');
        
        const suites = await response.json();
        
        // Vider le contenu statique existant
        container.innerHTML = '';
        
        // Si c'est la galerie horizontale (index.html)
        if (suiteGalleryTrack) {
            // Fonction pour obtenir le nom formaté avec accents selon le type de suite
            function getSuiteDisplayName(suite) {
                const suiteType = suite.type.toLowerCase();
                
                // Mapping des types vers les noms avec accents corrects
                const suiteNameMap = {
                    'junior': 'Suites Junior',
                    'senior': 'Suites Sénior',
                    'senior_vip': 'Suites sénior avec piscines',
                    'senior_pool': 'Suites sénior avec piscines',
                    'villa_familiale': 'Villa Familiale',
                    'villa': 'Villa Familiale'
                };
                
                // Si le type est dans le mapping, utiliser le nom avec accents
                if (suiteNameMap[suiteType]) {
                    return suiteNameMap[suiteType];
                }
                
                // Sinon, utiliser le nom de la base de données mais préserver les accents
                // Ne pas utiliser toLowerCase() qui peut supprimer les accents
                return suite.name;
            }
            
            suites.forEach(suite => {
                const suiteCard = document.createElement('div');
                suiteCard.className = 'flex flex-col items-center suite-card';
                
                // Déterminer la largeur selon le type de suite (comme dans l'original)
                const suiteType = suite.type.toLowerCase();
                const cardWidth = (suiteType === 'senior_vip' || suiteType === 'senior_pool') ? 'w-[283px]' : 'w-[270px]';
                const borderWidth = (suiteType === 'senior_vip' || suiteType === 'senior_pool') ? 'w-[140px]' : 'w-[110px]';
                const borderRadius = (suiteType === 'senior_vip' || suiteType === 'senior_pool') ? 'rounded-[55px_0px]' : 'rounded-[50px_0px]';
                
                // Utiliser la fonction pour obtenir le nom avec accents
                const suiteNameFormatted = getSuiteDisplayName(suite);
                
                suiteCard.innerHTML = `
                    <div class="${cardWidth} h-[235px] bg-cover bg-center ${borderRadius} shadow-md lazy-bg suite-card-image" data-bg="${suite.image}"></div>
                    <p class="mt-4 font-[Futura_Md_BT] text-[24px] md:text-[28px] leading-[32px] md:leading-[38px]">${suiteNameFormatted}</p>
                    <div class="${borderWidth} border-t border-black my-2"></div>
                    <a href="${suite.url || 'page_suite.html'}" class="text-[15px] font-[Futura_Md_BT] hover:underline" data-translate="viewRoom">Voir la chambre</a>
                `;
                
                suiteGalleryTrack.appendChild(suiteCard);
            });
            
            // Réinitialiser le lazy loading des images
            if (window.imageOptimizer) {
                window.imageOptimizer.init();
            }
            
            // Réinitialiser le background loader pour les nouvelles images avec data-bg
            // Re-sélectionner tous les éléments avec data-bg pour charger les backgrounds
            const bgElements = document.querySelectorAll('[data-bg]:not([data-bgLoaded])');
            if (bgElements.length > 0 && window.IntersectionObserver) {
                const bgObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            const src = element.dataset.bg;
                            if (src && !element.dataset.bgLoaded) {
                                const img = new Image();
                                img.onload = () => {
                                    element.style.backgroundImage = `url("${src}")`;
                                    element.classList.add('lazy-bg-loaded');
                                    element.dataset.bgLoaded = 'true';
                                };
                                img.onerror = () => {
                                    element.dataset.bgLoaded = 'error';
                                    element.classList.add('lazy-bg-error');
                                };
                                img.src = src;
                            }
                            bgObserver.unobserve(element);
                        }
                    });
                }, { rootMargin: '250px' });
                
                bgElements.forEach((element) => {
                    bgObserver.observe(element);
                });
            }
        }
        // Si c'est la grille (page_suite.html)
        else if (suiteGrid) {
            // Fonction helper pour formater les nombres
            function number_format(number, decimals, dec_point, thousands_sep) {
                number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                const n = !isFinite(+number) ? 0 : +number;
                const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
                const sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
                const dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
                let s = '';
                const toFixedFix = function (n, prec) {
                    const k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                if (s[0].length > 3) {
                    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                return s.join(dec);
            }
            
            // Fonction pour obtenir le nom formaté avec accents selon le type de suite
            function getSuiteDisplayNameForGrid(suite) {
                const suiteType = suite.type.toLowerCase();
                
                // Mapping des types vers les noms avec accents corrects (format pour grille avec highlight)
                const suiteNameMap = {
                    'junior': { first: 'SUITES', last: 'JUNIOR' },
                    'senior': { first: 'SUITES', last: 'SÉNIOR' },
                    'senior_vip': { first: 'SUITES SÉNIOR AVEC', last: 'PISCINES' },
                    'senior_pool': { first: 'SUITES SÉNIOR AVEC', last: 'PISCINES' },
                    'villa_familiale': { first: 'VILLA FAMILIALE AVEC PISCINE', last: 'PRIVÉE' },
                    'villa': { first: 'VILLA FAMILIALE AVEC PISCINE', last: 'PRIVÉE' }
                };
                
                // Si le type est dans le mapping, utiliser le nom avec accents
                if (suiteNameMap[suiteType]) {
                    const mapped = suiteNameMap[suiteType];
                    return `${mapped.first} <span class="highlight text-[#BB996B]">${mapped.last}</span>`;
                }
                
                // Sinon, utiliser le nom de la base de données mais préserver les accents
                const suiteNameUpper = suite.name.toUpperCase();
                const words = suiteNameUpper.split(' ').filter(w => w.length > 0);
                
                if (words.length > 1) {
                    const lastWord = words[words.length - 1];
                    const firstPart = words.slice(0, -1).join(' ');
                    return `${firstPart} <span class="highlight text-[#BB996B]">${lastWord}</span>`;
                } else {
                    return `<span class="highlight text-[#BB996B]">${suiteNameUpper}</span>`;
                }
            }
            
            suites.forEach(suite => {
                const suiteCard = document.createElement('article');
                
                // Déterminer les classes selon le type de suite
                // Mapping des types de la BDD vers les styles du front-end
                let cardClass = 'suite-card';
                
                // Normaliser le type pour la comparaison (gérer les variations)
                const suiteType = suite.type.toLowerCase();
                
                if (suiteType === 'junior') {
                    cardClass = 'suite-card';
                } else if (suiteType === 'senior') {
                    cardClass = 'suite-card';
                } else if (suiteType === 'senior_vip' || suiteType === 'senior_pool') {
                    cardClass = 'suite-card suite-senior-piscine';
                } else if (suiteType === 'villa_familiale' || suiteType === 'villa') {
                    cardClass = 'suite-card suite-villa-familiale';
                } else {
                    // Fallback générique pour les nouveaux types
                    cardClass = 'suite-card';
                }
                
                // Utiliser la fonction pour obtenir le nom avec accents et highlight
                const titleClass = getSuiteDisplayNameForGrid(suite);
                
                suiteCard.className = cardClass;
                
                // Formater le prix
                const weekendPrice = suite.weekend_rate ? number_format(suite.weekend_rate, 0, ',', ' ') : '250 000';
                const weekPrice = suite.weekly_rate ? number_format(suite.weekly_rate, 0, ',', ' ') : '200 000';
                
                suiteCard.innerHTML = `
                    <img src="${suite.image}" alt="${suite.name}" class="suite-image" loading="lazy">
                    <div class="suite-content">
                        <div class="suite-header">
                            <h2 class="suite-title">${titleClass}</h2>
                            <p class="suite-price">${weekendPrice} FCFA - <span data-translate="suiteWeekend">Week-end</span></p>
                        </div>
                        <img src="images/324_579.svg" alt="Divider" class="suite-divider">
                        <div class="suite-details">
                            <div class="suite-amenities">
                                ${suite.area ? `<div class="amenity-item">
                                    <img src="images/324_691.svg" alt="Area icon" class="amenity-icon">
                                    <span class="amenity-label">${suite.area} m²</span>
                                </div>` : ''}
                                ${suite.features && suite.features.some(f => f.toLowerCase().includes('terrasse')) ? `<div class="amenity-item">
                                    <img src="images/iconeTerrasse.jpg" alt="Terrasse icon" class="amenity-icon">
                                    <span class="amenity-label" data-translate="terrace">Terrasse</span>
                                </div>` : ''}
                                ${suite.features && suite.features.some(f => f.toLowerCase().includes('piscine')) ? `<div class="amenity-item">
                                    <img src="images/324_620.svg" alt="Pool icon" class="amenity-icon">
                                    <span class="amenity-label" data-translate="pool">Piscine</span>
                                </div>` : ''}
                                <div class="amenity-item">
                                    <img src="images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png" alt="TV icon" class="amenity-icon tv-icon">
                                    <span class="amenity-label">TV</span>
                                </div>
                            </div>
                            <p class="suite-price">${weekPrice} FCFA - <span data-translate="suiteWeek">Semaine</span></p>
                        </div>
                        <img src="images/324_579.svg" alt="Divider" class="suite-divider">
                        <div class="suite-footer">
                            <a href="${suite.url || 'suite_junior.html'}" class="details-link" data-translate="viewSuite">Voir la suite</a>
                        </div>
                    </div>
                `;
                
                suiteGrid.appendChild(suiteCard);
            });
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement des suites:', error);
        // En cas d'erreur, garder le contenu statique original
    }
});


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
            // Fonction pour obtenir la clé de traduction selon le type de suite (pour galerie)
            function getSuiteTranslateKeyForGallery(suite) {
                const suiteType = suite.type.toLowerCase();
                const translateKeyMap = {
                    'junior': 'suiteJuniorTitle',
                    'senior': 'suiteSeniorTitle',
                    'senior_vip': 'suiteSeniorWithPool',
                    'senior_pool': 'suiteSeniorWithPool',
                    'villa_familiale': 'suiteVillaFamilialeTitle',
                    'villa': 'suiteVillaFamilialeTitle'
                };
                return translateKeyMap[suiteType] || null;
            }

            // Fonction pour obtenir le nom formaté avec accents selon le type de suite
            // IMPORTANT: Pour permettre la traduction, on utilise toujours le mapping basé sur le type
            // Le système de traduction remplacera le contenu par la traduction appropriée
            function getSuiteDisplayName(suite) {
                const suiteType = suite.type ? suite.type.toLowerCase() : '';
                const suiteNameMap = {
                    'junior': 'Suites Junior',
                    'senior': 'Suites Sénior',
                    'senior_vip': 'Suites sénior avec piscines',
                    'senior_pool': 'Suites sénior avec piscines',
                    'villa_familiale': 'Villa Familiale',
                    'villa': 'Villa Familiale'
                };

                if (suiteNameMap[suiteType]) {
                    return suiteNameMap[suiteType];
                }

                // Fallback générique
                return 'Suite';
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

                // TOUJOURS utiliser data-translate pour permettre la traduction en anglais
                // Même si un nom personnalisé existe, on utilise la clé de traduction basée sur le type
                // Le système de traduction remplacera le contenu par la traduction appropriée
                const translateKey = getSuiteTranslateKeyForGallery(suite);

                // TOUJOURS ajouter l'attribut data-translate pour permettre la traduction
                const translateAttr = translateKey ? ` data-translate="${translateKey}"` : '';

                suiteCard.innerHTML = `
                    <div class="${cardWidth} h-[235px] bg-cover bg-center ${borderRadius} shadow-md lazy-bg suite-card-image" data-bg="${suite.image}"></div>
                    <p class="mt-4 font-[Futura_Md_BT] text-[24px] md:text-[28px] leading-[32px] md:leading-[38px]"${translateAttr}>${suiteNameFormatted}</p>
                    <div class="${borderWidth} border-t border-black my-2"></div>
                    <a href="${suite.url || 'page_suite.html'}" class="text-[15px] font-[Futura_Md_BT] hover:underline" data-translate="viewRoom">Voir la suite</a>
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

            // Fonction pour formater l'aire (supprime .00 mais garde les autres décimales)
            function formatArea(area) {
                if (!area && area !== 0) return '';
                const num = parseFloat(area);
                if (isNaN(num)) return area;
                // Arrondir à 2 décimales pour éviter les problèmes de précision
                const rounded = Math.round(num * 100) / 100;
                // Si c'est un nombre entier (ou se termine par .00), retourner sans décimales
                if (rounded % 1 === 0) {
                    return rounded.toString();
                }
                // Sinon, retourner avec les décimales mais supprimer les zéros de fin
                return rounded.toString().replace(/\.?0+$/, '');
            }

            // Fonction pour obtenir la clé de traduction selon le type de suite
            function getSuiteTranslateKey(suite) {
                const suiteType = suite.type.toLowerCase();
                const translateKeyMap = {
                    'junior': 'suiteJuniorTitle',
                    'senior': 'suiteSeniorTitle',
                    'senior_vip': 'suiteSeniorVipTitle',
                    'senior_pool': 'suiteSeniorVipTitle',
                    'villa_familiale': 'suiteVillaFamilialeTitle',
                    'villa': 'suiteVillaFamilialeTitle'
                };
                return translateKeyMap[suiteType] || null;
            }

            // Fonction pour obtenir le nom formaté avec accents selon le type de suite
            // IMPORTANT: Le HTML généré doit correspondre EXACTEMENT aux valeurs du dictionnaire de traduction
            // pour que le système de traduction fonctionne correctement
            function getSuiteDisplayNameForGrid(suite) {
                const suiteType = suite.type ? suite.type.toLowerCase() : '';
                // Utiliser les valeurs EXACTES du dictionnaire de traduction français
                const suiteNameMap = {
                    'junior': 'SUITES <span class="highlight text-[#BB996B]">JUNIOR</span>',
                    'senior': 'SUITES <span class="highlight text-[#BB996B]">SÉNIOR</span>',
                    'senior_vip': 'SUITES SÉNIOR <span class="highlight text-[#BB996B]">AVEC PISCINES</span>',
                    'senior_pool': 'SUITES SÉNIOR <span class="highlight text-[#BB996B]">AVEC PISCINES</span>',
                    'villa_familiale': 'VILLA FAMILIALE AVEC <span class="highlight text-[#BB996B]">PISCINE PRIVÉE</span>',
                    'villa': 'VILLA FAMILIALE AVEC <span class="highlight text-[#BB996B]">PISCINE PRIVÉE</span>'
                };

                if (suiteNameMap[suiteType]) {
                    return suiteNameMap[suiteType];
                }

                // Fallback générique
                return '<span class="highlight text-[#BB996B]">SUITE</span>';
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

                // TOUJOURS utiliser data-translate pour permettre la traduction en anglais
                // Même si un nom personnalisé existe, on utilise la clé de traduction basée sur le type
                // Le système de traduction remplacera le contenu par la traduction appropriée
                const translateKey = getSuiteTranslateKey(suite);

                suiteCard.className = cardClass;

                // Déterminer si c'est une villa ou une suite senior avec piscine
                const suiteName = (suite.name || '').toLowerCase();
                const isVilla = suiteType === 'villa_familiale' || suiteType === 'villa' || suiteName.includes('villa');
                const isSeniorPool = suiteType === 'senior_pool' || suiteType === 'senior_vip' ||
                                    (suiteName.includes('senior') && (suiteName.includes('piscine') || suiteName.includes('pool') || suiteName.includes('vip')));
                const isSenior = suiteType === 'senior' || (suiteName.includes('senior') && !isSeniorPool);

                // Pour la villa et les suites senior avec piscine, toujours afficher la superficie
                // Pour la villa : 170 m² par défaut si non défini
                // Pour les suites senior avec piscine : 70 m² par défaut si non défini
                let areaToDisplay = suite.area;
                if (!areaToDisplay && isVilla) {
                    areaToDisplay = '170';
                } else if (!areaToDisplay && isSeniorPool) {
                    areaToDisplay = '70';
                }

                // Formater l'aire pour enlever les .00
                if (areaToDisplay) {
                    areaToDisplay = formatArea(areaToDisplay);
                }

                // Générer l'icône de superficie appropriée
                let areaHTML = '';
                if (areaToDisplay) {
                    // Pour les suites senior avec piscine, utiliser l'icône merged
                    if (isSeniorPool) {
                        areaHTML = `<div class="amenity-item">
                            <!--merged image-->
                            <div class="amenity-icon-merged">
                                <img src="images/324_616.svg" alt="Area icon part" style="position: absolute; top: 2px; left: 4px;">
                                <img src="images/324_621.svg" alt="Area icon part" style="position: absolute; top: 5px; left: 0px;">
                                <img src="images/324_623.svg" alt="Area icon part" style="position: absolute; top: 2.99px; left: 44.96px;">
                                <img src="images/324_625.svg" alt="Area icon part" style="position: absolute; top: 22.98px; left: 26.01px;">
                            </div>
                            <span class="amenity-label">${areaToDisplay} m²</span>
                        </div>`;
                    } else if (isVilla) {
                        // Pour la villa, utiliser l'icône simple spécifique
                        areaHTML = `<div class="amenity-item">
                            <img src="images/324_692.svg" alt="Area icon" class="amenity-icon">
                            <span class="amenity-label">${areaToDisplay} m²</span>
                        </div>`;
                    } else if (isSenior) {
                        // Pour les suites senior (sans piscine), utiliser l'icône merged
                        areaHTML = `<div class="amenity-item">
                            <!--merged image-->
                            <div class="amenity-icon-merged">
                                <img src="images/324_583.svg" alt="Area icon part" style="position: absolute; top: 3px; left: 10px;">
                                <img src="images/324_587.svg" alt="Area icon part" style="position: absolute; top: 6px; left: 6px;">
                                <img src="images/324_589.svg" alt="Area icon part" style="position: absolute; top: 9.9px; left: 41.9px;">
                                <img src="images/324_591.svg" alt="Area icon part" style="position: absolute; top: 29.9px; left: 23px;">
                            </div>
                            <span class="amenity-label">${areaToDisplay} m²</span>
                        </div>`;
                    } else {
                        // Pour les suites junior et autres, utiliser l'icône simple
                        areaHTML = `<div class="amenity-item">
                            <img src="images/324_691.svg" alt="Area icon" class="amenity-icon">
                            <span class="amenity-label">${areaToDisplay} m²</span>
                        </div>`;
                    }
                }

                // Filtrer les aménités pour exclure "2 Chambres", "Salon", etc.
                // Liste des équipements à EXCLURE explicitement
                const excludedFeatures = ['chambres', 'chambre', 'salon', 'cuisine', 'salle de bain', 'salle de bains', 'bain', 'douche', 'wc', 'toilette'];
                const featuresArray = Array.isArray(suite.features) ? suite.features : [];
                const filteredFeatures = featuresArray.filter(f => {
                    if (!f) return false;
                    const fLower = f.toLowerCase();
                    return !excludedFeatures.some(excluded => fLower.includes(excluded));
                });

                // Vérifier la présence de Terrasse et Piscine dans les features filtrées
                const hasTerrasse = filteredFeatures.some(f => {
                    const fLower = f.toLowerCase();
                    return fLower.includes('terrasse');
                });
                const hasPiscine = filteredFeatures.some(f => {
                    const fLower = f.toLowerCase();
                    return fLower.includes('piscine') || fLower.includes('pool');
                });

                // Pour la villa et les suites senior avec piscine, toujours afficher Terrasse et Piscine
                const showTerrasse = hasTerrasse || isVilla || isSeniorPool;
                const showPiscine = hasPiscine || isVilla || isSeniorPool;

                // Formater le prix
                const weekendPrice = suite.weekend_rate ? number_format(suite.weekend_rate, 0, ',', ' ') : '250 000';
                const weekPrice = suite.weekly_rate ? number_format(suite.weekly_rate, 0, ',', ' ') : '200 000';

                // TOUJOURS ajouter l'attribut data-translate pour permettre la traduction
                const translateAttr = translateKey ? ` data-translate="${translateKey}"` : '';

                suiteCard.innerHTML = `
                    <img src="${suite.image}" alt="${suite.name}" class="suite-image" loading="lazy">
                    <div class="suite-content">
                        <div class="suite-header">
                            <h2 class="suite-title"${translateAttr}>${titleClass}</h2>
                            <p class="suite-price">${weekendPrice} FCFA - <span data-translate="suiteWeekend">Week-end</span></p>
                        </div>
                        <img src="images/324_579.svg" alt="Divider" class="suite-divider">
                        <div class="suite-details">
                            <div class="suite-amenities">
                                ${areaHTML}
                                ${showTerrasse ? `<div class="amenity-item">
                                    <img src="images/iconeTerrasse.jpg" alt="Terrasse icon" class="amenity-icon">
                                    <span class="amenity-label" data-no-translate="true">Terrasse</span>
                                </div>` : ''}
                                ${showPiscine ? `<div class="amenity-item">
                                    <img src="images/324_620.svg" alt="Piscine icon" class="amenity-icon">
                                    <span class="amenity-label" data-no-translate="true">Piscine</span>
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

            // Réappliquer les traductions après le chargement des suites dynamiques
            // Attendre un peu pour que le DOM soit mis à jour
            setTimeout(() => {
                // S'assurer que les labels "Piscine" et "Terrasse" ne sont pas modifiés par le système de traduction
                const piscineLabels = document.querySelectorAll('.amenity-label');
                piscineLabels.forEach(label => {
                    const img = label.previousElementSibling;
                    if (img && img.src && img.src.includes('324_620')) {
                        // C'est l'icône de piscine, s'assurer que le texte est "Piscine"
                        if (label.textContent.trim() !== 'Piscine') {
                            label.textContent = 'Piscine';
                            label.setAttribute('data-no-translate', 'true');
                        }
                    } else if (img && (img.src.includes('iconeTerrasse') || img.alt.includes('Terrasse'))) {
                        // C'est l'icône de terrasse, s'assurer que le texte est "Terrasse"
                        if (label.textContent.trim() !== 'Terrasse') {
                            label.textContent = 'Terrasse';
                            label.setAttribute('data-no-translate', 'true');
                        }
                    }
                });

                // Déclencher l'événement languageChanged pour forcer la réapplication
                const currentLang = localStorage.getItem('escapade-lang') || 'fr';

                // IMPORTANT: Le système de traduction lit le contenu initial et l'utilise comme référence française
                // Il faut donc forcer le système à réenregistrer les valeurs françaises pour les nouveaux éléments
                // puis appliquer la traduction de la langue actuelle

                // Attendre un peu pour que le DOM soit complètement mis à jour
                setTimeout(() => {
                    if (window.applyTranslations) {
                        // IMPORTANT: Ne pas appeler applyTranslations('fr') d'abord
                        // Le système de traduction lit automatiquement le contenu initial comme référence française
                        // Appliquer directement la langue actuelle
                        window.applyTranslations(currentLang);
                        
                        // Réappliquer une deuxième fois après un court délai pour capturer tous les éléments
                        setTimeout(() => {
                            window.applyTranslations(currentLang);
                        }, 100);
                    }

                    // Déclencher l'événement pour notifier le changement
                    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
                }, 100);
            }, 100);
        }

    } catch (error) {
        console.error('Erreur lors du chargement des suites:', error);
        // En cas d'erreur, garder le contenu statique original
    }
});


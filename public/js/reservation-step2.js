/**
 * Script pour la page reservation1.html (étape 2 - sélection de suite)
 * Charge les données de réservation et les suites disponibles
 */
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Script reservation-step2.js démarré');
    let reservationData = null;

    try {
        // 1. Charger les données de réservation depuis la session
        console.log('📡 Chargement des données de réservation...');
        const reservationResponse = await fetch('/api/reservation-data');

        if (reservationResponse.ok) {
            reservationData = await reservationResponse.json();
            console.log('✅ Données de réservation chargées:', reservationData);

            // 2. Mettre à jour le résumé des dates et invités
            const nightsSummary = document.querySelector('.nights-summary');
            const detailsGroup = document.querySelector('.details-group');
            const guestsSummary = document.querySelector('.guests-summary');

            if (nightsSummary) {
                nightsSummary.innerHTML = `<span data-translate="reservationNightsSelected">Nuits sélectionnées</span> ${reservationData.nights}`;
            }

            if (detailsGroup) {
                detailsGroup.innerHTML = `
                    <span class="detail-item">${reservationData.arrival_formatted}</span>
                    <img src="images/324_672.svg" alt="arrow icon" class="arrow-icon">
                    <span class="detail-item">${reservationData.departure_formatted}</span>
                `;
            }

            if (guestsSummary) {
                guestsSummary.innerHTML = `<span data-translate="reservationGuests">Invités</span> : ${reservationData.guests}`;
            }

            // 3. Mettre à jour le lien "Modifier" pour pointer vers la page 1
            const modifyBtn = document.querySelector('.btn.btn-primary[data-translate="reservationModify"]');
            if (modifyBtn) {
                modifyBtn.href = '/page_reservation1.html';
            }
        } else {
            // Si pas de données de réservation, on continue quand même pour charger les suites
            console.warn('⚠️ Aucune donnée de réservation trouvée dans la session, chargement de toutes les suites');
        }
    } catch (error) {
        console.error('❌ Erreur lors du chargement des données de réservation:', error);
        // On continue quand même pour charger les suites
    }

    // 4. TOUJOURS charger et afficher TOUTES les suites disponibles, peu importe les données de réservation
    // Cela garantit que toutes les suites sont visibles, indépendamment du nombre d'invités
    console.log('🔄 Démarrage du chargement des suites...');
    try {
        await loadAvailableSuites(reservationData);
    } catch (error) {
        console.error('❌ Erreur fatale lors du chargement des suites:', error);
        console.error('Stack trace:', error.stack);
        // En cas d'erreur, garder le contenu statique original
        console.log('ℹ️ Les suites statiques HTML restent affichées en fallback');
    }
});

/**
 * Charge et affiche les suites disponibles avec informations de capacité
 * Affiche TOUTES les suites actives, peu importe le nombre de personnes
 * IMPORTANT: Cette fonction ne filtre PAS par capacité - toutes les suites sont affichées
 */
async function loadAvailableSuites(reservationData) {
    const suiteGrid = document.querySelector('.suite-grid');

    if (!suiteGrid) {
        console.error('❌ La grille de suites (.suite-grid) n\'a pas été trouvée dans le DOM');
        return;
    }

    try {
        // Utiliser /api/suites pour obtenir TOUTES les suites actives
        // Ne JAMAIS filtrer par capacité - l'utilisateur doit voir toutes les options
        // Même si le nombre d'invités est supérieur à la capacité, on affiche quand même la suite
        console.log('🔄 Chargement des suites depuis /api/suites...');
        const suitesResponse = await fetch('/api/suites');

        if (!suitesResponse.ok) {
            console.error('❌ Erreur HTTP lors du chargement des suites:', suitesResponse.status, suitesResponse.statusText);
            // Ne pas vider la grille - garder les suites statiques en fallback
            console.log('ℹ️ Conservation des suites statiques en fallback');
            return;
        }

        const suites = await suitesResponse.json();
        console.log(`📦 ${suites.length} suite(s) reçue(s) de l'API`);

        if (!Array.isArray(suites)) {
            console.error('❌ La réponse de l\'API n\'est pas un tableau:', typeof suites);
            return;
        }

        if (suites.length === 0) {
            console.warn('⚠️ Aucune suite retournée par l\'API /api/suites');
            // Ne pas vider la grille si aucune suite n'est retournée - garder les suites statiques
            return;
        }

        // Vider la grille existante pour charger les suites dynamiques
        suiteGrid.innerHTML = '';

        // Générer les cartes de suite avec informations de capacité
        // AFFICHER TOUTES LES SUITES, sans aucun filtrage par capacité
        // IMPORTANT: Afficher toutes les suites, peu importe le nombre d'invités ou la capacité
        suites.forEach((suite, index) => {
            try {
                // Log des données de la suite pour déboguer
                console.log(`🔄 Création de la suite ${index + 1}/${suites.length}:`, {
                    name: suite.name,
                    type: suite.type,
                    capacity_adults: suite.capacity_adults,
                    capacity_children: suite.capacity_children,
                    is_active: suite.is_active
                });

                const suiteCard = createSuiteCard(suite);
                suiteGrid.appendChild(suiteCard);
                console.log(`✅ Suite ${index + 1}/${suites.length} créée et affichée: ${suite.name || suite.type}`);
            } catch (error) {
                console.error(`❌ Erreur lors de la création de la carte pour la suite ${index + 1}:`, error);
                console.error('Données de la suite:', suite);
                // Même en cas d'erreur, on continue pour afficher les autres suites
            }
        });

        console.log(`✅ ${suites.length} suite(s) chargée(s) et affichée(s) (sans filtrage par capacité)`);

        // Réinitialiser les gestionnaires d'événements pour les nouveaux boutons
        initializeSuiteSelection();

        // Réappliquer les traductions après le chargement des suites
        // IMPORTANT: Le système de traduction doit d'abord enregistrer le contenu initial comme référence française
        setTimeout(() => {
            const currentLang = localStorage.getItem('escapade-lang') || 'fr';

            // Si une fonction ensureFrenchBaseline existe, l'appeler pour enregistrer le contenu initial
            // Sinon, le système de traduction le fera automatiquement lors du prochain appel
            if (window.ensureFrenchBaseline) {
                window.ensureFrenchBaseline();
            }

            if (window.applyTranslations) {
                // Appliquer directement la langue actuelle
                // Le système de traduction utilisera le contenu initial comme référence française
                window.applyTranslations(currentLang);

                // Réappliquer une deuxième fois après un court délai pour capturer tous les éléments
                setTimeout(() => {
                    window.applyTranslations(currentLang);
                }, 100);
            }

            // Déclencher l'événement pour que d'autres scripts puissent réagir
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
        }, 200);

    } catch (error) {
        console.error('❌ Erreur lors du chargement des suites:', error);
        console.error('Stack trace:', error.stack);
        // En cas d'erreur, garder le contenu statique original (les suites HTML statiques)
        console.log('ℹ️ Conservation des suites statiques en fallback suite à l\'erreur');
    }
}

/**
 * Fonction pour obtenir le nom formaté avec accents selon le type de suite
 * IMPORTANT: Pour permettre la traduction, on utilise toujours le mapping basé sur le type
 * Le système de traduction remplacera le contenu par la traduction appropriée
 */
function getSuiteDisplayName(suite) {
    const suiteType = suite.type ? suite.type.toLowerCase() : '';
    // Utiliser les valeurs exactes du dictionnaire de traduction français
    const suiteNameMap = {
        'junior': 'SUITES JUNIOR',
        'senior': 'SUITES SÉNIOR',
        'senior_vip': 'SUITES SÉNIOR AVEC PISCINE',
        'senior_pool': 'SUITES SÉNIOR AVEC PISCINE',
        'villa_familiale': 'VILLA FAMILIALE AVEC PISCINE PRIVÉE',
        'villa': 'VILLA FAMILIALE AVEC PISCINE PRIVÉE'
    };

    if (suiteNameMap[suiteType]) {
        return suiteNameMap[suiteType];
    }

    // Fallback générique
    return 'SUITE';
}

/**
 * Fonction pour obtenir la clé de traduction selon le type de suite
 */
function getSuiteTranslateKey(suite) {
    const suiteType = suite.type ? suite.type.toLowerCase() : '';
    const translateKeyMap = {
        'junior': 'reservationSuiteJunior',
        'senior': 'reservationSuiteSenior',
        'senior_vip': 'reservationSuiteSeniorPool',
        'senior_pool': 'reservationSuiteSeniorPool',
        'villa_familiale': 'reservationVillaFamiliale',
        'villa': 'reservationVillaFamiliale'
    };
    return translateKeyMap[suiteType] || null;
}

/**
 * Crée une carte de suite avec informations de capacité
 */
function createSuiteCard(suite) {
    const article = document.createElement('article');
    article.className = 'suite-card';
    article.setAttribute('data-suite-type', getSuiteTypeFromName(suite.name));
    // Ajouter l'ID de la suite pour les suites créées dans le dashboard
    if (suite.id) {
        article.setAttribute('data-suite-id', suite.id);
    }

    // Utiliser la fonction pour obtenir le nom avec accents
    const suiteDisplayName = getSuiteDisplayName(suite);

    // TOUJOURS utiliser data-translate pour permettre la traduction en anglais
    const translateKey = getSuiteTranslateKey(suite);
    const translateAttr = translateKey ? ` data-translate="${translateKey}"` : '';

    // Déterminer le type de suite une seule fois
    const suiteType = (suite.type || '').toLowerCase();
    const suiteName = (suite.name || '').toLowerCase();
    const isVilla = suiteType === 'villa_familiale' || suiteType === 'villa' || suiteName.includes('villa');
    const isSeniorPool = suiteType === 'senior_pool' || suiteType === 'senior_vip' ||
                        (suiteName.includes('senior') && (suiteName.includes('piscine') || suiteName.includes('pool') || suiteName.includes('vip')));

    // Générer les informations de capacité (retourne déjà le HTML avec <p class="suite-info">)
    // S'assurer que le texte de capacité est toujours généré, même si les données sont incomplètes
    let capacityInfoHTML = generateCapacityInfo(suite);

    // Fallback si generateCapacityInfo retourne une chaîne vide ou null
    if (!capacityInfoHTML || capacityInfoHTML.trim() === '') {
        // Générer un texte de capacité par défaut basé sur le type de suite (avec traductions)
        if (isVilla) {
            capacityInfoHTML = `<p class="suite-info"><span style="color: #B78F62;" data-translate="reservationExtraMattresses">Possibilité d'ajouter des matelas supplémentaires pour 15 000 FCFA chacun, jusqu'à 8 personnes.</span></p>`;
        } else {
            capacityInfoHTML = `<p class="suite-info"><span style="color: #B78F62;" data-translate="reservationExtraMattress">Possibilité d'ajouter un matelas supplémentaire pour 15 000 FCFA, augmentant la capacité.</span></p>`;
        }
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
        // Pour les suites senior avec piscine, utiliser l'icône merged (comme dans le HTML statique)
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
        } else {
            // Pour les autres suites (junior, senior), utiliser l'icône simple standard
            // Si c'est une suite senior (sans piscine), utiliser l'icône merged
            const isSenior = suiteType === 'senior' || suiteName.includes('senior');
            if (isSenior && !isSeniorPool) {
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
    }

    // Générer l'HTML de la carte
    article.innerHTML = `
        <img src="${suite.image || 'img/4.jpg'}" alt="${suite.name || 'Suite'}" class="suite-image" loading="lazy">
        <div class="suite-content">
            <div class="suite-header">
                <h2 class="suite-title"${translateAttr}>${suiteDisplayName}</h2>
                <p class="suite-price">${formatPrice(suite.weekend_rate)} FCFA - <span data-translate="reservationWeekend">Week-end</span></p>
            </div>
            <img src="images/324_579.svg" alt="Divider" class="suite-divider">
            <div class="suite-details">
                <div class="suite-amenities">
                    ${areaHTML}
                    ${generateAmenitiesHTML(suite.features)}
                </div>
                <p class="suite-price">${formatPrice(suite.weekly_rate)} FCFA - <span data-translate="reservationWeek">Semaine</span></p>
            </div>
            ${capacityInfoHTML}
            <img src="images/324_579.svg" alt="Divider" class="suite-divider">
            <div class="suite-footer">
                <a href="${suite.url || '#'}" class="details-link" data-translate="reservationViewSuite">Voir la suite</a>
                <a href="#" class="btn btn-primary" data-translate="reservationSelect">Sélectionner</a>
            </div>
        </div>
    `;

    // Note: Les traductions seront réappliquées après l'insertion de toutes les cartes
    // dans la fonction loadAvailableSuites pour éviter des appels multiples

    return article;
}

/**
 * Génère le HTML des équipements
 * Affiche UNIQUEMENT les équipements dans l'ordre : Terrasse, Piscine, TV
 * Ignore TOUS les autres équipements (comme "2 Chambres", "Salon", etc.)
 */
function generateAmenitiesHTML(features) {
    if (!features || features.length === 0) {
        return '';
    }

    // Liste des équipements à EXCLURE explicitement
    const excludedFeatures = ['chambres', 'chambre', 'salon', 'cuisine', 'salle de bain', 'salle de bains', 'bain', 'douche', 'wc', 'toilette'];

    // Ordre d'affichage souhaité : Terrasse, Piscine, TV
    // IMPORTANT: Ne garder QUE ces équipements, ignorer tous les autres
    const displayOrder = ['Terrasse', 'Piscine', 'TV'];
    const featuresArray = Array.isArray(features) ? features : [];

    // Filtrer d'abord pour exclure les équipements non désirés
    const filteredFeatures = featuresArray.filter(f => {
        if (!f) return false;
        const fLower = f.toLowerCase();
        // Exclure si le feature contient un mot de la liste d'exclusion
        return !excludedFeatures.some(excluded => fLower.includes(excluded));
    });

    // Filtrer et trier les équipements selon l'ordre souhaité
    // Ne garder QUE les équipements qui correspondent à Terrasse, Piscine ou TV
    const sortedFeatures = displayOrder.filter(displayFeature => {
        return filteredFeatures.some(f => {
            const fLower = f.toLowerCase();
            const displayFeatureLower = displayFeature.toLowerCase();
            return fLower.includes(displayFeatureLower) || displayFeatureLower.includes(fLower);
        });
    });

    // IMPORTANT: Ne jamais afficher d'autres équipements, même si aucun dans displayOrder n'est trouvé
    // Cela garantit que seules Terrasse, Piscine et TV sont affichées
    const featuresToDisplay = sortedFeatures;

    return featuresToDisplay.map(feature => {
        const iconSrc = getFeatureIcon(feature);
        const displayName = getFeatureDisplayName(feature);
        return `
            <div class="amenity-item">
                <img src="${iconSrc}" alt="${displayName} icon" class="amenity-icon">
                <span class="amenity-label" data-translate="reservation${displayName}">${displayName}</span>
            </div>
        `;
    }).join('');
}

/**
 * Obtient le nom d'affichage standardisé pour un équipement
 */
function getFeatureDisplayName(feature) {
    if (!feature) return feature;
    const fLower = feature.toLowerCase();

    if (fLower.includes('terrasse')) return 'Terrasse';
    if (fLower.includes('piscine')) return 'Piscine';
    if (fLower.includes('tv') || fLower.includes('télévision')) return 'TV';

    return feature;
}

/**
 * Génère les informations de capacité
 * Affiche uniquement les informations sur les matelas supplémentaires (sans les phrases de capacité)
 */
function generateCapacityInfo(suite) {
    // Vérifier si c'est une villa familiale (par type ou par nom)
    const suiteType = (suite.type || '').toLowerCase();
    const suiteName = (suite.name || '').toLowerCase();
    const isVilla = suiteType === 'villa_familiale' || suiteType === 'villa' || suiteName.includes('villa');

    if (isVilla) {
        // Pour la villa familiale - uniquement le texte des matelas supplémentaires
        return `<p class="suite-info"><span style="color: #B78F62;" data-translate="reservationExtraMattresses">Possibilité d'ajouter des matelas supplémentaires pour 15 000 FCFA chacun, jusqu'à 8 personnes.</span></p>`;
    } else {
        // Pour toutes les autres suites (Junior, Senior, Senior avec piscine)
        // Uniquement le texte des matelas supplémentaires
        return `<p class="suite-info"><span style="color: #B78F62;" data-translate="reservationExtraMattress">Possibilité d'ajouter un matelas supplémentaire pour 15 000 FCFA, augmentant la capacité.</span></p>`;
    }
}

/**
 * Détermine le type de suite depuis le nom
 */
function getSuiteTypeFromName(name) {
    if (!name) return 'junior'; // fallback si pas de nom

    const nameLower = name.toLowerCase();

    // Détecter les suites Junior
    if (nameLower.includes('junior')) return 'junior';

    // Détecter les suites Senior avec piscine (vérifier avant les suites Senior normales)
    if (nameLower.includes('senior') && (nameLower.includes('piscine') || nameLower.includes('pool') || nameLower.includes('vip'))) {
        return 'senior_pool';
    }

    // Détecter les suites Senior normales
    if (nameLower.includes('senior')) return 'senior';

    // Détecter les villas
    if (nameLower.includes('villa')) return 'villa';

    return 'junior'; // fallback
}

/**
 * Obtient l'icône pour un équipement
 */
function getFeatureIcon(feature) {
    if (!feature) return 'images/324_691.svg';

    const fLower = feature.toLowerCase();
    const featureIcons = {
        'terrasse': 'images/iconeTerrasse.jpg',
        'tv': 'images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png',
        'télévision': 'images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png',
        'piscine': 'images/324_620.svg',
        'piscine privée': 'images/324_620.svg'
    };

    // Chercher une correspondance (exacte ou partielle)
    for (const [key, icon] of Object.entries(featureIcons)) {
        if (fLower.includes(key) || key.includes(fLower)) {
            return icon;
        }
    }

    return featureIcons[fLower] || 'images/324_691.svg';
}

/**
 * Formate le prix (supprime les .00 et ajoute des espaces pour les milliers)
 */
function formatPrice(price) {
    if (!price) return '0';
    // Convertir en nombre pour supprimer les .00
    let num = parseFloat(price);
    // Arrondir à 2 décimales pour éviter les problèmes de précision
    num = Math.round(num * 100) / 100;
    // Si c'est un nombre entier, le retourner sans décimales
    if (num % 1 === 0) {
        num = Math.floor(num);
    }
    // Ajouter des espaces pour les milliers
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Initialise les gestionnaires d'événements pour la sélection de suite
 */
function initializeSuiteSelection() {
    const buttons = document.querySelectorAll('.suite-card .btn-primary');

    // Helper pour envoyer la sélection au backend (type + quantité + suite_id si disponible)
    function updateSelectedSuite(suiteType, quantity, suiteId, suiteDisplayName, action = 'add') {
        if (!suiteType) return;
        const qty = Math.max(0, parseInt(quantity || 0, 10));

        let url = `/api/select-suite?suite_type=${encodeURIComponent(suiteType)}&quantity=${qty}&action=${action}`;
        if (suiteId) {
            url += `&suite_id=${encodeURIComponent(suiteId)}`;
        }
        if (suiteDisplayName) {
            url += `&suite_display_name=${encodeURIComponent(suiteDisplayName)}`;
            console.log('Envoi du nom d\'affichage:', suiteDisplayName);
        } else {
            console.warn('Nom d\'affichage non trouvé pour la suite:', suiteType);
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Suite sélectionnée avec succès:', data);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour de la suite sélectionnée :', error);
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const suiteCard = button.closest('.suite-card');
            const suiteType = suiteCard ? suiteCard.getAttribute('data-suite-type') : null;
            const suiteId = suiteCard ? suiteCard.getAttribute('data-suite-id') : null;
            // Récupérer le nom d'affichage exact depuis le titre de la carte
            const suiteTitleElement = suiteCard ? suiteCard.querySelector('.suite-title') : null;
            const suiteDisplayName = suiteTitleElement ? suiteTitleElement.textContent.trim() : null;

            // Si le bouton n'a pas encore été transformé
            if (!button.classList.contains('selected')) {
                button.classList.add('selected');

                // Créer le conteneur du compteur (similaire à guest-stepper)
                const counter = document.createElement('div');
                counter.classList.add('counter', 'guest-stepper');

                // Image moins
                const minusImg = document.createElement('img');
                minusImg.src = 'images/568_943.svg';
                minusImg.alt = 'minus';
                minusImg.classList.add('guest-minus');

                // Nombre (au milieu)
                const number = document.createElement('span');
                number.textContent = '1';
                number.classList.add('counter-number', 'guest-value');

                // Image plus
                const plusImg = document.createElement('img');
                plusImg.src = 'images/568_944.svg';
                plusImg.alt = 'plus';
                plusImg.classList.add('guest-plus');

                // Ajout des éléments dans l'ordre: moins, nombre, plus
                counter.appendChild(minusImg);
                counter.appendChild(number);
                counter.appendChild(plusImg);

                // Remplacer le bouton d'origine
                button.replaceWith(counter);

                // Enregistrer la suite sélectionnée avec quantité 1, suite_id et nom d'affichage si disponibles
                updateSelectedSuite(suiteType, 1, suiteId, suiteDisplayName);

                // Événements du compteur
                plusImg.addEventListener('click', () => {
                    const current = parseInt(number.textContent, 10) || 1;
                    const next = current + 1;
                    number.textContent = String(next);
                    updateSelectedSuite(suiteType, next, suiteId, suiteDisplayName);
                });

                minusImg.addEventListener('click', () => {
                    let value = parseInt(number.textContent, 10) || 1;
                    if (value > 1) {
                        const next = value - 1;
                        number.textContent = String(next);
                        updateSelectedSuite(suiteType, next, suiteId, suiteDisplayName);
                    } else {
                        // Si on retombe à 0, supprimer la suite et remettre le bouton d'origine
                        counter.replaceWith(button);
                        button.classList.remove('selected');
                        // Supprimer la suite de la sélection
                        updateSelectedSuite(suiteType, 0, suiteId, suiteDisplayName, 'remove');
                    }
                });
            }
        });
    });
}



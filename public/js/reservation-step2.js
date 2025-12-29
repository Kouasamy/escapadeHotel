/**
 * Script pour la page reservation1.html (étape 2 - sélection de suite)
 * Charge les données de réservation et les suites disponibles
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. Charger les données de réservation depuis la session
        const reservationResponse = await fetch('/api/reservation-data');

        if (!reservationResponse.ok) {
            // Si pas de données de réservation, ne pas rediriger automatiquement
            // L'utilisateur peut toujours voir les suites et utiliser le bouton "Suivant"
            console.warn('Aucune donnée de réservation trouvée dans la session');
            return;
        }

        const reservationData = await reservationResponse.json();

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

        // 4. Charger et afficher les suites disponibles avec informations de capacité
        await loadAvailableSuites(reservationData);

    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // En cas d'erreur, garder le contenu statique original
    }
});

/**
 * Charge et affiche les suites disponibles avec informations de capacité
 */
async function loadAvailableSuites(reservationData) {
    try {
        const suitesResponse = await fetch('/api/available-suites');

        if (!suitesResponse.ok) {
            console.warn('Impossible de charger les suites disponibles');
            return;
        }

        const suites = await suitesResponse.json();
        const suiteGrid = document.querySelector('.suite-grid');

        if (!suiteGrid || suites.length === 0) {
            return;
        }

        // Vider la grille existante
        suiteGrid.innerHTML = '';

        // Générer les cartes de suite avec informations de capacité
        suites.forEach(suite => {
            const suiteCard = createSuiteCard(suite);
            suiteGrid.appendChild(suiteCard);
        });

        // Réinitialiser les gestionnaires d'événements pour les nouveaux boutons
        initializeSuiteSelection();

    } catch (error) {
        console.error('Erreur lors du chargement des suites:', error);
    }
}

/**
 * Fonction pour obtenir le nom formaté avec accents selon le type de suite
 */
function getSuiteDisplayName(suite) {
    const suiteType = suite.type.toLowerCase();

    // Mapping des types vers les noms avec accents corrects
    const suiteNameMap = {
        'junior': 'SUITES JUNIOR',
        'senior': 'SUITES SÉNIOR',
        'senior_vip': 'SUITES SÉNIOR AVEC PISCINE',
        'senior_pool': 'SUITES SÉNIOR AVEC PISCINE',
        'villa_familiale': 'VILLA FAMILIALE AVEC PISCINE PRIVÉE',
        'villa': 'VILLA FAMILIALE AVEC PISCINE PRIVÉE'
    };

    // Si le type est dans le mapping, utiliser le nom avec accents
    if (suiteNameMap[suiteType]) {
        return suiteNameMap[suiteType];
    }

    // Sinon, utiliser le nom de la base de données mais préserver les accents
    return suite.name.toUpperCase();
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

    // Générer l'HTML de la carte
    article.innerHTML = `
        <img src="${suite.image}" alt="${suite.name}" class="suite-image">
        <div class="suite-content">
            <div class="suite-header">
                <h2 class="suite-title">${suiteDisplayName}</h2>
                <p class="suite-price">${formatPrice(suite.weekend_rate)} FCFA - <span data-translate="reservationWeekend">Week-end</span></p>
            </div>
            <img src="images/324_579.svg" alt="Divider" class="suite-divider">
            <div class="suite-details">
                <div class="suite-amenities">
                    <div class="amenity-item">
                        <img src="images/324_691.svg" alt="Area icon" class="amenity-icon">
                        <span class="amenity-label">${suite.area} m²</span>
                    </div>
                    ${generateAmenitiesHTML(suite.features)}
                </div>
                <p class="suite-price">${formatPrice(suite.weekly_rate)} FCFA - <span data-translate="reservationWeek">Semaine</span></p>
            </div>
            <p class="suite-info">${generateCapacityInfo(suite)}</p>
            <img src="images/324_579.svg" alt="Divider" class="suite-divider">
            <div class="suite-footer">
                <a href="${suite.url}" class="details-link" data-translate="reservationViewSuite">Voir la suite</a>
                <a href="#" class="btn btn-primary" data-translate="reservationSelect">Sélectionner</a>
            </div>
        </div>
    `;

    return article;
}

/**
 * Génère le HTML des équipements
 */
function generateAmenitiesHTML(features) {
    if (!features || features.length === 0) {
        return '';
    }

    return features.map(feature => {
        const iconSrc = getFeatureIcon(feature);
        return `
            <div class="amenity-item">
                <img src="${iconSrc}" alt="${feature} icon" class="amenity-icon">
                <span class="amenity-label" data-translate="reservation${feature}">${feature}</span>
            </div>
        `;
    }).join('');
}

/**
 * Génère les informations de capacité
 */
function generateCapacityInfo(suite) {
    const adults = suite.capacity_adults || 0;
    const children = suite.capacity_children || 0;

    if (suite.type === 'villa_familiale') {
        return `Capacité par défaut : ${adults} adultes. <span style="color: #B78F62;">Possibilité d'ajouter des matelas supplémentaires pour 15 000 FCFA chacun, jusqu'à 8 personnes.</span>`;
    } else {
        let capacityText = `Capacité maximale : ${adults} personnes`;
        if (children > 0) {
            capacityText += ` (dont ${children} enfants)`;
        }
        capacityText += `.<br><span style="color: #B78F62;">Possibilité d'ajouter un matelas supplémentaire pour 15 000 FCFA, augmentant la capacité.</span>`;
        return capacityText;
    }
}

/**
 * Détermine le type de suite depuis le nom
 */
function getSuiteTypeFromName(name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('junior')) return 'junior';
    if (nameLower.includes('senior') && nameLower.includes('piscine')) return 'senior_pool';
    if (nameLower.includes('senior')) return 'senior';
    if (nameLower.includes('villa')) return 'villa';
    return 'junior'; // fallback
}

/**
 * Obtient l'icône pour un équipement
 */
function getFeatureIcon(feature) {
    const featureIcons = {
        'Terrasse': 'images/iconeTerrasse.jpg',
        'TV': 'images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png',
        'Piscine': 'images/324_620.svg'
    };
    return featureIcons[feature] || 'images/324_691.svg';
}

/**
 * Formate le prix
 */
function formatPrice(price) {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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



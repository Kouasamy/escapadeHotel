/**
 * Script pour la page reservation3.html (étape 3 - détails & confirmation)
 * Met à jour les informations de la div card-wrapper avec les données de réservation
 */
// Attendre que tous les scripts soient chargés, y compris le script de traduction
function initReservationStep3() {
    // Attendre un peu pour que le script de traduction ait fini
    setTimeout(async function() {
    try {
        // Charger les détails de réservation depuis la session
        const response = await fetch('/api/reservation-details');

        if (!response.ok) {
            // Si pas de données de réservation ou suite non sélectionnée, ne pas rediriger automatiquement
            // L'utilisateur peut toujours voir la page avec les données par défaut
            console.warn('Aucune donnée de réservation complète trouvée dans la session');
            return;
        }

        const reservationDetails = await response.json();

        // Debug: afficher les données reçues
        console.log('Données de réservation reçues:', reservationDetails);

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

        // Fonction pour créer une carte de suite
        function createSuiteCard(suite, index) {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
            
            cardWrapper.innerHTML = `
                <!--merged image-->
                <div class="decorative-lines">
                    <img src="images/688_812.svg" alt="Decorative corner element" class="line-top-right">
                    <img src="images/688_815.svg" alt="Decorative corner element" class="line-bottom-left">
                </div>
                <div class="confirmation-card">
                    <div class="card-image-container">
                        <img src="${suite.image || 'images/4e8bd77d88ebb1c9f445970808bcf56230320041.png'}" alt="${suite.name || suite.title || 'Suite'}" class="card-image">
                    </div>
                    <div class="card-details">
                        <div class="details-header">
                            <h2 class="suite-title">${suite.title || suite.name || 'SUITE'}</h2>
                            <span class="suite-quantity">1 × ${suite.quantity || 1}</span>
                        </div>
                        <div class="booking-dates">
                            <span class="date">${reservationDetails.arrival_formatted || ''}</span>
                            <img src="images/688_802.svg" alt="to" class="date-arrow">
                            <span class="date">${reservationDetails.departure_formatted || ''}</span>
                        </div>
                        <p class="guest-count"><span data-translate="reservationGuests">Invités</span> : ${reservationDetails.guests || 1}</p>
                        <p class="total-price"><span data-translate="reservationTotal">TOTAL</span> : ${number_format(suite.total_price || 0, 0, ',', ' ')} Franc CFA</p>
                    </div>
                </div>
            `;
            
            return cardWrapper;
        }

        // Fonction pour créer la carte de total global
        function createTotalCard(grandTotal) {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper total-card-wrapper';
            
            cardWrapper.innerHTML = `
                <!--merged image-->
                <div class="decorative-lines">
                    <img src="images/688_812.svg" alt="Decorative corner element" class="line-top-right">
                    <img src="images/688_815.svg" alt="Decorative corner element" class="line-bottom-left">
                </div>
                <div class="confirmation-card total-card">
                    <div class="card-details">
                        <div class="details-header">
                            <h2 class="suite-title" style="font-size: 2rem; margin-bottom: 1rem;">TOTAL GLOBAL</h2>
                        </div>
                        <div class="booking-dates">
                            <span class="date">${reservationDetails.arrival_formatted || ''}</span>
                            <img src="images/688_802.svg" alt="to" class="date-arrow">
                            <span class="date">${reservationDetails.departure_formatted || ''}</span>
                        </div>
                        <p class="guest-count"><span data-translate="reservationGuests">Invités</span> : ${reservationDetails.guests || 1}</p>
                        <p class="total-price" style="font-size: 1.5rem; font-weight: bold; color: #ffffff; margin-top: 1rem;">
                            <span data-translate="reservationTotal">TOTAL</span> : ${number_format(grandTotal || 0, 0, ',', ' ')} Franc CFA
                        </p>
                        <a href="reservation4.html" class="next-button" data-translate="reservationNext" style="margin-top: 1.5rem;">Suivant</a>
                    </div>
                </div>
            `;
            
            return cardWrapper;
        }

        // Récupérer le conteneur principal
        const container = document.querySelector('.confirmation-section .container');
        const cardWrapper = document.querySelector('.card-wrapper');

        // Vérifier si plusieurs suites sont sélectionnées
        const suites = reservationDetails.suites || [];
        const grandTotal = reservationDetails.grand_total || reservationDetails.total_price || 0;

        if (suites.length > 0) {
            // Supprimer la carte existante si elle existe
            if (cardWrapper) {
                cardWrapper.remove();
            }

            // Créer une carte pour chaque suite
            suites.forEach((suite, index) => {
                const suiteCard = createSuiteCard(suite, index);
                container.appendChild(suiteCard);
            });

            // Ajouter la carte de total global en bas si plusieurs suites
            if (suites.length > 1) {
                const totalCard = createTotalCard(grandTotal);
                container.appendChild(totalCard);
            } else {
                // Si une seule suite, ajouter le bouton "Suivant" sur cette carte
                const lastCard = container.querySelector('.card-wrapper:last-child');
                if (lastCard) {
                    const cardDetails = lastCard.querySelector('.card-details');
                    if (cardDetails && !cardDetails.querySelector('.next-button')) {
                        const nextButton = document.createElement('a');
                        nextButton.href = 'reservation4.html';
                        nextButton.className = 'next-button';
                        nextButton.setAttribute('data-translate', 'reservationNext');
                        nextButton.textContent = 'Suivant';
                        cardDetails.appendChild(nextButton);
                    }
                }
            }
        } else if (reservationDetails.suite) {
            // Rétrocompatibilité : une seule suite
            const suiteCard = createSuiteCard(reservationDetails.suite, 0);
            if (cardWrapper) {
                cardWrapper.replaceWith(suiteCard);
            } else {
                container.appendChild(suiteCard);
            }
            
            // Ajouter le bouton "Suivant" sur cette carte
            const cardDetails = suiteCard.querySelector('.card-details');
            if (cardDetails && !cardDetails.querySelector('.next-button')) {
                const nextButton = document.createElement('a');
                nextButton.href = 'reservation4.html';
                nextButton.className = 'next-button';
                nextButton.setAttribute('data-translate', 'reservationNext');
                nextButton.textContent = 'Suivant';
                cardDetails.appendChild(nextButton);
            }
        }

    } catch (error) {
        console.error('Erreur lors du chargement des détails de réservation:', error);
        // En cas d'erreur, garder le contenu statique original
    }
    }, 200); // Délai pour s'assurer que le script de traduction a fini
}

// Exécuter après le chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReservationStep3);
} else {
    initReservationStep3();
}


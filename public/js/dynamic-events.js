/**
 * Script pour charger dynamiquement les événements depuis l'API Laravel
 * À ajouter dans page_evenementiel.html
 */
document.addEventListener('DOMContentLoaded', async function() {
    const eventsContainer = document.querySelector('#dynamic-events-container');
    if (!eventsContainer) return;

    try {
        const response = await fetch('/api/events', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        const events = await response.json();

        if (events.length === 0) {
            eventsContainer.innerHTML = '<p class="text-center text-gray-600 font-[Futura_Md_BT] text-[20px] md:text-[24px]">Aucun événement disponible pour le moment.</p>';
            return;
        }

        // Vider le conteneur
        eventsContainer.innerHTML = '';

        // Créer les cartes d'événements dynamiquement avec la même structure HTML que l'original
        events.forEach((event, index) => {
            const eventCard = document.createElement('article');
            // Alterner les border-radius comme dans l'original
            const borderRadius = index % 2 === 0 ? 'rounded-[40px_0]' : 'rounded-[0_40px]';
            const imageRadius = index % 2 === 0 ? 'rounded-[30px_0]' : 'rounded-[0_30px]';

            eventCard.className = `p-6 border border-[#B78F62]/30 ${borderRadius} shadow-[0_8px_25px_rgba(0,0,0,0.05)] bg-white flex flex-col gap-4`;

            // Déterminer le statut (À venir, EN COURS, ou PASSÉ)
            // Utiliser le statut fourni par l'API si disponible, sinon calculer
            let statusKey = 'eventsComingSoon'; // Clé de traduction par défaut
            let statusText = 'À venir';
            const eventDate = event.date ? new Date(event.date) : null;
            const eventEndDate = event.end_date ? new Date(event.end_date) : null;

            if (event.status) {
                statusText = event.status;
                // Déterminer la clé de traduction basée sur le statut
                if (statusText === 'EN COURS' || statusText === 'ONGOING') {
                    statusKey = 'eventsOngoing';
                } else if (statusText === 'PASSÉ' || statusText === 'PAST') {
                    statusKey = 'eventsPast';
                } else {
                    statusKey = 'eventsComingSoon';
                }
            } else if (event.is_ongoing !== undefined && event.is_ongoing) {
                statusText = 'EN COURS';
                statusKey = 'eventsOngoing';
            } else if (event.is_past !== undefined && event.is_past) {
                statusText = 'PASSÉ';
                statusKey = 'eventsPast';
            } else {
                // Fallback : calculer côté client si l'API ne fournit pas le statut
                if (eventDate) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    eventDate.setHours(0, 0, 0, 0);

                    if (eventEndDate) {
                        eventEndDate.setHours(0, 0, 0, 0);
                        if (eventEndDate < today) {
                            statusText = 'PASSÉ';
                            statusKey = 'eventsPast';
                        } else if (eventDate <= today && today <= eventEndDate) {
                            statusText = 'EN COURS';
                            statusKey = 'eventsOngoing';
                        } else {
                            statusText = 'À venir';
                            statusKey = 'eventsComingSoon';
                        }
                    } else {
                        if (eventDate < today) {
                            statusText = 'PASSÉ';
                            statusKey = 'eventsPast';
                        } else if (eventDate.getTime() === today.getTime()) {
                            statusText = 'EN COURS';
                            statusKey = 'eventsOngoing';
                        } else {
                            statusText = 'À venir';
                            statusKey = 'eventsComingSoon';
                        }
                    }
                }
            }

            // Déterminer object-fit selon l'image (certaines utilisent object-contain)
            const imageFit = event.image && (event.image.includes('imagesEvent3') || event.image.includes('imagesEvent2') || event.image.includes('EventNoel'))
                ? 'object-contain'
                : 'object-cover';
            const imagePosition = event.image && (event.image.includes('imagesEvent3') || event.image.includes('EventNoel')) ? 'object-center' : '';

            // Utiliser date_text si disponible, sinon formater la date
            const dateDisplay = event.date_text || (eventDate ? `Édition du ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}` : '');

            // Fonction pour nettoyer le HTML et extraire le texte
            function stripHtml(html) {
                if (!html) return '';
                // Si c'est déjà du texte simple, le retourner tel quel
                if (typeof html !== 'string') return '';
                // Créer un élément temporaire pour extraire le texte
                const tmp = document.createElement('DIV');
                tmp.innerHTML = html;
                return tmp.textContent || tmp.innerText || '';
            }

            // Déterminer le texte à afficher : priorité au résumé (summary/excerpt)
            let displayText = '';

            // Debug (à supprimer en production)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('Event data:', {
                    id: event.id,
                    title: event.title,
                    summary: event.summary,
                    description: event.description ? event.description.substring(0, 50) + '...' : 'empty'
                });
            }

            if (event.summary && event.summary.trim() !== '') {
                // Utiliser le résumé (excerpt) en priorité
                displayText = stripHtml(event.summary).trim();
            } else if (event.description && event.description.trim() !== '') {
                // Si pas de résumé, utiliser la description (nettoyée du HTML)
                displayText = stripHtml(event.description).trim();
                // Limiter la longueur de la description pour l'affichage
                if (displayText.length > 200) {
                    displayText = displayText.substring(0, 200) + '...';
                }
            }

            // Si toujours vide, afficher un message par défaut
            if (!displayText || displayText.trim() === '') {
                displayText = 'Aucune description disponible.';
            }

            // Déterminer la clé de traduction basée sur le slug ou le titre de l'événement
            // Mapping des slugs/titres vers les clés de traduction
            const eventSlug = (event.slug || '').toLowerCase();
            const eventTitle = (event.title || '').toLowerCase();

            let translateKeys = null;

            // Détecter par slug
            if (eventSlug.includes('boutique') || eventSlug.includes('ephemere')) {
                translateKeys = {
                    title: 'eventsSunsetTitle',
                    schedule: 'eventsSunsetSchedule',
                    description: 'eventsSunsetDescription',
                    time: 'eventsSunsetTime'
                };
            } else if (eventSlug.includes('pilates') || eventSlug.includes('sunset') || eventSlug.includes('core-fitness')) {
                translateKeys = {
                    title: 'eventsBrunchTitle',
                    schedule: 'eventsBrunchSchedule',
                    description: 'eventsBrunchDescription',
                    time: 'eventsBrunchTime'
                };
            } else if (eventSlug.includes('noel') || eventSlug.includes('christmas') || eventSlug.includes('dinner') || eventSlug.includes('dejeuner')) {
                translateKeys = {
                    title: 'eventsCorporateTitle',
                    schedule: 'eventsCorporateSchedule',
                    description: 'eventsCorporateDescription',
                    time: 'eventsCorporateCapacity'
                };
            } else if (eventSlug.includes('saint-sylvestre') || eventSlug.includes('nouvel-an') || eventSlug.includes('new-year') || eventSlug.includes('brunch')) {
                translateKeys = {
                    title: 'eventsWeddingTitle',
                    schedule: 'eventsWeddingSchedule',
                    description: 'eventsWeddingDescription',
                    time: 'eventsWeddingCapacity'
                };
            }

            // Si pas trouvé par slug, essayer par titre
            if (!translateKeys) {
                if (eventTitle.includes('boutique') || eventTitle.includes('éphémère') || eventTitle.includes('ephemere')) {
                    translateKeys = {
                        title: 'eventsSunsetTitle',
                        schedule: 'eventsSunsetSchedule',
                        description: 'eventsSunsetDescription',
                        time: 'eventsSunsetTime'
                    };
                } else if (eventTitle.includes('pilates') || eventTitle.includes('sunset') || eventTitle.includes('core fitness')) {
                    translateKeys = {
                        title: 'eventsBrunchTitle',
                        schedule: 'eventsBrunchSchedule',
                        description: 'eventsBrunchDescription',
                        time: 'eventsBrunchTime'
                    };
                } else if (eventTitle.includes('noël') || eventTitle.includes('noel') || eventTitle.includes('christmas') || eventTitle.includes('dîner') || eventTitle.includes('déjeuner')) {
                    translateKeys = {
                        title: 'eventsCorporateTitle',
                        schedule: 'eventsCorporateSchedule',
                        description: 'eventsCorporateDescription',
                        time: 'eventsCorporateCapacity'
                    };
                } else if (eventTitle.includes('saint-sylvestre') || eventTitle.includes('nouvel an') || eventTitle.includes('new year') || eventTitle.includes('réveillon')) {
                    translateKeys = {
                        title: 'eventsWeddingTitle',
                        schedule: 'eventsWeddingSchedule',
                        description: 'eventsWeddingDescription',
                        time: 'eventsWeddingCapacity'
                    };
                }
            }

            // Si on a une clé de traduction, l'utiliser, sinon utiliser le texte de la BDD
            const titleHTML = translateKeys ?
                `<span class="font-normal" data-translate="${translateKeys.title}">${event.title}</span>` :
                `<span class="font-normal">${event.title}</span>`;

            // Utiliser la clé de traduction du statut si disponible, sinon utiliser celle de l'événement
            const scheduleTranslateKey = translateKeys ? translateKeys.schedule : statusKey;
            const scheduleHTML = `<span class="text-sm font-[Futura_Md_BT] font-normal text-black" data-translate="${scheduleTranslateKey}">${statusText}</span>`;

            const descriptionHTML = translateKeys ?
                `<p class="font-[Futura_Md_BT] font-normal text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] text-black" data-translate="${translateKeys.description}">${displayText || 'Aucune description disponible.'}</p>` :
                `<p class="font-[Futura_Md_BT] font-normal text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] text-black">${displayText || 'Aucune description disponible.'}</p>`;

            const timeHTML = translateKeys ?
                `<span data-translate="${translateKeys.time}">${dateDisplay}</span>` :
                `<span>${dateDisplay}</span>`;

            eventCard.innerHTML = `
                <div class="relative w-full h-[320px] ${imageRadius} overflow-hidden">
                    <img src="${event.image}" alt="${event.title.replace(/<br\s*\/?>/gi, ' ')}" class="w-full h-full ${imageFit} ${imagePosition}" loading="lazy" decoding="async">
                </div>
                <div class="flex items-center justify-between text-black font-[Futura_Md_BT] font-normal text-lg uppercase tracking-[0.2em]">
                    ${titleHTML}
                    ${scheduleHTML}
                </div>
                ${descriptionHTML}
                <div class="flex items-center justify-end text-sm font-[Futura_Md_BT] font-normal text-black">
                    ${timeHTML}
                </div>
            `;

            eventsContainer.appendChild(eventCard);
        });

        // Réappliquer les traductions après le chargement des événements
        setTimeout(() => {
            const currentLang = localStorage.getItem('escapade-lang') || 'fr';

            // Réappliquer les traductions plusieurs fois pour s'assurer que tout est traduit
            if (window.applyTranslations) {
                // D'abord enregistrer les valeurs françaises
                window.applyTranslations('fr');
                // Puis appliquer la langue actuelle
                setTimeout(() => {
                    window.applyTranslations(currentLang);
                }, 50);
            }

            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
        }, 100);

    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        // Afficher un message d'erreur plus détaillé
        let errorMessage = '<p class="text-center text-red-600 font-[Futura_Md_BT] text-[20px] md:text-[24px]">Erreur lors du chargement des événements.</p>';

        // Afficher plus de détails en mode développement ou si l'API ne répond pas
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || error.message.includes('HTTP')) {
            errorMessage += '<p class="text-center text-gray-600 font-[Futura_Md_BT] text-[16px] mt-2">' + error.message + '</p>';
            errorMessage += '<p class="text-center text-gray-600 font-[Futura_Md_BT] text-[14px] mt-2">Vérifiez la console du navigateur (F12) pour plus de détails.</p>';
        }

        errorMessage += '<p class="text-center text-gray-600 font-[Futura_Md_BT] text-[16px] mt-4">Veuillez rafraîchir la page ou contacter l\'administrateur.</p>';

        eventsContainer.innerHTML = errorMessage;

        // Log détaillé dans la console
        console.error('Détails de l\'erreur:', {
            message: error.message,
            stack: error.stack,
            url: '/api/events',
            hostname: window.location.hostname
        });
    }
});


/**
 * Script pour charger dynamiquement les événements depuis l'API Laravel
 * À ajouter dans page_evenementiel.html
 */
document.addEventListener('DOMContentLoaded', async function() {
    const eventsContainer = document.querySelector('#dynamic-events-container');
    if (!eventsContainer) return;

    try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Erreur lors du chargement des événements');

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

            // Déterminer le statut (À venir ou A venir)
            const eventDate = event.date ? new Date(event.date) : null;
            const isUpcoming = eventDate && eventDate >= new Date();
            const statusText = isUpcoming ? 'À venir' : 'À venir';

            // Déterminer object-fit selon l'image (certaines utilisent object-contain)
            const imageFit = event.image && (event.image.includes('imagesEvent3') || event.image.includes('imagesEvent2') || event.image.includes('EventNoel'))
                ? 'object-contain'
                : 'object-cover';
            const imagePosition = event.image && (event.image.includes('imagesEvent3') || event.image.includes('EventNoel')) ? 'object-center' : '';

            // Utiliser date_text si disponible, sinon formater la date
            const dateDisplay = event.date_text || (eventDate ? `Édition du ${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}` : '');

            eventCard.innerHTML = `
                <div class="relative w-full h-[320px] ${imageRadius} overflow-hidden">
                    <img src="${event.image}" alt="${event.title.replace(/<br\s*\/?>/gi, ' ')}" class="w-full h-full ${imageFit} ${imagePosition}" loading="lazy" decoding="async">
                </div>
                <div class="flex items-center justify-between text-black font-[Futura_Md_BT] font-normal text-lg uppercase tracking-[0.2em]">
                    <span class="font-normal">${event.title}</span>
                    <span class="text-sm font-[Futura_Md_BT] font-normal text-black">${statusText}</span>
                </div>
                <p class="font-[Futura_Md_BT] font-normal text-[20px] md:text-[24px] leading-[30px] md:leading-[34px] text-black">${event.description || event.summary || ''}</p>
                <div class="flex items-center justify-end text-sm font-[Futura_Md_BT] font-normal text-black">
                    <span>${dateDisplay}</span>
                </div>
            `;

            eventsContainer.appendChild(eventCard);
        });

    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        eventsContainer.innerHTML = '<p class="text-center text-red-600 font-[Futura_Md_BT] text-[20px] md:text-[24px]">Erreur lors du chargement des événements.</p>';
    }
});


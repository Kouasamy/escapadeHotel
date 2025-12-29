/**
 * Script pour récupérer et injecter le token CSRF dans les formulaires HTML
 * À ajouter dans toutes les pages avec formulaires
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/csrf-token');
        const data = await response.json();
        const token = data.token;
        
        // Injecter le token dans tous les champs cachés CSRF
        document.querySelectorAll('input[name="_token"]').forEach(input => {
            input.value = token;
        });
        
        // Créer un meta tag pour les autres scripts
        let metaTag = document.querySelector('meta[name="csrf-token"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = 'csrf-token';
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', token);
        
    } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
    }
});


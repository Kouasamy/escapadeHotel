document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('reservation-contact-form');
    const csrfTokenInput = document.getElementById('csrf-token-reservation4');

    if (!form) return;

    // Récupérer le token CSRF
    if (csrfTokenInput) {
        try {
            const response = await fetch('/api/csrf-token');
            const data = await response.json();
            csrfTokenInput.value = data.token;
        } catch (error) {
            console.error('Erreur lors de la récupération du token CSRF:', error);
        }
    }

    // Gérer la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Désactiver le bouton pendant la soumission
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        try {
            const formData = new FormData(form);
            
            const response = await fetch('/reservations/step4', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (response.ok) {
                    // Rediriger vers la page de confirmation
                    window.location.href = '/reservation5.html';
                } else {
                    // Afficher les erreurs de validation
                    if (data.errors) {
                        let errorMessage = 'Erreurs de validation:\n';
                        Object.keys(data.errors).forEach(field => {
                            errorMessage += `- ${data.errors[field][0]}\n`;
                        });
                        alert(errorMessage);
                    } else {
                        alert(data.message || data.error || 'Une erreur est survenue. Veuillez réessayer.');
                    }
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            } else {
                // Si la réponse n'est pas JSON (redirection HTML), suivre la redirection
                if (response.ok || response.redirected) {
                    window.location.href = '/reservation5.html';
                } else {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            }
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});


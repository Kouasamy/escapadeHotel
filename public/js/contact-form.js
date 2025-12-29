/**
 * Script pour gérer la soumission du formulaire de contact dans le footer
 */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Trouver tous les formulaires de contact dans le footer
        const contactForms = document.querySelectorAll('.footer-contact-form form');

        contactForms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Récupérer les champs du formulaire
                const nameInput = form.querySelector('input[type="text"]:nth-of-type(1)');
                const firstNameInput = form.querySelector('input[type="text"]:nth-of-type(2)');
                const emailInput = form.querySelector('input[type="email"]');
                const phoneInput = form.querySelector('input[type="tel"]');
                const messageTextarea = form.querySelector('textarea');
                const submitButton = form.querySelector('button[type="submit"]');

                // Vérifier que tous les champs requis existent
                if (!nameInput || !firstNameInput || !emailInput || !messageTextarea) {
                    console.error('Formulaire de contact incomplet');
                    return;
                }

                // Récupérer les valeurs
                const formData = {
                    name: nameInput.value.trim(),
                    first_name: firstNameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput ? phoneInput.value.trim() : '',
                    message: messageTextarea.value.trim()
                };

                // Validation côté client
                if (!formData.name || !formData.first_name || !formData.email || !formData.message) {
                    showMessage(form, 'Veuillez remplir tous les champs obligatoires.', 'error');
                    return;
                }

                if (!isValidEmail(formData.email)) {
                    showMessage(form, 'Veuillez entrer une adresse email valide.', 'error');
                    return;
                }

                // Désactiver le bouton pendant l'envoi
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Envoi en cours...';

                // Récupérer le token CSRF
                fetch('/api/csrf-token')
                    .then(response => response.json())
                    .then(data => {
                        // Préparer les données pour l'envoi
                        const postData = new FormData();
                        postData.append('name', formData.name);
                        postData.append('first_name', formData.first_name);
                        postData.append('email', formData.email);
                        postData.append('phone', formData.phone);
                        postData.append('message', formData.message);
                        postData.append('_token', data.token);

                        // Envoyer la requête
                        return fetch('/contact', {
                            method: 'POST',
                            body: postData,
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest',
                                'Accept': 'application/json'
                            }
                        });
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showMessage(form, data.message || 'Votre message a été envoyé avec succès !', 'success');
                            // Réinitialiser le formulaire
                            form.reset();
                        } else {
                            showMessage(form, data.message || 'Une erreur est survenue. Veuillez réessayer.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Erreur:', error);
                        showMessage(form, 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
                    })
                    .finally(() => {
                        // Réactiver le bouton
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    });
            });
        });
    });

    /**
     * Valider une adresse email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Afficher un message de succès ou d'erreur
     */
    function showMessage(form, message, type) {
        // Supprimer les messages existants
        const existingMessage = form.querySelector('.contact-form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Créer le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'contact-form-message ' + (type === 'success' ? 'success' : 'error');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            margin-top: 15px;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;

        // Insérer le message après le bouton submit
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.parentNode.insertBefore(messageDiv, submitButton.nextSibling);

        // Faire défiler jusqu'au message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Supprimer le message après 5 secondes pour les succès
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
})();


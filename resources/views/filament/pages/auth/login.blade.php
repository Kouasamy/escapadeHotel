<x-filament-panels::page.simple>
    @push('styles')
    <!-- Chargement des polices du site -->
    <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/futura-md-bt">
    <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/big-caslon-medium">

    <style>
        /* Styles pour la page de login personnalisée */
        html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: auto;
            min-height: 100%;
            height: auto;
            font-family: 'Futura Md BT', 'Futura', sans-serif;
        }
        
        /* S'assurer que le viewport est correctement configuré */
        @supports (-webkit-touch-callout: none) {
            html, body {
                height: -webkit-fill-available;
            }
        }

        /* Vidéo et overlay en arrière-plan */
        .login-page-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            width: 100%;
            height: 100vh;
            height: 100%;
            min-height: 100vh;
            overflow: hidden;
            z-index: 0;
        }
        
        @supports (-webkit-touch-callout: none) {
            .login-page-wrapper {
                height: -webkit-fill-available;
            }
        }

        .login-background-video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            object-fit: cover;
            z-index: 1;
        }

        .login-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2;
        }

        /* Conteneur principal Filament */
        .fi-main {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            min-height: -webkit-fill-available;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: transparent !important;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .fi-simple-page {
            background: transparent !important;
            max-width: 450px;
            width: 100%;
            margin: 0 auto;
        }

        /* Container du formulaire avec glassmorphism */
        .login-form-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            padding: 3rem;
            width: 100%;
            max-width: 100%;
            position: relative;
            box-sizing: border-box;
            margin: 0 auto;
        }

        /* Forcer TOUS les labels dans le conteneur à être blancs */
        .login-form-container label,
        .login-form-container .fi-label,
        .login-form-container [class*="label"],
        .login-form-container label *,
        .login-form-container .fi-label * {
            color: white !important;
        }

        .login-logo {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .login-logo img {
            width: 220px;
            height: auto;
            transition: transform 0.3s ease;
        }

        .login-logo a:hover img {
            transform: scale(1.05);
        }

        .login-title {
            text-align: center;
            color: white;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 2rem;
            font-family: 'Big Caslon', serif;
        }

        /* Styles pour les champs Filament */
        .fi-input-wrp {
            margin-bottom: 1.5rem;
        }

        .fi-input {
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 12px !important;
            color: #000000 !important;
            padding: 0.75rem 1rem !important;
            width: 100% !important;
            transition: all 0.3s ease;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
        }

        .fi-input:focus {
            background: rgba(255, 255, 255, 1) !important;
            border-color: rgba(183, 143, 98, 0.8) !important;
            outline: none;
            box-shadow: 0 0 0 3px rgba(183, 143, 98, 0.2);
        }

        .fi-input::placeholder {
            color: rgba(0, 0, 0, 0.5) !important;
        }

        /* S'assurer que TOUS les labels sont blancs - sélecteurs très spécifiques */
        .fi-label,
        label,
        .fi-field-wrapper label,
        .fi-input-wrapper label,
        .fi-form-component label,
        [class*="fi-field"] label,
        [class*="fi-input"] label,
        .fi-checkbox-wrapper label,
        label[for*="email"],
        label[for*="password"],
        label[for*="remember"],
        .login-form-container label,
        .login-form-container .fi-label,
        .login-form-container .fi-field-wrapper label {
            color: white !important;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
        }

        /* Label de la checkbox "Se souvenir de moi" - sélecteurs spécifiques */
        .fi-checkbox-label,
        .fi-checkbox-wrapper label,
        label[for*="remember"],
        .fi-field-wrapper .fi-checkbox-label,
        [class*="checkbox"] label {
            color: white !important;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
        }

        /* Cibler spécifiquement les spans et textes dans les labels */
        .fi-label span,
        label span,
        .fi-label *,
        label * {
            color: white !important;
        }

        /* Styles pour les boutons Filament */
        .fi-btn-primary,
        .fi-btn,
        button[type="submit"],
        .fi-action,
        [wire\:click*="authenticate"],
        .fi-btn-primary button,
        .fi-actions button {
            background: #B78F62 !important;
            color: white !important;
            border-radius: 12px !important;
            padding: 0.75rem 2rem !important;
            font-weight: 600 !important;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 1rem;
            border: none !important;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
            cursor: pointer;
        }

        .fi-btn-primary:hover,
        .fi-btn:hover,
        button[type="submit"]:hover,
        .fi-action:hover,
        [wire\:click*="authenticate"]:hover {
            background: #BB996B !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(183, 143, 98, 0.4);
        }

        /* S'assurer que les actions du formulaire sont visibles */
        .fi-form-actions,
        .fi-actions,
        [class*="fi-form-actions"],
        [class*="fi-actions"] {
            display: block !important;
            margin-top: 1.5rem;
        }

        .fi-checkbox {
            accent-color: #B78F62;
        }

        .fi-checkbox-label {
            color: white !important;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
        }

        /* Forcer tous les textes dans les labels à être blancs */
        .login-form-container * label,
        .login-form-container label *,
        .fi-simple-page label,
        .fi-simple-page label * {
            color: white !important;
        }

        /* S'assurer que le texte saisi dans les inputs est noir */
        input[type="email"],
        input[type="password"],
        input[type="text"] {
            color: #000000 !important;
            font-family: 'Futura Md BT', 'Futura', sans-serif !important;
        }

        input[type="email"]::placeholder,
        input[type="password"]::placeholder,
        input[type="text"]::placeholder {
            color: rgba(0, 0, 0, 0.5) !important;
        }

        /* Messages d'erreur */
        .fi-notification {
            background: rgba(239, 68, 68, 0.2) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(239, 68, 68, 0.5) !important;
            color: white !important;
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
        }

        /* Masquer les éléments par défaut de Filament */
        .fi-header {
            display: none !important;
        }

        .fi-sidebar {
            display: none !important;
        }

        /* Responsive - Tablettes */
        @media (max-width: 1024px) {
            .fi-main {
                padding: 1.5rem 1rem;
            }
            
            .login-form-container {
                padding: 2.5rem 2rem;
            }
        }

        /* Responsive - Mobiles */
        @media (max-width: 768px) {
            html, body {
                overflow-y: auto;
            }
            
            .fi-main {
                padding: 1rem 0.75rem;
                align-items: flex-start;
                padding-top: 2rem;
                padding-bottom: 2rem;
            }

            .fi-simple-page {
                max-width: 100%;
                padding: 0;
            }

            .login-form-container {
                padding: 2rem 1.5rem;
                border-radius: 20px;
                margin: 0;
            }

            .login-logo img {
                width: 180px;
                max-width: 80%;
            }

            .login-title {
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .fi-input {
                padding: 0.65rem 0.9rem !important;
                font-size: 16px !important; /* Évite le zoom automatique sur iOS */
            }
            
            .fi-btn-primary,
            button[type="submit"] {
                padding: 0.75rem 1.5rem !important;
                font-size: 1rem !important;
            }
        }

        /* Responsive - Très petits écrans */
        @media (max-width: 480px) {
            .fi-main {
                padding: 0.75rem 0.5rem;
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;
            }

            .login-form-container {
                padding: 1.5rem 1rem;
                border-radius: 16px;
            }

            .login-logo img {
                width: 150px;
            }

            .login-title {
                font-size: 1.25rem;
                margin-bottom: 1.25rem;
            }
            
            .fi-input {
                padding: 0.6rem 0.8rem !important;
            }
        }

        /* Orientation paysage sur mobile */
        @media (max-width: 768px) and (orientation: landscape) {
            .fi-main {
                align-items: flex-start;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }
            
            .login-form-container {
                padding: 1.5rem 1.25rem;
                max-width: 90%;
            }
            
            .login-logo img {
                width: 140px;
            }
            
            .login-title {
                font-size: 1.25rem;
                margin-bottom: 1rem;
            }
        }

        /* Hauteur minimale pour éviter les problèmes de scroll */
        @media (max-height: 600px) {
            .fi-main {
                align-items: flex-start;
                padding-top: 1rem;
            }
            
            .login-form-container {
                padding: 1.5rem 1.25rem;
            }
            
            .login-logo {
                margin-bottom: 1rem;
            }
            
            .login-logo img {
                width: 140px;
            }
            
            .login-title {
                font-size: 1.25rem;
                margin-bottom: 1rem;
            }
        }

        /* Responsive - Très grands écrans */
        @media (min-width: 1400px) {
            .fi-simple-page {
                max-width: 500px;
            }
            
            .login-form-container {
                padding: 3.5rem;
            }
        }

        /* S'assurer que le formulaire est toujours visible */
        .login-form-container {
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
        }

        /* Améliorer la lisibilité sur petits écrans */
        @media (max-width: 768px) {
            .login-overlay {
                background: rgba(0, 0, 0, 0.6);
            }
        }
    </style>
    @endpush

    <div class="login-page-wrapper">
        <!-- Vidéo en arrière-plan -->
        <video autoplay muted loop playsinline preload="auto" class="login-background-video">
            <source src="{{ asset('video/ACCUEIL.mp4') }}" type="video/mp4">
            Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        <!-- Overlay sombre -->
        <div class="login-overlay"></div>
    </div>

    <div class="login-form-container">
        <!-- Logo L'Escapade -->
        <div class="login-logo">
            <a href="{{ url('/') }}" title="Retour à l'accueil">
                <img src="{{ asset('images/568_819.svg') }}" alt="ESCAPADE Logo">
            </a>
        </div>

        <!-- Titre -->
        <h1 class="login-title">Connexion</h1>

        <!-- Formulaire Filament -->
        <form wire:submit="authenticate" class="space-y-6">
            {{ $this->form }}

            <!-- Actions du formulaire (bouton de soumission) -->
            <div class="fi-form-actions">
                <x-filament::button type="submit" class="fi-btn-primary">
                    Se connecter
                </x-filament::button>
            </div>
        </form>
    </div>
</x-filament-panels::page.simple>

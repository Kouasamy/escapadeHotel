<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - L'Escapade Hotel</title>
    <link rel="stylesheet" href="{{ asset('css/auth/login.css') }}">
</head>
<body>
    <div class="login-container">
        <video autoplay muted loop playsinline preload="auto" class="login-background-video">
            <source src="{{ asset('escapade-front-end/video/PISCINE.mp4') }}" type="video/mp4">
            Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div class="login-overlay"></div>
        <div class="login-form-wrapper">
            <form class="login-form glassmorphism" method="POST" action="{{ route('admin.login') }}">
                @csrf
                <div class="login-logo">
                    <img src="{{ asset('escapade-front-end/images/568_819.svg') }}" alt="L'Escapade">
                </div>
                <h1 class="login-title">Connexion</h1>
                
                @if ($errors->any())
                    <div class="alert alert-error">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value="{{ old('email') }}" 
                        required 
                        autofocus
                        placeholder="admin@escapade.ci"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required
                        placeholder="••••••••"
                    >
                </div>

                <div class="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="remember">
                        <span>Se souvenir de moi</span>
                    </label>
                </div>

                <button type="submit" class="login-button">
                    Se connecter
                </button>
            </form>
        </div>
    </div>
</body>
</html>


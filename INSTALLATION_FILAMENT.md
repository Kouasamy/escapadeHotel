# Instructions d'installation Filament PHP 3.x

## Étapes d'installation

1. **Installer Filament :**
```bash
composer require filament/filament:"^3.0"
```

2. **Installer le panel Filament :**
```bash
php artisan filament:install --panels
```

3. **Installer les autres dépendances :**
```bash
# Spatie Laravel PDF (compatible Laravel 12) - Alternative à barryvdh/laravel-dompdf
composer require spatie/laravel-pdf

# Intervention Image (déjà installé ✅)
# intervention/image version 3.0 est déjà dans composer.json
```

4. **Exécuter les migrations et seeders :**
```bash
php artisan migrate:fresh --seed
```

## Configuration

Le `AdminPanelProvider` est déjà configuré dans `app/Providers/Filament/AdminPanelProvider.php` avec :
- Couleurs personnalisées (#B78F62 et #BB996B)
- Logo et favicon L'Escapade
- Mode clair par défaut
- Chemin d'accès : `/admin`

## Accès

- URL de connexion : `/admin/login` (page personnalisée avec vidéo)
- URL du panel : `/admin` (après connexion)
- Identifiants par défaut :
  - Email : `admin@escapade.ci`
  - Mot de passe : `password` (À CHANGER EN PRODUCTION)


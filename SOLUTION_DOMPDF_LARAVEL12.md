# Solution pour DomPDF avec Laravel 12

## Problème

Le package `barryvdh/laravel-dompdf` version 3.0.0 ne supporte que Laravel 9, 10 ou 11, mais pas Laravel 12.

## Solutions possibles

### Option 1 : Utiliser Spatie Laravel PDF (Recommandé) ✅

Spatie propose un package plus récent et mieux maintenu :

```bash
composer require spatie/laravel-pdf
```

**Avantages :**
- Support Laravel 12
- Meilleure maintenance
- API moderne
- Documentation complète

**Documentation :** https://spatie.be/docs/laravel-pdf

### Option 2 : Utiliser DomPDF directement (Sans wrapper Laravel)

```bash
composer require dompdf/dompdf
```

Puis créer votre propre service wrapper si nécessaire.

### Option 3 : Attendre la mise à jour de barryvdh/laravel-dompdf

Le package pourrait être mis à jour pour supporter Laravel 12 dans le futur. Vous pouvez :
- Surveiller le repository : https://github.com/barryvdh/laravel-dompdf
- Utiliser une version dev si disponible : `composer require barryvdh/laravel-dompdf:dev-master`

### Option 4 : Utiliser une version dev (Non recommandé)

```bash
composer require barryvdh/laravel-dompdf:dev-master --with-all-dependencies
```

⚠️ **Attention :** Cette version peut être instable.

## Recommandation

**Utilisez Spatie Laravel PDF** car :
1. Il supporte Laravel 12
2. Il est activement maintenu
3. Il a une excellente documentation
4. Il est développé par Spatie (équipe réputée dans l'écosystème Laravel)

## Installation Spatie Laravel PDF

```bash
composer require spatie/laravel-pdf
```

Puis publier la configuration :
```bash
php artisan vendor:publish --tag="pdf-config"
```

## Utilisation

```php
use Spatie\LaravelPdf\Facades\Pdf;

Pdf::view('reservation-pdf', ['reservation' => $reservation])
    ->save('reservation.pdf');
```


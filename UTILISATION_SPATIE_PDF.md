# Utilisation de Spatie Laravel PDF

## Installation ✅

Le package `spatie/laravel-pdf` a été installé avec succès et est compatible avec Laravel 12.

## Configuration

Publier la configuration (optionnel) :
```bash
php artisan vendor:publish --tag="pdf-config"
```

## Utilisation de base

### Générer un PDF depuis une vue Blade

```php
use Spatie\LaravelPdf\Facades\Pdf;

// Générer un PDF et le télécharger
return Pdf::view('reservations.pdf', ['reservation' => $reservation])
    ->download('reservation.pdf');

// Générer un PDF et l'afficher dans le navigateur
return Pdf::view('reservations.pdf', ['reservation' => $reservation])
    ->stream('reservation.pdf');

// Sauvegarder un PDF sur le disque
Pdf::view('reservations.pdf', ['reservation' => $reservation])
    ->save(storage_path('app/reservations/reservation-' . $reservation->id . '.pdf'));
```

### Exemple de vue Blade pour PDF

Créer `resources/views/reservations/pdf.blade.php` :

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Réservation #{{ $reservation->id }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .info { margin: 20px 0; }
        .info strong { display: inline-block; width: 150px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>L'Escapade Hotel</h1>
        <h2>Confirmation de Réservation</h2>
    </div>

    <div class="info">
        <strong>Réservation #:</strong> {{ $reservation->id }}
    </div>
    <div class="info">
        <strong>Suite:</strong> {{ $reservation->suite->name }}
    </div>
    <div class="info">
        <strong>Client:</strong> {{ $reservation->first_name }} {{ $reservation->last_name }}
    </div>
    <div class="info">
        <strong>Email:</strong> {{ $reservation->email }}
    </div>
    <div class="info">
        <strong>Téléphone:</strong> {{ $reservation->phone }}
    </div>
    <div class="info">
        <strong>Arrivée:</strong> {{ $reservation->arrival_date->format('d/m/Y') }}
    </div>
    <div class="info">
        <strong>Départ:</strong> {{ $reservation->departure_date->format('d/m/Y') }}
    </div>
    <div class="info">
        <strong>Nombre de personnes:</strong> {{ $reservation->guests }}
    </div>
    <div class="info">
        <strong>Statut:</strong> {{ $reservation->status_label }}
    </div>
</body>
</html>
```

### Personnalisation avancée

```php
Pdf::view('reservations.pdf', ['reservation' => $reservation])
    ->format('A4')
    ->orientation('portrait')
    ->margin(20)
    ->download('reservation.pdf');
```

## Documentation complète

Consultez la documentation officielle : https://spatie.be/docs/laravel-pdf

## Avantages par rapport à barryvdh/laravel-dompdf

- ✅ Compatible Laravel 12
- ✅ Meilleure maintenance
- ✅ API moderne et intuitive
- ✅ Documentation complète
- ✅ Support actif de la communauté


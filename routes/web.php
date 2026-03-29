<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LanguageController;

// Routes publiques (front-end HTML statique)
Route::get('/', function () {
    // Page d'accueil = fichier public/index.html
    return redirect('/index.html');
})->name('home');

// Redirections optionnelles vers les pages HTML statiques
Route::get('/suites', function () {
    return redirect('/page_suite.html');
})->name('suites.index');

Route::get('/restaurant', function () {
    return redirect('/restaurant.html');
})->name('restaurant');

Route::get('/lounge', function () {
    return redirect('/lounge.html');
})->name('lounge');

Route::get('/events', function () {
    return redirect('/page_evenementiel.html');
})->name('events');

Route::get('/about', function () {
    return redirect('/apropos.html');
})->name('about');

// Routes de réservation (uniquement traitement backend, les pages sont en HTML statique)
Route::get('/reservations/step1', function () {
    // Servir la page HTML statique
    if (file_exists(public_path('reservation1.html'))) {
        return response()->file(public_path('reservation1.html'));
    }
    // Fallback : redirection
    return redirect('/reservation1.html');
})->name('reservations.step1');

Route::post('/reservations/step1', [ReservationController::class, 'storeStep1'])->name('reservations.storeStep1');
Route::post('/reservations/step3', [ReservationController::class, 'storeStep3'])->name('reservations.storeStep3');
Route::post('/reservations/step4', [ReservationController::class, 'storeStep4'])->name('reservations.storeStep4');

// Route de contact
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Route de changement de langue
Route::get('/lang/{locale}', [LanguageController::class, 'switch'])->name('lang.switch');


// Routes API pour charger dynamiquement les données (méthode AJAX)
Route::get('/api/suites', function () {
    // Liste des slugs des suites statiques (celles qui ont des fichiers HTML dédiés)
    $staticSuiteSlugs = ['suite-junior', 'suite-senior', 'suite-senior-vip', 'villa-familiale'];

    // Retourner TOUTES les suites actives (statiques ET dynamiques)
    $suites = \App\Models\Suite::where('is_active', true)
        ->orderBy('name')
        ->get();

    return response()->json($suites->map(function ($suite) use ($staticSuiteSlugs) {
        // Filament stocke les fichiers dans storage/app/public/suites/
        // Le chemin dans la BDD est "suites/filename.jpg"
        // Il faut utiliser Storage::url() pour générer l'URL correcte
        $imageUrl = null;
        if ($suite->main_image) {
            // Si le chemin commence par "images/" ou "img/", c'est un fichier dans public/
            if (str_starts_with($suite->main_image, 'images/') || str_starts_with($suite->main_image, 'img/')) {
                $imageUrl = asset($suite->main_image);
            }
            // Sinon, c'est un fichier uploadé via Filament dans storage/app/public/
            // Utiliser Storage::url() qui génère automatiquement /storage/suites/filename.jpg
            else {
                $imageUrl = \Illuminate\Support\Facades\Storage::url($suite->main_image);
            }
        } else {
            $imageUrl = asset('img/4.jpg');
        }

        // Déterminer l'URL HTML selon si la suite est statique ou dynamique
        $htmlUrl = null;

        // Vérifier si c'est une suite statique
        if (in_array($suite->slug, $staticSuiteSlugs)) {
            // Suite statique : utiliser les fichiers HTML existants
            $suiteType = strtolower($suite->type);
            switch ($suiteType) {
                case 'junior':
                    $htmlUrl = '/suite_junior.html';
                    break;
                case 'senior':
                    $htmlUrl = '/suite_senior.html';
                    break;
                case 'senior_vip':
                case 'senior_pool':
                    $htmlUrl = '/suite_senior_vip.html';
                    break;
                case 'villa_familiale':
                case 'villa':
                    $htmlUrl = '/suite_villa_familiale.html';
                    break;
                default:
                    $htmlUrl = '/suite_dynamique.html?id=' . $suite->id;
                    break;
            }
        } else {
            // Suite dynamique : rediriger vers la page dynamique avec l'ID
            $htmlUrl = '/suite_dynamique.html?id=' . $suite->id;
        }

        return [
            'id' => $suite->id,
            'name' => $suite->name,
            'slug' => $suite->slug,
            'type' => $suite->type,
            'image' => $imageUrl,
            'description' => $suite->description,
            'capacity_adults' => $suite->capacity_adults,
            'capacity_children' => $suite->capacity_children,
            'area' => $suite->area,
            'weekly_rate' => $suite->weekly_rate,
            'weekend_rate' => $suite->weekend_rate,
            'features' => $suite->features ?? [],
            'url' => $htmlUrl,
        ];
    }));
})->name('api.suites');

// Route API pour récupérer une suite individuelle par ID ou slug
Route::get('/api/suites/{identifier}', function ($identifier) {
    // Essayer de trouver par ID d'abord (si c'est numérique)
    $suite = null;
    if (is_numeric($identifier)) {
        $suite = \App\Models\Suite::where('id', $identifier)
            ->where('is_active', true)
            ->first();
    }

    // Si pas trouvé par ID, essayer par slug
    if (!$suite) {
        $suite = \App\Models\Suite::where('slug', $identifier)
            ->where('is_active', true)
            ->first();
    }

    if (!$suite) {
        return response()->json(['error' => 'Suite not found'], 404);
    }

    // Générer les URLs d'images
    $imageUrl = null;
    if ($suite->main_image) {
        if (str_starts_with($suite->main_image, 'images/') || str_starts_with($suite->main_image, 'img/')) {
            $imageUrl = asset($suite->main_image);
        } else {
            $imageUrl = \Illuminate\Support\Facades\Storage::url($suite->main_image);
        }
    } else {
        $imageUrl = asset('img/4.jpg');
    }

    // Générer l'URL de l'image hero (background)
    $heroImageUrl = null;
    if ($suite->hero_background_image) {
        if (str_starts_with($suite->hero_background_image, 'images/') || str_starts_with($suite->hero_background_image, 'img/')) {
            $heroImageUrl = asset($suite->hero_background_image);
        } else {
            $heroImageUrl = \Illuminate\Support\Facades\Storage::url($suite->hero_background_image);
        }
    } else {
        $heroImageUrl = $imageUrl; // Utiliser l'image principale par défaut
    }

    // Générer les URLs des images de la galerie
    $galleryImages = [];
    if ($suite->images && is_array($suite->images)) {
        foreach ($suite->images as $imagePath) {
            if (str_starts_with($imagePath, 'images/') || str_starts_with($imagePath, 'img/')) {
                $galleryImages[] = [
                    'type' => 'image',
                    'url' => asset($imagePath),
                    'alt' => $suite->name
                ];
            } else {
                $galleryImages[] = [
                    'type' => 'image',
                    'url' => \Illuminate\Support\Facades\Storage::url($imagePath),
                    'alt' => $suite->name
                ];
            }
        }
    }

    // Formater les équipements pour l'affichage
    $amenities = [];
    if ($suite->features && is_array($suite->features)) {
        foreach ($suite->features as $feature) {
            $amenities[] = ['label' => $feature];
        }
    }

    // Formater les prix
    $weekPrice = $suite->weekly_rate ? number_format($suite->weekly_rate, 0, ',', ' ') . ' FCFA' : null;
    $weekendPrice = $suite->weekend_rate ? number_format($suite->weekend_rate, 0, ',', ' ') . ' FCFA' : null;

    // Générer le titre HTML avec highlight
    $suiteNameUpper = strtoupper($suite->name);
    $words = explode(' ', $suiteNameUpper);
    $titleHtml = '';
    if (count($words) > 1) {
        $lastWord = array_pop($words);
        $firstPart = implode(' ', $words);
        $titleHtml = 'La suite <span class="highlight text-[#B78F62]">' . strtolower($lastWord) . '</span>';
    } else {
        $titleHtml = 'La suite <span class="highlight text-[#B78F62]">' . strtolower($suiteNameUpper) . '</span>';
    }

    return response()->json([
        'id' => $suite->id,
        'name' => $suite->name,
        'slug' => $suite->slug,
        'type' => $suite->type,
        'hero_title' => $suiteNameUpper,
        'hero_background_url' => $heroImageUrl,
        'title_html' => $titleHtml,
        'area' => $suite->area ? $suite->area . ' m²' : null,
        'amenities' => $amenities,
        'description' => $suite->description,
        'capacity' => 'Capacité : ' . $suite->capacity_adults . ' adultes' . ($suite->capacity_children > 0 ? ' et ' . $suite->capacity_children . ' enfants' : ''),
        'week_price' => $weekPrice ? 'Tarif semaine : ' . $weekPrice : null,
        'weekend_price' => $weekendPrice ? 'Tarif week-end : ' . $weekendPrice : null,
        'main_image_url' => $imageUrl,
        'main_image_alt' => $suite->name,
        'gallery' => $galleryImages,
    ]);
})->name('api.suite.show');


Route::get('/api/events', function () {
    $events = \App\Models\Event::where('is_active', true)
        ->orderBy('event_date', 'desc')
        ->get();

    return response()->json($events->map(function ($event) {
        // Filament stocke les fichiers dans storage/app/public/events/
        // Le chemin dans la BDD est "events/filename.jpg"
        // Il faut utiliser Storage::url() pour générer l'URL correcte
        $imageUrl = null;
        if ($event->image) {
            // Si le chemin commence par "images/" ou "img/", c'est un fichier dans public/
            if (str_starts_with($event->image, 'images/') || str_starts_with($event->image, 'img/')) {
                $imageUrl = asset($event->image);
            }
            // Sinon, c'est un fichier uploadé via Filament dans storage/app/public/
            // Utiliser Storage::url() qui génère automatiquement /storage/events/filename.jpg
            else {
                $imageUrl = \Illuminate\Support\Facades\Storage::url($event->image);
            }
        } else {
            $imageUrl = asset('images/Event.jpg');
        }

        // Déterminer le statut de l'événement : À venir, EN COURS, ou PASSÉ
        $status = 'À venir';
        $isPast = false;
        $isOngoing = false;

        if ($event->event_date) {
            $today = now()->startOfDay();
            $startDate = $event->event_date->startOfDay();
            $endDate = $event->end_date ? $event->end_date->startOfDay() : null;

            // Si l'événement a une date de fin
            if ($endDate) {
                if ($endDate < $today) {
                    // La date de fin est passée → PASSÉ
                    $status = 'PASSÉ';
                    $isPast = true;
                } elseif ($startDate <= $today && $today <= $endDate) {
                    // Aujourd'hui est entre la date de début et la date de fin → EN COURS
                    $status = 'EN COURS';
                    $isOngoing = true;
                } else {
                    // La date de début n'est pas encore arrivée → À venir
                    $status = 'À venir';
                }
            } else {
                // Pas de date de fin, utiliser uniquement la date de début
                if ($startDate < $today) {
                    // La date de début est passée → PASSÉ
                    $status = 'PASSÉ';
                    $isPast = true;
                } elseif ($startDate == $today) {
                    // Aujourd'hui est le jour de l'événement → EN COURS
                    $status = 'EN COURS';
                    $isOngoing = true;
                } else {
                    // La date de début n'est pas encore arrivée → À venir
                    $status = 'À venir';
                }
            }
        }

        return [
            'id' => $event->id,
            'title' => $event->title,
            'slug' => $event->slug,
            'date' => $event->event_date ? $event->event_date->format('Y-m-d') : null,
            'date_formatted' => $event->event_date ? $event->event_date->format('d/m/Y') : null,
            'end_date' => $event->end_date ? $event->end_date->format('Y-m-d') : null,
            'end_date_formatted' => $event->end_date ? $event->end_date->format('d/m/Y') : null,
            'date_text' => $event->date_text,
            'location' => $event->location,
            'summary' => $event->excerpt,
            'description' => $event->description,
            'image' => $imageUrl,
            'is_past' => $isPast,
            'is_ongoing' => $isOngoing,
            'status' => $status,
        ];
    }));
})->name('api.events');

// Route temporaire pour mettre à jour l'événement La Boutique Éphémère avec la date de fin
Route::get('/api/update-boutique-event', function () {
    $event = \App\Models\Event::where('slug', 'la-boutique-ephemere')->first();

    if (!$event) {
        return response()->json(['error' => 'Événement non trouvé'], 404);
    }

    $event->end_date = '2026-01-05';
    $event->save();

    return response()->json([
        'success' => true,
        'message' => 'Événement mis à jour avec la date de fin : 2026-01-05',
        'event' => [
            'title' => $event->title,
            'event_date' => $event->event_date ? $event->event_date->format('Y-m-d') : null,
            'end_date' => $event->end_date ? $event->end_date->format('Y-m-d') : null,
        ]
    ]);
})->name('api.update-boutique-event');

// Route pour obtenir le token CSRF (pour les pages HTML statiques)
Route::get('/api/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
})->name('api.csrf-token');

// Route API pour récupérer les données de réservation de la session
Route::get('/api/reservation-data', function () {
    $reservationData = session('reservation_data');

    if (!$reservationData) {
        return response()->json(['error' => 'No reservation data'], 404);
    }

    // Calculer le nombre de nuits
    $arrival = \Carbon\Carbon::parse($reservationData['arrival_date']);
    $departure = \Carbon\Carbon::parse($reservationData['departure_date']);
    $nights = $arrival->diffInDays($departure);

    // Formater les dates en français
    $daysFr = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    $arrivalDay = $daysFr[$arrival->dayOfWeek];
    $departureDay = $daysFr[$departure->dayOfWeek];

    return response()->json([
        'arrival_date' => $reservationData['arrival_date'],
        'departure_date' => $reservationData['departure_date'],
        'arrival_formatted' => $arrivalDay . '. ' . $arrival->format('d/m/Y'),
        'departure_formatted' => $departureDay . '. ' . $departure->format('d/m/Y'),
        'guests' => $reservationData['guests'],
        'nights' => $nights,
    ]);
})->name('api.reservation-data');

// Route API pour obtenir les suites disponibles selon les dates de réservation
Route::get('/api/available-suites', function () {
    $reservationData = session('reservation_data');

    if (!$reservationData) {
        return response()->json(['error' => 'No reservation data'], 404);
    }

    $suites = \App\Models\Suite::where('is_active', true)
        ->where('capacity_adults', '>=', $reservationData['guests'])
        ->get();

    // Filtrer les suites disponibles
    $availableSuites = $suites->filter(function ($suite) use ($reservationData) {
        return !\App\Models\Reservation::where('suite_id', $suite->id)
            ->where(function ($query) use ($reservationData) {
                $query->whereBetween('arrival_date', [$reservationData['arrival_date'], $reservationData['departure_date']])
                    ->orWhereBetween('departure_date', [$reservationData['arrival_date'], $reservationData['departure_date']])
                    ->orWhere(function ($q) use ($reservationData) {
                        $q->where('arrival_date', '<=', $reservationData['arrival_date'])
                          ->where('departure_date', '>=', $reservationData['departure_date']);
                    });
            })
            ->exists();
    });

    return response()->json($availableSuites->map(function ($suite) {
        // Déterminer l'URL HTML statique selon le type de suite
        $suiteType = strtolower($suite->type);
        $htmlUrl = null;

        // Mapping des types vers les fichiers HTML statiques
        switch ($suiteType) {
            case 'junior':
                $htmlUrl = '/suite_junior.html';
                break;
            case 'senior':
                $htmlUrl = '/suite_senior.html';
                break;
            case 'senior_vip':
            case 'senior_pool':
                $htmlUrl = '/suite_senior_vip.html';
                break;
            case 'villa_familiale':
            case 'villa':
                $htmlUrl = '/suite_villa_familiale.html';
                break;
            default:
                // Pour les nouvelles suites créées, ne pas afficher de lien
                $htmlUrl = '/page_suite.html';
                break;
        }

        // Générer l'URL de l'image (même logique que /api/suites)
        $imageUrl = null;
        if ($suite->main_image) {
            // Si le chemin commence par "images/" ou "img/", c'est un fichier dans public/
            if (str_starts_with($suite->main_image, 'images/') || str_starts_with($suite->main_image, 'img/')) {
                $imageUrl = asset($suite->main_image);
            }
            // Sinon, c'est un fichier uploadé via Filament dans storage/app/public/
            // Utiliser Storage::url() qui génère automatiquement /storage/suites/filename.jpg
            else {
                $imageUrl = \Illuminate\Support\Facades\Storage::url($suite->main_image);
            }
        } else {
            $imageUrl = asset('img/4.jpg');
        }

        return [
            'id' => $suite->id,
            'name' => $suite->name,
            'slug' => $suite->slug,
            'type' => $suite->type,
            'image' => $imageUrl,
            'description' => $suite->description,
            'capacity_adults' => $suite->capacity_adults,
            'capacity_children' => $suite->capacity_children,
            'area' => $suite->area,
            'weekly_rate' => $suite->weekly_rate,
            'weekend_rate' => $suite->weekend_rate,
            'features' => $suite->features ?? [],
            'url' => $htmlUrl,
        ];
    }));
})->name('api.available-suites');

Route::get('/api/select-suite', function (Request $request) {
    $suiteType = $request->query('suite_type');
    $quantity = max(1, (int) $request->query('quantity', 1));
    $suiteId = $request->query('suite_id');
    $suiteDisplayName = $request->query('suite_display_name'); // Nom d'affichage exact depuis la page de sélection
    $action = $request->query('action', 'add'); // 'add' ou 'remove'

    if (!$suiteType) {
        return response()->json(['error' => 'suite_type is required'], 400);
    }

    $reservationData = session('reservation_data', []);

    // Initialiser le tableau de suites sélectionnées s'il n'existe pas
    if (!isset($reservationData['selected_suites'])) {
        $reservationData['selected_suites'] = [];
    }

    // Trouver ou créer la suite dans la BDD
    $suite = null;
    if ($suiteId) {
        $suite = \App\Models\Suite::where('id', $suiteId)
            ->where('is_active', true)
            ->first();
    } else {
        // Mapper les types du front-end vers les types de la base de données
        $typeMapping = [
            'junior' => 'junior',
            'senior' => 'senior',
            'senior_pool' => 'senior_vip',
            'villa' => 'villa_familiale',
        ];

        $dbType = $typeMapping[$suiteType] ?? $suiteType;
        $suite = \App\Models\Suite::where('is_active', true)
            ->where('type', $dbType)
            ->first();
    }

    if (!$suite) {
        return response()->json(['error' => 'Suite not found'], 404);
    }

    // Créer l'entrée de suite sélectionnée
    $suiteEntry = [
        'suite_id' => $suite->id,
        'suite_type' => $suiteType,
        'suite_display_name' => $suiteDisplayName ? urldecode($suiteDisplayName) : null,
        'quantity' => $quantity,
    ];

    // Trouver l'index de cette suite dans le tableau (par suite_id)
    $existingIndex = null;
    foreach ($reservationData['selected_suites'] as $index => $selectedSuite) {
        if ($selectedSuite['suite_id'] == $suite->id) {
            $existingIndex = $index;
            break;
        }
    }

    if ($action === 'remove' || $quantity === 0) {
        // Supprimer la suite du tableau
        if ($existingIndex !== null) {
            unset($reservationData['selected_suites'][$existingIndex]);
            $reservationData['selected_suites'] = array_values($reservationData['selected_suites']); // Réindexer
        }
    } else {
        // Ajouter ou mettre à jour la suite
        if ($existingIndex !== null) {
            // Mettre à jour la quantité et le nom d'affichage
            $reservationData['selected_suites'][$existingIndex]['quantity'] = $quantity;
            if ($suiteDisplayName) {
                $reservationData['selected_suites'][$existingIndex]['suite_display_name'] = urldecode($suiteDisplayName);
            }
        } else {
            // Ajouter une nouvelle suite
            $reservationData['selected_suites'][] = $suiteEntry;
        }
    }

    // Pour la rétrocompatibilité, garder aussi les anciens champs
    if (count($reservationData['selected_suites']) > 0) {
        $firstSuite = $reservationData['selected_suites'][0];
        $reservationData['suite_type'] = $firstSuite['suite_type'];
        $reservationData['suite_id'] = $firstSuite['suite_id'];
        $reservationData['quantity'] = $firstSuite['quantity'];
        if ($firstSuite['suite_display_name']) {
            $reservationData['suite_display_name'] = $firstSuite['suite_display_name'];
        }
    }

    session(['reservation_data' => $reservationData]);

    return response()->json([
        'status' => 'success',
        'reservation_data' => $reservationData,
        'selected_suites_count' => count($reservationData['selected_suites'])
    ]);
})->name('api.select-suite');

Route::get('/api/reservation-details', function () {
    $reservationData = session('reservation_data');

    if (!$reservationData) {
        return response()->json(['error' => 'No reservation data'], 404);
    }

    // Calculer le nombre de nuits
    $arrival = \Carbon\Carbon::parse($reservationData['arrival_date']);
    $departure = \Carbon\Carbon::parse($reservationData['departure_date']);
    $nights = $arrival->diffInDays($departure);

    // Formater les dates en français
    $daysFr = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    $arrivalDay = $daysFr[$arrival->dayOfWeek];
    $departureDay = $daysFr[$departure->dayOfWeek];

    // Quantité de suites (par défaut 1)
    $quantity = isset($reservationData['quantity']) ? max(1, (int) $reservationData['quantity']) : 1;

    // Fonction pour calculer le prix total selon les jours (semaine vs week-end)
    $calculatePriceByDays = function($arrival, $departure, $weeklyRate, $weekendRate) {
        $total = 0;
        $current = $arrival->copy();

        while ($current->lt($departure)) {
            $dayOfWeek = $current->dayOfWeek; // 0 = Dimanche, 6 = Samedi

            // Samedi (6) et Dimanche (0) sont considérés comme week-end
            if ($dayOfWeek == 0 || $dayOfWeek == 6) {
                $total += $weekendRate;
            } else {
                $total += $weeklyRate;
            }

            $current->addDay();
        }

        return $total;
    };

    // Fonction pour obtenir le nom d'affichage avec accents
    $getSuiteDisplayName = function($suite) {
        $suiteType = strtolower($suite->type ?? '');
        $suiteNameMap = [
            'junior' => 'SUITES JUNIOR',
            'senior' => 'SUITES SÉNIOR',
            'senior_vip' => 'SUITES SÉNIOR AVEC PISCINE',
            'senior_pool' => 'SUITES SÉNIOR AVEC PISCINE',
            'villa_familiale' => 'VILLA FAMILIALE AVEC PISCINE PRIVÉE',
            'villa' => 'VILLA FAMILIALE AVEC PISCINE PRIVÉE',
        ];

        if (isset($suiteNameMap[$suiteType])) {
            return $suiteNameMap[$suiteType];
        }

        return strtoupper($suite->name ?? 'SUITE');
    };

    // Traiter toutes les suites sélectionnées
    $selectedSuites = isset($reservationData['selected_suites']) && is_array($reservationData['selected_suites'])
        ? $reservationData['selected_suites']
        : [];

    // Si aucune suite sélectionnée mais suite_id existe (rétrocompatibilité)
    if (empty($selectedSuites) && isset($reservationData['suite_id'])) {
        $selectedSuites = [[
            'suite_id' => $reservationData['suite_id'],
            'suite_type' => $reservationData['suite_type'] ?? 'senior',
            'suite_display_name' => $reservationData['suite_display_name'] ?? null,
            'quantity' => $reservationData['quantity'] ?? 1,
        ]];
    }

    $suitesDetails = [];
    $grandTotal = 0;

    foreach ($selectedSuites as $selectedSuite) {
        $suite = \App\Models\Suite::find($selectedSuite['suite_id']);

        if (!$suite || !$suite->is_active) {
            continue; // Ignorer les suites introuvables ou inactives
        }

        // Obtenir l'URL de l'image
        $imageUrl = null;
        if ($suite->main_image) {
            if (str_starts_with($suite->main_image, 'images/') || str_starts_with($suite->main_image, 'img/')) {
                $imageUrl = asset($suite->main_image);
            } else {
                $imageUrl = \Illuminate\Support\Facades\Storage::url($suite->main_image);
            }
        } else {
            $imageUrl = asset('img/4.jpg');
        }

        // Calculer le prix total selon les jours pour cette suite
        $suiteTotalPrice = $calculatePriceByDays(
            $arrival,
            $departure,
            $suite->weekly_rate,
            $suite->weekend_rate
        ) * ($selectedSuite['quantity'] ?? 1);

        // Utiliser le nom d'affichage stocké s'il existe, sinon utiliser la fonction
        $displayTitle = isset($selectedSuite['suite_display_name']) && !empty($selectedSuite['suite_display_name'])
            ? $selectedSuite['suite_display_name']
            : $getSuiteDisplayName($suite);

        $suitesDetails[] = [
            'id' => $suite->id,
            'name' => $suite->name,
            'title' => $displayTitle,
            'image' => $imageUrl,
            'quantity' => $selectedSuite['quantity'] ?? 1,
            'total_price' => $suiteTotalPrice,
            'suite_type' => $selectedSuite['suite_type'] ?? $suite->type, // Ajouter suite_type pour la traduction
            'type' => $suite->type, // Ajouter type aussi pour compatibilité
        ];

        $grandTotal += $suiteTotalPrice;
    }

    // Si aucune suite trouvée, utiliser le fallback statique
    if (empty($suitesDetails)) {
        $suiteType = $reservationData['suite_type'] ?? 'senior';

        // Mapping STRICT basé sur ton HTML statique (titres, images, prix)
        $staticSuites = [
            'junior' => [
                'title' => 'SUITES JUNIOR',
                'image' => asset('img/4.jpg'),
                'weekly_rate' => 200000,
                'weekend_rate' => 250000,
            ],
            'senior' => [
                'title' => 'SUITES SÉNIOR',
                'image' => asset('images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg'),
                'weekly_rate' => 280000,
                'weekend_rate' => 350000,
            ],
            'senior_pool' => [
                'title' => 'SUITES SENIOR AVEC PISCINE',
                'image' => asset('img/5.jpg'),
                'weekly_rate' => 320000,
                'weekend_rate' => 400000,
            ],
            'villa' => [
                'title' => 'VILLA FAMILIALE AVEC PISCINE PRIVEE',
                'image' => asset('images/DJI_0956.jpg'),
                'weekly_rate' => 520000,
                'weekend_rate' => 650000,
            ],
        ];

        $config = $staticSuites[$suiteType] ?? $staticSuites['senior'];
        $displayTitle = isset($reservationData['suite_display_name']) && !empty($reservationData['suite_display_name'])
            ? $reservationData['suite_display_name']
            : $config['title'];

        $staticQuantity = isset($reservationData['quantity']) ? max(1, (int) $reservationData['quantity']) : 1;
        $staticTotalPrice = $calculatePriceByDays(
            $arrival,
            $departure,
            $config['weekly_rate'],
            $config['weekend_rate']
        ) * $staticQuantity;

        $suitesDetails[] = [
            'id' => null,
            'name' => $displayTitle,
            'title' => $displayTitle,
            'image' => $config['image'],
            'quantity' => $staticQuantity,
            'total_price' => $staticTotalPrice,
        ];

        $grandTotal = $staticTotalPrice;
    }

    // Retourner les données avec toutes les suites et le total global
    return response()->json([
        'suites' => $suitesDetails,
        'arrival_date' => $reservationData['arrival_date'],
        'departure_date' => $reservationData['departure_date'],
        'arrival_formatted' => $arrivalDay . '. ' . $arrival->format('d/m/Y'),
        'departure_formatted' => $departureDay . '. ' . $departure->format('d/m/Y'),
        'nights' => $nights,
        'guests' => $reservationData['guests'] ?? 1,
        'grand_total' => $grandTotal,
        // Rétrocompatibilité : garder aussi les anciens champs pour une seule suite
        'suite' => !empty($suitesDetails) ? $suitesDetails[0] : null,
        'quantity' => !empty($suitesDetails) ? $suitesDetails[0]['quantity'] : 1,
        'total_price' => !empty($suitesDetails) ? $suitesDetails[0]['total_price'] : 0,
    ]);
})->name('api.reservation-details');

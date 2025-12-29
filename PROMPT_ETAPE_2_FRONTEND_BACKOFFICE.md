# PROMPT ÉTAPE 2 : FRONT-END BLADE ET BACK-OFFICE FILAMENT
## Génération recommandée : 4x

## CONTEXTE ET OBJECTIF

Vous devez maintenant intégrer **TOUT LE CODE FRONT-END** du site L'Escapade Hotel dans Laravel 12 en utilisant Blade, et créer le back-office complet avec Filament PHP 3.x.

**PRÉREQUIS :** L'ÉTAPE 1 doit être complétée (migrations, modèles, seeders, Filament installé, page de connexion créée).

## EXIGENCES CRITIQUES

### 1. INTÉGRATION COMPLÈTE DU FRONT-END EN BLADE

**VOUS DEVEZ INTÉGRER ABSOLUMENT TOUS LES FICHIERS ET TOUT LE CODE FRONT-END :**

- **Tous les fichiers HTML** → Convertir en templates Blade (.blade.php)
- **Tous les fichiers CSS** → Conserver dans `public/css/` ou utiliser Laravel Mix/Vite
- **Tous les fichiers JavaScript** → Conserver dans `public/js/` ou utiliser Laravel Mix/Vite
- **Toutes les images** → Déplacer dans `public/images/`, `public/img/`, `public/media/`
- **Toutes les vidéos** → Déplacer dans `public/video/`
- **Tous les fichiers du dossier Menu/** → Intégrer complètement
- **Tous les styles inline** → Conserver dans les templates Blade
- **Tous les scripts inline** → Conserver dans les templates Blade
- **Tous les fichiers de traduction** → Intégrer dans le système de traduction Laravel

**PAGES À INTÉGRER :**
- `index.html` → `resources/views/home.blade.php`
- `page_evenementiel.html` → `resources/views/events.blade.php`
- `page_suite.html` → `resources/views/suites/index.blade.php`
- `suite_junior.html` → `resources/views/suites/junior.blade.php`
- `suite_senior.html` → `resources/views/suites/senior.blade.php`
- `suite_senior_vip.html` → `resources/views/suites/senior-vip.blade.php`
- `suite_villa_familiale.html` → `resources/views/suites/villa-familiale.blade.php`
- `restaurant.html` → `resources/views/restaurant.blade.php`
- `lounge.html` → `resources/views/lounge.blade.php`
- `apropos.html` → `resources/views/about.blade.php`
- `page_reservation1.html` → `resources/views/reservations/step1.blade.php`
- `reservation3.html` → `resources/views/reservations/step3.blade.php`
- `reservation4.html` → `resources/views/reservations/step4.blade.php`
- `reservation5.html` → `resources/views/reservations/step5.blade.php`

**IMPORTANT :** Préserver exactement le même design, les mêmes animations, les mêmes interactions JavaScript, et tous les styles CSS.

### 2. AFFICHAGE DES SUITES - DESIGN IDENTIQUE

**EXIGENCE CRITIQUE :** La page qui affiche les suites (`resources/views/suites/index.blade.php`) **DOIT** afficher les suites **EXACTEMENT DE LA MÊME MANIÈRE** que l'affichage actuel sur `page_suite.html`.

**Éléments à préserver absolument :**

1. **Structure HTML identique :**
   - Section hero avec image de fond (`img/12.jpg`)
   - Titre "CHAMBRES & SUITES" centré
   - Grid des cartes de suites avec la même structure CSS
   - Section avec vidéo et texte descriptif
   - Section avec vidéo piscine et texte
   - Footer identique

2. **Cartes de suites (suite-card) :**
   - **Même structure HTML** : `<article class="suite-card">`
   - **Même image** : `<img src="..." class="suite-image">`
   - **Même contenu** : 
     - Header avec titre et prix week-end
     - Divider (`images/324_579.svg`)
     - Détails avec icônes (superficie, terrasse, TV, piscine)
     - Prix semaine
     - Divider
     - Footer avec lien "Voir la suite"
   - **Mêmes classes CSS** : `suite-card`, `suite-image`, `suite-content`, `suite-header`, `suite-title`, `suite-price`, `suite-divider`, `suite-details`, `suite-amenities`, `amenity-item`, `amenity-icon`, `amenity-label`, `suite-footer`, `details-link`
   - **Mêmes styles** : Tous les styles de `css/suite.css` doivent être préservés

3. **Icônes et images :**
   - Utiliser **exactement les mêmes icônes** que dans `page_suite.html`
   - Pour Suite Junior : `images/324_691.svg` (area), `images/iconeTerrasse.jpg` (terrasse), `images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png` (TV)
   - Pour Suite Senior : Icônes merged (`images/324_583.svg`, `324_587.svg`, `324_589.svg`, `324_591.svg`) pour l'area
   - Pour Suite Senior VIP : Icônes merged (`images/324_616.svg`, `324_621.svg`, `324_623.svg`, `324_625.svg`) + `images/324_620.svg` (piscine)
   - Pour Villa Familiale : `images/324_692.svg` (area), `images/324_618.svg` (piscine)
   - Divider : `images/324_579.svg`

4. **Données dynamiques depuis la base de données :**
   - Récupérer les suites depuis la table `suites` avec `Suite::where('is_active', true)->get()`
   - Afficher chaque suite dans une boucle Blade `@foreach`
   - Utiliser les données de la base : `$suite->name`, `$suite->main_image`, `$suite->weekend_rate`, `$suite->weekly_rate`, `$suite->area`, `$suite->features`, etc.
   - Générer les liens "Voir la suite" vers `/suites/{slug}`

5. **Responsive :**
   - Préserver **exactement** le même comportement responsive que `page_suite.html`
   - Mêmes breakpoints CSS
   - Même disposition sur mobile/tablette/desktop

6. **Animations et interactions :**
   - Préserver toutes les animations CSS existantes
   - Préserver tous les effets hover
   - Préserver toutes les transitions

**Exemple de structure Blade attendue :**

```blade
<section id="suites" class="suites-section">
  <div class="container">
    <div class="suite-grid">
      @foreach($suites as $suite)
        <article class="suite-card">
          <img src="{{ asset($suite->main_image) }}" alt="{{ $suite->name }}" class="suite-image">
          <div class="suite-content">
            <div class="suite-header">
              <h2 class="suite-title">{{ $suite->name }}</h2>
              <p class="suite-price">{{ number_format($suite->weekend_rate, 0, ',', ' ') }} FCFA - <span data-translate="suiteWeekend">Week-end</span></p>
            </div>
            <img src="{{ asset('images/324_579.svg') }}" alt="Divider" class="suite-divider">
            <div class="suite-details">
              <div class="suite-amenities">
                <!-- Afficher les icônes selon le type de suite -->
                <!-- ... -->
              </div>
              <p class="suite-price">{{ number_format($suite->weekly_rate, 0, ',', ' ') }} FCFA - <span data-translate="suiteWeek">Semaine</span></p>
            </div>
            <img src="{{ asset('images/324_579.svg') }}" alt="Divider" class="suite-divider">
            <div class="suite-footer">
              <a href="{{ route('suites.show', $suite->slug) }}" class="details-link" data-translate="viewSuite">Voir la suite</a>
            </div>
          </div>
        </article>
      @endforeach
    </div>
  </div>
</section>
```

**IMPORTANT :** Le développeur doit comparer visuellement le rendu final avec `page_suite.html` pour s'assurer que l'affichage est **100% identique**.

### 3. PAGES DE DÉTAIL DES SUITES

Créer les pages de détail pour chaque suite (`resources/views/suites/show.blade.php`) qui affichent les détails d'une suite spécifique.

- Récupérer la suite par son `slug`
- Afficher toutes les images de la galerie
- Afficher la description complète
- Afficher les équipements
- Afficher les prix
- Bouton "Réserver" qui redirige vers le processus de réservation

### 4. SYSTÈME DE TRADUCTION

Intégrer le système de traduction Laravel pour gérer le français et l'anglais.

- Créer les fichiers de traduction dans `resources/lang/fr/` et `resources/lang/en/`
- Intégrer toutes les traductions du fichier `js/translations.js` existant
- Créer un contrôleur `LanguageController` pour changer la langue
- Route : `/lang/{locale}` pour changer la langue
- Stocker la préférence de langue en session ou cookie

### 5. CONTRÔLEURS PUBLICS

Créer tous les contrôleurs nécessaires pour les pages publiques :

- `HomeController` - Page d'accueil
- `SuiteController` - Liste et détails des suites
- `RestaurantController` - Page restaurant
- `LoungeController` - Page lounge
- `EventController` - Page ÉVÈNEMENTIEL
- `AboutController` - Page à propos
- `ReservationController` - Processus de réservation (étapes 1, 3, 4, 5)
- `ContactController` - Formulaire de contact
- `LanguageController` - Changement de langue

### 6. ROUTES PUBLIQUES

Créer toutes les routes publiques dans `routes/web.php` :

```php
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/suites', [SuiteController::class, 'index'])->name('suites.index');
Route::get('/suites/{slug}', [SuiteController::class, 'show'])->name('suites.show');
Route::get('/restaurant', [RestaurantController::class, 'index'])->name('restaurant');
Route::get('/lounge', [LoungeController::class, 'index'])->name('lounge');
Route::get('/events', [EventController::class, 'index'])->name('events');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/reservations/step1', [ReservationController::class, 'step1'])->name('reservations.step1');
Route::post('/reservations/step1', [ReservationController::class, 'storeStep1'])->name('reservations.storeStep1');
Route::get('/reservations/step3', [ReservationController::class, 'step3'])->name('reservations.step3');
Route::post('/reservations/step3', [ReservationController::class, 'storeStep3'])->name('reservations.storeStep3');
Route::get('/reservations/step4', [ReservationController::class, 'step4'])->name('reservations.step4');
Route::post('/reservations/step4', [ReservationController::class, 'storeStep4'])->name('reservations.storeStep4');
Route::get('/reservations/step5/{reservation}', [ReservationController::class, 'step5'])->name('reservations.step5');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/lang/{locale}', [LanguageController::class, 'switch'])->name('lang.switch');
```

### 7. PROCESSUS DE RÉSERVATION CÔTÉ CLIENT

**Fonctionnement :**
1. Client sélectionne dates (arrivée/départ) et nombre d'invités
2. Système affiche les suites disponibles pour ces dates
3. Client sélectionne une suite
4. Client remplit le formulaire de contact (nom, prénom, email, téléphone, message)
5. Réservation créée avec statut "pending"
6. Email de confirmation envoyé au client
7. Notification dans le back-office

**Validation :**
- Vérifier que les dates sont valides (arrivée < départ)
- Vérifier que la suite est disponible pour ces dates
- Vérifier que le nombre d'invités ne dépasse pas la capacité
- Valider l'email
- Valider le téléphone

## BACK-OFFICE - FILAMENT RESOURCES ET PAGES

### 8. FILAMENT RESOURCE : SUITE RESOURCE

**Créer `app/Filament/Resources/SuiteResource.php`**

**Fonctionnalités :**

**Pour Admin :**
- ✅ Voir toutes les suites
- ✅ Ajouter une nouvelle suite
- ✅ Modifier une suite existante
- ✅ Supprimer une suite
- ✅ Activer/Désactiver une suite
- ✅ Gérer les images (upload multiple)
- ✅ Gérer les prix (hebdomadaire, week-end)
- ✅ Gérer les équipements
- ✅ Gérer la disponibilité

**Pour Sous-admin :**
- ✅ Voir toutes les suites
- ✅ Ajouter une nouvelle suite
- ✅ Modifier une suite existante
- ✅ Supprimer une suite
- ✅ Activer/Désactiver une suite
- ✅ Gérer les images
- ✅ Gérer les prix
- ✅ Gérer les équipements

**Formulaire de création/édition :**
- Nom de la suite
- Type (select: junior, senior, senior_vip, villa_familiale)
- Slug (généré automatiquement depuis le nom)
- Description (textarea avec éditeur WYSIWYG optionnel)
- Capacité adultes (number)
- Capacité enfants (number)
- Superficie en m² (decimal)
- Prix hebdomadaire (decimal)
- Prix week-end (decimal)
- Équipements (checkboxes multiples)
- Images (upload multiple avec preview)
- Image principale (select parmi les images uploadées)
- Statut actif/inactif (checkbox)

**Validation :**
- Tous les champs requis doivent être validés
- Les images doivent être des fichiers valides (jpg, png, webp)
- Les prix doivent être des nombres positifs
- Le slug doit être unique

### 9. FILAMENT RESOURCE : RESERVATION RESOURCE

**Créer `app/Filament/Resources/ReservationResource.php`**

**Fonctionnalités :**

**Pour Admin :**
- ✅ Voir toutes les réservations
- ✅ Filtrer par statut
- ✅ Filtrer par date
- ✅ Filtrer par suite
- ✅ Voir les détails d'une réservation
- ✅ Modifier le statut d'une réservation
- ✅ Envoyer une notification email lors du changement de statut
- ✅ Exporter les réservations en PDF
- ✅ Rechercher par nom, email, téléphone

**Pour Sous-admin :**
- ✅ Voir toutes les réservations
- ✅ Filtrer par statut
- ✅ Filtrer par date
- ✅ Filtrer par suite
- ✅ Voir les détails d'une réservation
- ✅ Modifier le statut d'une réservation
- ✅ Envoyer une notification email lors du changement de statut
- ✅ Exporter les réservations en PDF
- ✅ Rechercher par nom, email, téléphone

**Interface :**
- Tableau avec colonnes : ID, Client, Suite, Dates, Statut, Date de demande, Actions
- Filtres en haut de la page
- Pagination
- Actions : Voir détails, Modifier statut, Exporter en PDF

**Actions personnalisées Filament :**
- Action pour modifier le statut avec sélecteur de statut
- Action pour exporter en PDF (utiliser DomPDF)
- Badges colorés pour les statuts (pending, confirmed, cancelled, etc.)

**Notification email :**
- Lorsqu'une réservation passe à "confirmée", envoyer un email au client
- Template d'email professionnel en français et anglais

### 10. FILAMENT RESOURCE : USER RESOURCE

**Créer `app/Filament/Resources/UserResource.php`**

**Fonctionnalités (Admin uniquement) :**
- ✅ Voir la liste des utilisateurs
- ✅ Créer un nouveau sous-administrateur
- ✅ Modifier un utilisateur
- ✅ Désactiver/Activer un compte
- ✅ Supprimer un compte
- ❌ Modifier son propre rôle (sécurité)

**Formulaire de création :**
- Nom
- Email (unique)
- Mot de passe (avec confirmation)
- Rôle (select: admin, sub_admin)
- Statut actif/inactif

**Sécurité :**
- Seul l'admin peut créer/modifier/supprimer des comptes
- Un admin ne peut pas se supprimer lui-même
- Les mots de passe doivent être forts (min 8 caractères)

**Permissions Filament :**
- Configurer les permissions pour que seuls les admins puissent accéder à cette ressource

### 11. FILAMENT PAGE : STATISTICS PAGE

**Créer `app/Filament/Pages/Statistics.php`**

**Affichage :**
- Nombre de réservations par période (graphique en ligne ou barres)
- Taux d'occupation des chambres (pourcentage avec graphique)
- Types de chambres les plus demandés (graphique en barres)
- Périodes les plus actives (calendrier ou graphique)
- Répartition des statuts de réservations (graphique circulaire/pie chart)

**Périodes :**
- Aujourd'hui
- Cette semaine
- Ce mois
- Cette année
- Période personnalisée (date début - date fin) - avec sélecteur de dates Filament

**Bibliothèques de graphiques :**
- **Chart.js** ou **ApexCharts** pour les graphiques interactifs
- **IMPORTANT :** Ces bibliothèques sont utilisées **UNIQUEMENT dans le back-office Filament** pour la page des statistiques
- **Le front-end public (pages Blade)** doit utiliser le design existant **SANS Chart.js/ApexCharts**
- Les graphiques doivent être adaptés aux couleurs du projet :
  - Couleur primaire : `#B78F62`
  - Couleur secondaire : `#BB996B`
  - Couleurs complémentaires pour les différents types de graphiques

**Installation NPM :**
```bash
npm install chart.js
# OU
npm install apexcharts
```

**Accès :**
- Admin : ✅ Accès complet
- Sous-admin : ✅ Accès complet

### 12. FILAMENT PAGE : SETTINGS PAGE

**Créer `app/Filament/Pages/Settings.php`**

**Paramètres à gérer :**
- Horaires d'ouverture
- Contacts (téléphone, email, adresse)
- Informations générales de l'hôtel
- (Optionnel) Configuration email pour les notifications

**Accès :**
- Admin : ✅ Accès complet
- Sous-admin : ❌ Accès interdit

### 13. FILAMENT DASHBOARD - WIDGETS

**Créer des widgets Filament pour le dashboard :**

- Nombre total de chambres (actives) - Widget Stats
- Nombre de réservations reçues (total) - Widget Stats
- Réservations en attente (count) - Widget Stats
- Réservations confirmées (count) - Widget Stats
- Réservations annulées (count) - Widget Stats
- Aperçu de l'occupation par période (graphique simple) - Widget Chart
- Dernières réservations (liste des 5 dernières) - Widget Table

**Créer les widgets :**
```bash
php artisan make:filament-widget StatsOverview
php artisan make:filament-widget OccupancyChart
php artisan make:filament-widget RecentReservations
```

### 14. PERMISSIONS FILAMENT PAR RÔLE

**Configurer les permissions dans Filament :**

**Administrateur (admin) :**
- ✅ Accès à toutes les fonctionnalités
- ✅ Gestion complète des suites (CRUD)
- ✅ Gestion complète des réservations (voir, modifier statut, exporter PDF)
- ✅ Gestion des sous-administrateurs (créer, modifier, supprimer)
- ✅ Accès aux statistiques
- ✅ Accès aux paramètres généraux

**Sous-administrateur (sub_admin) :**
- ✅ Gestion complète des suites (voir, créer, modifier, supprimer, activer/désactiver)
- ✅ Gestion complète des réservations (voir, filtrer, modifier statut, exporter PDF, envoyer notifications)
- ✅ Accéder aux statistiques
- ❌ Gérer les sous-administrateurs (INTERDIT)
- ❌ Accéder aux paramètres généraux (INTERDIT)

**Configuration dans Filament :**
- Utiliser les policies Laravel ou les permissions Filament
- Configurer les ressources pour respecter les permissions par rôle

## DÉPENDANCES REQUISES

### Packages NPM pour les statistiques (back-office uniquement) :

```json
{
  "dependencies": {
    "chart.js": "^4.0.0",
    // OU "apexcharts": "^3.0.0"
  }
}
```

**Installation :**
```bash
npm install chart.js
# OU
npm install apexcharts
```

**IMPORTANT :**
- Chart.js ou ApexCharts sont utilisés **UNIQUEMENT dans le back-office Filament** pour les statistiques
- **NE PAS** inclure Chart.js/ApexCharts dans le front-end public (pages Blade)
- Le front-end public doit utiliser uniquement le design existant (CSS/JavaScript actuel)

## EXIGENCES TECHNIQUES

### 1. SÉCURITÉ
- Protection CSRF sur tous les formulaires
- Validation stricte des données d'entrée
- Échappement XSS automatique (Blade)
- Hash des mots de passe (bcrypt)
- Middleware d'authentification
- Protection des routes admin

### 2. PERFORMANCE
- Optimisation des requêtes (Eager Loading)
- Cache des données fréquemment utilisées
- Optimisation des images (compression)
- Lazy loading des images

### 3. RESPONSIVE
- Le site doit rester 100% responsive
- Tous les styles CSS doivent être préservés
- Toutes les animations JavaScript doivent fonctionner

### 4. MULTILINGUE
- Système de traduction Laravel (fr/en)
- Toutes les traductions du site actuel doivent être intégrées
- Changer de langue doit fonctionner comme sur le site actuel

### 5. VALIDATION DES FORMULAIRES
- Validation côté serveur (Laravel)
- Validation côté client (JavaScript existant)
- Messages d'erreur clairs et en français/anglais

## INSTRUCTIONS FINALES

1. **PRÉSERVER 100% DU DESIGN FRONT-END** : Le site public doit être visuellement identique au site actuel

2. **AFFICHAGE DES SUITES IDENTIQUE** : La page `/suites` DOIT afficher les suites **EXACTEMENT DE LA MÊME MANIÈRE** que `page_suite.html` actuel. Même structure HTML, mêmes classes CSS, mêmes icônes, même disposition, même responsive. Comparer visuellement pour validation.

3. **FILAMENT POUR BACK-OFFICE** :
   - Créer les Resources Filament pour Suites, Réservations, Users
   - Créer les pages personnalisées pour Statistiques et Paramètres
   - Utiliser Chart.js ou ApexCharts **UNIQUEMENT** dans la page Statistiques Filament
   - Configurer les permissions par rôle

4. **PRÉSERVER TOUTES LES FONCTIONNALITÉS FRONT-END** : Tous les JavaScript, animations, interactions du front-end public doivent fonctionner

5. **SÉCURITÉ MAXIMALE** : Protection CSRF, XSS, validation stricte

6. **CODE PROPRE** : Suivre les conventions Laravel, PSR-12, commenter le code

7. **DOCUMENTATION** : Créer un README.md avec les instructions d'installation et d'utilisation

## LIVRABLES ATTENDUS

1. Toutes les pages Blade publiques intégrées et fonctionnelles
2. Tous les contrôleurs publics créés
3. Toutes les routes publiques configurées
4. Système de traduction fonctionnel
5. Processus de réservation fonctionnel
6. Back-office Filament complet avec toutes les Resources et Pages
7. Permissions par rôle configurées
8. Documentation d'installation (README.md)
9. Fichier .env.example avec toutes les variables nécessaires

---

**IMPORTANT :** Cette étape doit intégrer TOUT le front-end en Blade et créer TOUT le back-office Filament. Le site doit être 100% fonctionnel à la fin de cette étape.


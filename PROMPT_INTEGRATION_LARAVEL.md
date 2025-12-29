# PROMPT COMPLET : INTÉGRATION FRONT-END ESCAPADE DANS LARAVEL 12 (BLADE)

## CONTEXTE ET OBJECTIF

Vous devez intégrer **TOUT LE CODE FRONT-END** du site L'Escapade Hotel dans un projet Laravel 12 en utilisant le système de templates Blade. Le site actuel est un site statique HTML/CSS/JavaScript qui doit être transformé en application Laravel complète avec base de données.

**IMPORTANT - SÉPARATION FRONT-END / BACK-OFFICE :**
- **Front-end public (pages client)** : Utiliser **Blade** pour toutes les pages publiques (home, suites, restaurant, etc.) - **PRÉSERVER 100% DU DESIGN EXISTANT**
- **Back-office (administration)** : Utiliser **Filament PHP** pour toute l'interface d'administration - **ADAPTER LE DESIGN FILAMENT AU PROJET**
- **Page de connexion admin** : Design personnalisé avec vidéo en fond et effet glassmorphism (hors Filament)

## EXIGENCES CRITIQUES

### 1. INTÉGRATION COMPLÈTE DU FRONT-END

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

### 2. BASE DE DONNÉES - SUITES PRÉ-REMPLIES

**TOUTES LES SUITES DOIVENT ÊTRE DÉJÀ INTÉGRÉES DANS LA BASE DE DONNÉES AVEC TOUTES LEURS INFORMATIONS :**

#### Structure de la table `suites` :

```sql
- id (bigint, primary key, auto increment)
- name (string) - Ex: "Suite Junior", "Suite Senior VIP"
- slug (string, unique) - Ex: "suite-junior", "suite-senior-vip"
- type (enum: 'junior', 'senior', 'senior_vip', 'villa_familiale')
- description (text) - Description complète de la suite
- capacity_adults (integer) - Nombre d'adultes
- capacity_children (integer) - Nombre d'enfants
- area (decimal) - Superficie en m² (ex: 70.00, 85.91)
- weekly_rate (decimal) - Prix hebdomadaire en FCFA
- weekend_rate (decimal) - Prix week-end en FCFA
- features (json) - Équipements (piscine, terrasse, TV, etc.)
- images (json) - Tableau des chemins d'images
- main_image (string) - Image principale
- is_active (boolean, default: true)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Données à pré-remplir (basées sur le site actuel) - TOUTES LES IMAGES ET ICÔNES :

**1. Suite Junior**
- Nom: "Suite Junior"
- Slug: "suite-junior"
- Type: junior
- Description: "Avec ses 70 m², la Suite Junior allie design contemporain, matériaux naturels et inspiration locale. Lumineuse et raffinée, elle révèle un luxe authentique dans sa plus grande simplicité."
- Capacité: 2 adultes + 2 enfants
- Superficie: 70 m²
- Prix hebdomadaire: 200,000 FCFA
- Prix week-end: 250,000 FCFA
- Équipements: ["Terrasse", "TV"]
- **Image principale (main_image)**: "img/4.jpg"
- **Images galerie (images - JSON array)**:
  - "video/CHAMBRE 2 NEW VERSION.mp4" (vidéo)
  - "images/DSC06627.jpg"
- **Images de fond hero**: "img/4.jpg"
- **Icônes et éléments décoratifs utilisés**:
  - "images/510_20.svg" (Icône superficie/area)
  - "images/iconeTerrasse.jpg" (Icône terrasse)
  - "images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png" (Icône TV)
  - "images/272_1778.svg" (Icône bullet point)
  - "images/272_1776.svg" (Icône bullet point)
  - "images/279_1796.svg" (Icône bullet point)
  - "media/510_6.svg" (Élément décoratif)
  - "media/510_8.svg" (Élément décoratif)
  - "images/Group 208.png" (Indicateurs galerie)
  - "images/324_579.svg" (Séparateur/divider)
  - "images/324_691.svg" (Icône area pour la carte suite)
  - "images/568_819.png" (Favicon)
  - "images/568_819.svg" (Logo header)
  - "images/568_939.svg" (Icône menu burger)
  - "images/568_837.svg" (Séparateur langue)
  - "images/568_838.svg" (Bouton "Réserver une suite")
  - "images/568_833.svg" (Bouton "Réserver un espace")
  - "images/568_840.svg" (Bouton "Nous Contactez")

**2. Suite Senior**
- Nom: "Suite Senior"
- Slug: "suite-senior"
- Type: senior
- Description: "D'une superficie de 85,91 m2, la Suite Senior offre de grands volumes rappelant le confort d'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant."
- Capacité: 2 adultes + 2 enfants
- Superficie: 85.91 m²
- Prix hebdomadaire: 280,000 FCFA
- Prix week-end: 350,000 FCFA
- Équipements: ["Terrasse", "TV"]
- **Image principale (main_image)**: "images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg"
- **Images galerie (images - JSON array)**:
  - "images/4e8bd77d88ebb1c9f445970808bcf56230320041.jpg"
  - "images/IMG_5871.jpg"
  - "images/IMG_1415.jpg"
- **Images de fond hero**: "images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg"
- **Icônes et éléments décoratifs utilisés**:
  - "images/510_20.svg" (Icône superficie/area)
  - "images/iconeTerrasse.jpg" (Icône terrasse)
  - "images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png" (Icône TV)
  - "images/272_1778.svg" (Icône bullet point)
  - "images/272_1776.svg" (Icône bullet point)
  - "images/279_1796.svg" (Icône bullet point)
  - "media/510_6.svg" (Élément décoratif)
  - "media/510_8.svg" (Élément décoratif)
  - "images/Group 208.png" (Indicateurs galerie)
  - "images/324_579.svg" (Séparateur/divider)
  - "images/324_583.svg" (Partie 1 de l'icône area merged pour carte)
  - "images/324_587.svg" (Partie 2 de l'icône area merged pour carte)
  - "images/324_589.svg" (Partie 3 de l'icône area merged pour carte)
  - "images/324_591.svg" (Partie 4 de l'icône area merged pour carte)
  - Toutes les icônes communes (logo, menu, boutons, etc.)

**3. Suite Senior VIP (avec Piscine)**
- Nom: "Suites Seniors avec Piscines"
- Slug: "suite-senior-vip"
- Type: senior_vip
- Description: "D'une superficie de 85,91 m2, les suites senior avec piscines offrent de grands volumes rappelant le confort d'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant. Ces suites offrent un confort exceptionnel pour un séjour inoubliable."
- Capacité: 2 adultes + 2 enfants
- Superficie: 85.91 m²
- Prix hebdomadaire: 320,000 FCFA
- Prix week-end: 400,000 FCFA
- Équipements: ["Piscine", "TV", "Terrasse"]
- **Image principale (main_image)**: "img/13.jpg"
- **Images galerie (images - JSON array)**:
  - "img/14.jpg"
  - "images/IMG_5871.jpg"
  - "img/5.jpg"
- **Images de fond hero**: "img/5.jpg"
- **Icônes et éléments décoratifs utilisés**:
  - "images/510_20.svg" (Icône superficie/area)
  - "images/272_1551.svg" (Icône piscine)
  - "images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png" (Icône TV)
  - "images/272_1778.svg" (Icône bullet point)
  - "images/272_1776.svg" (Icône bullet point)
  - "images/279_1796.svg" (Icône bullet point)
  - "media/510_6.svg" (Élément décoratif)
  - "media/510_8.svg" (Élément décoratif)
  - "images/Group 208.png" (Indicateurs galerie)
  - "images/324_579.svg" (Séparateur/divider)
  - "images/324_616.svg" (Partie 1 de l'icône area merged pour carte)
  - "images/324_621.svg" (Partie 2 de l'icône area merged pour carte)
  - "images/324_623.svg" (Partie 3 de l'icône area merged pour carte)
  - "images/324_625.svg" (Partie 4 de l'icône area merged pour carte)
  - "images/324_620.svg" (Icône piscine pour la carte suite)
  - Toutes les icônes communes (logo, menu, boutons, etc.)

**4. Villa Familiale avec Piscine Privée**
- Nom: "Villa Familiale avec Piscine Privée"
- Slug: "villa-familiale"
- Type: villa_familiale
- Description: "Ouverte sur le jardin verdoyant de L'Escapade, la Villa Familiale est un véritable refuge d'exception. Dotée de sa piscine privée et d'une large terrasse bordée de cocotiers, elle offre une vue apaisante sur les espaces verts de l'hôtel. Avec ses deux chambres, son salon élégant et ses volumes généreux, cette suite est pensée pour accueillir familles et proches dans un confort absolu. Chaque détail reflète l'hospitalité à l'ivoirienne."
- Capacité: Famille (4 adultes + 4 enfants)
- Superficie: 170 m²
- Prix hebdomadaire: 520,000 FCFA
- Prix week-end: 650,000 FCFA
- Équipements: ["Piscine privée", "Terrasse", "TV", "2 Chambres", "Salon"]
- **Image principale (main_image)**: "images/DJI_0956.jpg"
- **Images galerie (images - JSON array)**:
  - "images/IMG_1415.jpg"
  - "images/ImageVilla.jpg"
  - "images/IMG_1341.jpg"
  - "images/IMG_6280.jpg"
  - "img/30.jpg"
- **Images de fond hero**: "images/DJI_0956.jpg"
- **Icônes et éléments décoratifs utilisés**:
  - "images/510_20.svg" (Icône superficie/area)
  - "images/272_1551.svg" (Icône piscine)
  - "images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png" (Icône TV)
  - "images/272_1778.svg" (Icône bullet point)
  - "images/272_1776.svg" (Icône bullet point)
  - "images/279_1796.svg" (Icône bullet point)
  - "media/510_6.svg" (Élément décoratif)
  - "media/510_8.svg" (Élément décoratif)
  - "images/Group 208.png" (Indicateurs galerie)
  - "images/324_579.svg" (Séparateur/divider)
  - "images/324_692.svg" (Icône area pour la carte suite - 170 m²)
  - "images/324_618.svg" (Icône piscine pour la carte suite)
  - Toutes les icônes communes (logo, menu, boutons, etc.)

**ICÔNES COMMUNES (utilisées sur toutes les pages) :**
- "images/568_819.png" (Favicon)
- "images/568_819.svg" (Logo L'Escapade - header)
- "images/568_939.svg" (Icône menu burger)
- "images/568_837.svg" (Séparateur langue FR/EN)
- "images/568_838.svg" (Bouton "Réserver une suite" - background)
- "images/568_833.svg" (Bouton "Réserver un espace" - background)
- "images/568_840.svg" (Bouton "Nous Contactez" - background)
- "images/527e11cd0fcc42350d0710d865057dc9385bcebf.png" (Logo footer)
- "images/427_66.svg" (Background titre "MENU" footer)
- "images/427_67.svg" (Background titre "CONTACT" footer)
- "images/427_62.svg" (Icône téléphone footer)
- "images/427_56.svg" (Icône email footer)
- "images/427_50.svg" (Icône localisation footer)
- "images/Vector.png" (Séparateur footer)
- "images/WaveLogo.png" (Logo Wave paiement)
- "images/logoOrange.png" (Logo Orange Money paiement)
- "Menu/images/542_446.svg" (Icône fermeture menu overlay)
- "Menu/images/542_445.svg" (Séparateur langue menu overlay)
- "Menu/images/542_454.svg" (Partie 1 logo menu overlay)
- "Menu/images/542_453.svg" (Partie 2 logo menu overlay)
- "Menu/images/542_457.svg" (Partie 3 logo menu overlay)
- "Menu/images/542_575.svg" (Ligne décorative nav menu)
- "Menu/images/542_560.svg" (Background nav "CHAMBRES & SUITES")
- "Menu/images/542_467.svg" (Background nav "LE RESTAURANT")
- "Menu/images/542_471.svg" (Background nav "LE LOUNGE")
- "Menu/images/542_564.svg" (Background nav "ÉVÈNEMENTIEL")
- "Menu/images/542_567.svg" (Background nav "A PROPOS")
- "Menu/images/542_461.svg" (Décoratif coin supérieur menu)
- "Menu/images/542_458.svg" (Décoratif coin inférieur menu)
- "Menu/images/IMG_1341.jpg" (Image par défaut menu overlay)

**IMPORTANT :** Créer un Seeder Laravel qui insère toutes ces données dans la base de données lors de la migration.

### 2.1. AFFICHAGE DES SUITES - DESIGN IDENTIQUE

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

### 3. STRUCTURE LARAVEL

```
escapade-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php
│   │   │   ├── SuiteController.php
│   │   │   ├── ReservationController.php
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── SuiteController.php
│   │   │   │   ├── ReservationController.php
│   │   │   │   ├── UserController.php
│   │   │   │   └── StatisticsController.php
│   │   │   └── ...
│   │   ├── Models/
│   │   │   ├── Suite.php
│   │   │   ├── Reservation.php
│   │   │   ├── User.php (étendre pour Admin/Sous-admin)
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── database/
│   ├── migrations/
│   │   ├── create_suites_table.php
│   │   ├── create_reservations_table.php
│   │   ├── create_users_table.php (avec role)
│   │   └── ...
│   ├── seeders/
│   │   ├── SuiteSeeder.php (PRÉ-REMPLIR TOUTES LES SUITES)
│   │   └── ...
│   └── ...
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   │   ├── app.blade.php (layout principal pour front-end public)
│   │   │   └── auth/
│   │   │       └── login.blade.php (page de connexion avec vidéo et glassmorphism)
│   │   ├── components/ (composants Blade réutilisables)
│   │   ├── home.blade.php (front-end public)
│   │   ├── suites/
│   │   │   ├── index.blade.php (front-end public - liste des suites)
│   │   │   ├── show.blade.php (front-end public - détail d'une suite)
│   │   │   └── ...
│   │   ├── reservations/
│   │   │   ├── step1.blade.php (front-end public)
│   │   │   ├── step3.blade.php (front-end public)
│   │   │   ├── step4.blade.php (front-end public)
│   │   │   └── step5.blade.php (front-end public)
│   │   └── ...
│   ├── lang/
│   │   ├── fr/
│   │   │   └── messages.php (traductions françaises)
│   │   └── en/
│   │       └── messages.php (traductions anglaises)
│   └── ...
├── app/
│   ├── Filament/
│   │   ├── Resources/
│   │   │   ├── SuiteResource.php (gestion des suites dans Filament)
│   │   │   ├── ReservationResource.php (gestion des réservations dans Filament)
│   │   │   └── UserResource.php (gestion des utilisateurs dans Filament)
│   │   ├── Pages/
│   │   │   ├── Statistics.php (page statistiques personnalisée avec Chart.js/ApexCharts)
│   │   │   └── Settings.php (page paramètres personnalisée)
│   │   └── ...
│   └── lang/
│       ├── fr/
│       │   └── messages.php (traductions françaises)
│       └── en/
│           └── messages.php (traductions anglaises)
├── public/
│   ├── css/ (tous les fichiers CSS)
│   ├── js/ (tous les fichiers JavaScript)
│   ├── images/ (toutes les images)
│   ├── img/ (toutes les images)
│   ├── media/ (tous les fichiers media)
│   ├── video/ (toutes les vidéos)
│   └── Menu/ (tout le dossier Menu)
└── routes/
    ├── web.php (routes publiques)
    └── admin.php (routes admin)
```

## BACK-END - FONCTIONNALITÉS REQUISES

### 1. AUTHENTIFICATION SÉCURISÉE

**Routes d'authentification :**
- `/admin/login` - Page de connexion (non publique) - **AVEC VIDÉO EN FOND ET GLASSMORPHISM**
- `/admin/logout` - Déconnexion
- Middleware d'authentification pour toutes les routes `/admin/*`

**Page de connexion - Design spécial :**

**IMPORTANT :** La page de connexion (`/admin/login`) doit avoir un design unique et élégant :

1. **Vidéo en arrière-plan :**
   - Vidéo en plein écran en arrière-plan (autoplay, muted, loop)
   - Utiliser une vidéo de l'hôtel (ex: `video/CHAMBRE 2 NEW VERSION.mp4` ou une vidéo similaire)
   - Overlay sombre (opacité ~0.6) pour améliorer la lisibilité du formulaire
   - La vidéo doit être optimisée pour le web (format MP4, compression)

2. **Formulaire avec effet Glassmorphism :**
   - Formulaire centré verticalement et horizontalement
   - **Effet glassmorphism** : 
     - Background : `rgba(255, 255, 255, 0.1)` ou similaire
     - Backdrop-filter : `blur(10px)` ou `blur(15px)`
     - Border : `1px solid rgba(255, 255, 255, 0.2)`
     - Border-radius : `20px` ou `24px`
     - Box-shadow : ombre douce pour effet de profondeur
   - Padding généreux pour le formulaire
   - Champs de formulaire avec background semi-transparent
   - Bouton de connexion avec style élégant (couleurs du projet : `#B78F62` ou similaire)

3. **Éléments visuels :**
   - Logo L'Escapade centré en haut du formulaire
   - Titre "Connexion" ou "Admin" stylisé
   - Messages d'erreur avec style cohérent
   - Responsive : sur mobile, le formulaire reste lisible et bien positionné

4. **Structure HTML/CSS :**
   ```html
   <div class="login-container">
     <video autoplay muted loop class="login-background-video">
       <source src="video/CHAMBRE 2 NEW VERSION.mp4" type="video/mp4">
     </video>
     <div class="login-overlay"></div>
     <div class="login-form-wrapper">
       <form class="login-form glassmorphism">
         <!-- Logo, champs, bouton -->
       </form>
     </div>
   </div>
   ```

**CSS Glassmorphism :**
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

**Système de rôles :**
- `admin` - Administrateur principal (accès total)
- `sub_admin` - Sous-administrateur (accès limité mais peut modifier les statuts de réservations et exporter en PDF)

**Résumé des permissions par rôle :**

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

**Table `users` :**
```sql
- id
- name
- email (unique)
- password (hashed)
- role (enum: 'admin', 'sub_admin')
- is_active (boolean, default: true)
- created_at
- updated_at
```

**Sécurité :**
- Protection CSRF sur tous les formulaires
- Protection XSS (échappement automatique Blade)
- Validation stricte des données
- Hash des mots de passe (bcrypt)
- Sessions sécurisées

### 2. TABLEAU DE BORD (DASHBOARD) - AVEC FILAMENT

**Route :** `/admin/dashboard`

**Framework :** Utiliser **Filament PHP** (https://filamentphp.com) pour tout le back-office.

**Installation Filament :**
```bash
composer require filament/filament:"^3.0"
php artisan filament:install --panels
```

**Adaptation du design Filament au projet :**

1. **Couleurs personnalisées :**
   - Couleur primaire : `#B78F62` (couleur principale du site)
   - Couleur secondaire : `#BB996B` (couleur highlight)
   - Adapter le thème Filament pour utiliser ces couleurs
   - Créer un fichier de configuration de thème personnalisé

2. **Branding :**
   - Logo L'Escapade dans le header Filament
   - Favicon personnalisé
   - Nom de l'application : "L'Escapade - Administration"

3. **Widgets du Dashboard :**
   - Nombre total de chambres (actives) - Widget Stats
   - Nombre de réservations reçues (total) - Widget Stats
   - Réservations en attente (count) - Widget Stats
   - Réservations confirmées (count) - Widget Stats
   - Réservations annulées (count) - Widget Stats
   - Aperçu de l'occupation par période (graphique simple) - Widget Chart
   - Dernières réservations (liste des 5 dernières) - Widget Table

4. **Design responsive :**
   - Filament est responsive par défaut, mais s'assurer que l'adaptation des couleurs fonctionne sur tous les écrans

**Affichage :**
- Nombre total de chambres (actives)
- Nombre de réservations reçues (total)
- Réservations en attente (count)
- Réservations confirmées (count)
- Réservations annulées (count)
- Aperçu de l'occupation par période (graphique simple)
- Dernières réservations (liste des 5 dernières)

**Design :** Interface moderne et claire avec Filament, adaptée aux couleurs du projet L'Escapade.

### 3. GESTION DES CHAMBRES (SUITES) - AVEC FILAMENT

**Routes :** Gérées par Filament Resource
- `/admin/suites` - Liste des suites (Filament Resource Table)
- `/admin/suites/create` - Créer une suite (Filament Resource Form)
- `/admin/suites/{id}/edit` - Modifier une suite (Filament Resource Form)
- `/admin/suites/{id}` - Voir les détails (Filament Resource View)

**Utilisation de Filament :**
- Créer un `SuiteResource` avec Filament
- Utiliser les composants Filament pour les formulaires (TextInput, Select, FileUpload, etc.)
- Adapter les couleurs et styles pour correspondre au projet
- Gérer l'upload d'images multiples avec Filament FileUpload

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

### 4. GESTION DES RÉSERVATIONS (SANS PAIEMENT) - AVEC FILAMENT

**Route :** `/admin/reservations` (Filament Resource)

**Utilisation de Filament :**
- Créer un `ReservationResource` avec Filament
- Tableau avec filtres intégrés Filament
- Actions personnalisées pour modifier le statut
- Action personnalisée pour exporter en PDF
- Badges colorés pour les statuts (pending, confirmed, cancelled, etc.)

**Table `reservations` :**
```sql
- id
- suite_id (foreign key -> suites.id)
- first_name (string)
- last_name (string)
- email (string)
- phone (string)
- arrival_date (date)
- departure_date (date)
- guests (integer)
- message (text, nullable)
- status (enum: 'pending', 'confirmed', 'cancelled', 'in_stay', 'completed')
- created_at
- updated_at
```

**Statuts :**
- `pending` - En attente (par défaut)
- `confirmed` - Confirmée
- `cancelled` - Annulée
- `in_stay` - En séjour
- `completed` - Terminée

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
- Actions : Voir détails, Modifier statut, Exporter en PDF (disponible pour Admin et Sous-admin)

**Notification email :**
- Lorsqu'une réservation passe à "confirmée", envoyer un email au client
- Template d'email professionnel en français et anglais

### 5. PROCESSUS DE RÉSERVATION CÔTÉ CLIENT

**Routes :**
- `/reservations/step1` - Sélection des dates et suite
- `/reservations/step3` - Détails et confirmation
- `/reservations/step4` - Informations de contact
- `/reservations/step5` - Confirmation finale

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

### 6. GESTION DES SOUS-ADMINISTRATEURS - AVEC FILAMENT

**Route :** `/admin/users` (Admin uniquement - Filament Resource)

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

### 7. STATISTIQUES INTERNES - AVEC FILAMENT ET CHART.JS/APEXCHARTS

**Route :** `/admin/statistics` (Admin et Sous-admin)

**Utilisation de Filament :**
- Créer une page Filament personnalisée pour les statistiques
- Utiliser les widgets Filament ou intégrer Chart.js/ApexCharts dans cette page

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

### 8. PARAMÈTRES GÉNÉRAUX - AVEC FILAMENT

**Route :** `/admin/settings` (Admin uniquement)

**Utilisation de Filament :**
- Créer une page Filament personnalisée pour les paramètres
- Utiliser les composants Filament Form pour les champs

**Paramètres à gérer :**
- Horaires d'ouverture
- Contacts (téléphone, email, adresse)
- Informations générales de l'hôtel
- (Optionnel) Configuration email pour les notifications

**Table `settings` :**
```sql
- id
- key (string, unique)
- value (text)
- created_at
- updated_at
```

## DÉPENDANCES REQUISES

### Packages Composer à installer :

```json
{
  "require": {
    "laravel/framework": "^12.0",
    "filament/filament": "^3.0",
    "spatie/laravel-permission": "^6.0", // Pour la gestion des rôles (optionnel, ou utiliser Filament native)
    "barryvdh/laravel-dompdf": "^3.0", // Pour l'export PDF des réservations
    "intervention/image": "^3.0" // Pour la gestion/optimisation des images
  }
}
```

### Packages NPM pour les statistiques (back-office uniquement) :

```json
{
  "dependencies": {
    "chart.js": "^4.0.0", // OU "apexcharts": "^3.0.0"
    "vue": "^3.0.0" // Si utilisation de Vue avec Filament (optionnel)
  }
}
```

**IMPORTANT :**
- Chart.js ou ApexCharts sont utilisés **UNIQUEMENT dans le back-office Filament** pour les statistiques
- **NE PAS** inclure Chart.js/ApexCharts dans le front-end public (pages Blade)
- Le front-end public doit utiliser uniquement le design existant (CSS/JavaScript actuel)

## EXIGENCES TECHNIQUES

### 1. LARAVEL 12 ET FILAMENT
- Utiliser Laravel 12 (dernière version)
- PHP 8.2 minimum
- MySQL/MariaDB ou PostgreSQL
- **Filament PHP 3.x** pour le back-office
  - Installation : `composer require filament/filament:"^3.0"`
  - Configuration : `php artisan filament:install --panels`
  - Adapter le thème Filament aux couleurs du projet L'Escapade

**Configuration du thème Filament :**

Créer un fichier de configuration pour personnaliser Filament (`config/filament.php` ou dans `AppServiceProvider`) :

```php
use Filament\Support\Colors\Color;

// Dans le PanelProvider ou ServiceProvider
->colors([
    'primary' => Color::hex('#B78F62'), // Couleur principale L'Escapade
    'secondary' => Color::hex('#BB996B'), // Couleur highlight
])
->brandName('L\'Escapade')
->brandLogo(asset('images/568_819.svg'))
->favicon(asset('images/568_819.png'))
->darkMode(false) // Mode clair par défaut
```

**Personnalisation avancée :**
- Créer un thème Filament personnalisé si nécessaire
- Adapter les composants Filament pour correspondre au style du projet
- Utiliser les hooks Filament pour personnaliser les vues

### 2. SÉCURITÉ
- Protection CSRF sur tous les formulaires
- Validation stricte des données d'entrée
- Échappement XSS automatique (Blade)
- Hash des mots de passe (bcrypt)
- Middleware d'authentification
- Protection des routes admin

### 3. PERFORMANCE
- Optimisation des requêtes (Eager Loading)
- Cache des données fréquemment utilisées
- Optimisation des images (compression)
- Lazy loading des images

### 4. RESPONSIVE
- Le site doit rester 100% responsive
- Tous les styles CSS doivent être préservés
- Toutes les animations JavaScript doivent fonctionner

### 5. MULTILINGUE
- Système de traduction Laravel (fr/en)
- Toutes les traductions du site actuel doivent être intégrées
- Changer de langue doit fonctionner comme sur le site actuel

### 6. VALIDATION DES FORMULAIRES
- Validation côté serveur (Laravel)
- Validation côté client (JavaScript existant)
- Messages d'erreur clairs et en français/anglais

## MIGRATIONS ET SEEDERS

### Migrations à créer :
1. `create_suites_table.php`
2. `create_reservations_table.php`
3. `create_users_table.php` (avec colonne role)
4. `create_settings_table.php`

### Seeders à créer :
1. `SuiteSeeder.php` - **PRÉ-REMPLIR TOUTES LES SUITES** avec toutes leurs informations (textes, images, prix)
2. `AdminUserSeeder.php` - Créer un utilisateur admin par défaut
3. `SettingsSeeder.php` - Paramètres par défaut

## ROUTES À CRÉER

### Routes publiques (web.php) :
```php
Route::get('/', [HomeController::class, 'index'])->name('home');
// Route pour afficher toutes les suites - DOIT afficher les suites de la même manière que page_suite.html
Route::get('/suites', [SuiteController::class, 'index'])->name('suites.index');
// Route pour afficher une suite individuelle - DOIT afficher comme suite_junior.html, suite_senior.html, etc.
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

### Routes admin (Gérées par Filament) :

**IMPORTANT :** Avec Filament, la plupart des routes admin sont gérées automatiquement par les Resources.

**Routes personnalisées (si nécessaire) :**
```php
// Page de connexion personnalisée (avec vidéo et glassmorphism)
Route::get('/admin/login', [Auth\LoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [Auth\LoginController::class, 'login']);
Route::post('/admin/logout', [Auth\LoginController::class, 'logout'])->name('admin.logout');

// Actions personnalisées pour les réservations (dans Filament Resource)
// Ces actions seront définies dans ReservationResource avec Filament Actions
```

**Configuration Filament :**
- Créer les Resources Filament : `SuiteResource`, `ReservationResource`, `UserResource`
- Configurer les permissions par rôle dans Filament
- Personnaliser le thème Filament avec les couleurs du projet
- Créer des pages personnalisées pour les statistiques et paramètres

## INSTRUCTIONS FINALES

1. **SÉPARATION FRONT-END / BACK-OFFICE** :
   - **Front-end public** : Utiliser **Blade** pour toutes les pages publiques - **PRÉSERVER 100% DU DESIGN EXISTANT**
   - **Back-office** : Utiliser **Filament PHP** pour toute l'administration - **ADAPTER LE DESIGN FILAMENT AU PROJET**
   - **Page de connexion** : Design personnalisé avec vidéo en fond et glassmorphism (hors Filament)

2. **PRÉSERVER 100% DU DESIGN FRONT-END** : Le site public doit être visuellement identique au site actuel

3. **AFFICHAGE DES SUITES IDENTIQUE** : La page `/suites` DOIT afficher les suites **EXACTEMENT DE LA MÊME MANIÈRE** que `page_suite.html` actuel. Même structure HTML, mêmes classes CSS, mêmes icônes, même disposition, même responsive. Comparer visuellement pour validation.

4. **PAGE DE CONNEXION ADMIN** : 
   - Vidéo en arrière-plan (autoplay, muted, loop)
   - Formulaire avec effet glassmorphism (backdrop-filter: blur, background semi-transparent)
   - Design élégant et moderne
   - Responsive

5. **FILAMENT POUR BACK-OFFICE** :
   - Installer et configurer Filament PHP 3.x
   - Adapter le thème Filament aux couleurs du projet (`#B78F62`, `#BB996B`)
   - Créer les Resources Filament pour Suites, Réservations, Users
   - Créer les pages personnalisées pour Statistiques et Paramètres
   - Utiliser Chart.js ou ApexCharts **UNIQUEMENT** dans la page Statistiques Filament

6. **PRÉSERVER TOUTES LES FONCTIONNALITÉS FRONT-END** : Tous les JavaScript, animations, interactions du front-end public doivent fonctionner

7. **PRÉ-REMPLIR LA BASE DE DONNÉES** : Toutes les suites doivent être déjà dans la base de données avec leurs informations complètes (textes, images, prix, icônes)

8. **SÉCURITÉ MAXIMALE** : Protection CSRF, XSS, validation stricte

9. **CODE PROPRE** : Suivre les conventions Laravel, PSR-12, commenter le code

10. **DOCUMENTATION** : Créer un README.md avec les instructions d'installation et d'utilisation

## LIVRABLES ATTENDUS

1. Projet Laravel 12 complet et fonctionnel
2. Base de données avec toutes les suites pré-remplies
3. Back-office complet avec toutes les fonctionnalités
4. Documentation d'installation (README.md)
5. Documentation de l'API admin (si nécessaire)
6. Fichier .env.example avec toutes les variables nécessaires

---

**IMPORTANT :** Ce prompt doit être suivi à la lettre. Tous les fichiers front-end doivent être intégrés, toutes les suites doivent être pré-remplies dans la base de données, et le back-office doit être complet avec toutes les fonctionnalités demandées.


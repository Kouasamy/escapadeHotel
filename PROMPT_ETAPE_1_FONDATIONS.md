# PROMPT ÉTAPE 1 : FONDATIONS ET BASE DE DONNÉES
## Génération recommandée : 4x

## CONTEXTE ET OBJECTIF

Vous devez créer la **fondation** d'un projet Laravel 12 pour le site L'Escapade Hotel. Cette première étape consiste à :
1. Installer et configurer Laravel 12
2. Créer la structure de base de données (migrations)
3. Créer les modèles
4. Pré-remplir la base de données avec toutes les suites et leurs informations complètes (seeders)
5. Installer et configurer Filament PHP 3.x pour le back-office
6. Créer la page de connexion admin avec vidéo en fond et effet glassmorphism

**IMPORTANT :** Cette étape ne concerne PAS encore l'intégration du front-end Blade. Cela viendra dans l'étape 2.

## EXIGENCES CRITIQUES

### 1. INSTALLATION LARAVEL 12

- Créer un nouveau projet Laravel 12
- PHP 8.2 minimum
- MySQL/MariaDB ou PostgreSQL
- Configurer `.env` avec les informations de base de données
- Installer toutes les dépendances Composer et NPM

### 2. STRUCTURE DE BASE DE DONNÉES

#### Migration : `create_suites_table.php`

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
- hero_background_image (string) - Image de fond pour la section hero
- is_active (boolean, default: true)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Migration : `create_reservations_table.php`

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

#### Migration : `create_users_table.php` (avec colonne role)

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

#### Migration : `create_settings_table.php`

```sql
- id
- key (string, unique)
- value (text)
- created_at
- updated_at
```

### 3. MODÈLES LARAVEL

Créer les modèles suivants avec leurs relations :

**`app/Models/Suite.php`**
- Relations : `hasMany(Reservation::class)`
- Accessors/Mutators pour `features` et `images` (JSON)
- Scopes : `active()`, `byType()`

**`app/Models/Reservation.php`**
- Relations : `belongsTo(Suite::class)`
- Accessors pour le statut (badges, labels)
- Scopes : `pending()`, `confirmed()`, `cancelled()`, etc.

**`app/Models/User.php`**
- Étendre le modèle User Laravel
- Ajouter les méthodes : `isAdmin()`, `isSubAdmin()`
- Relations si nécessaire

**`app/Models/Setting.php`**
- Méthodes statiques : `get($key)`, `set($key, $value)`

### 4. SEEDER : TOUTES LES SUITES PRÉ-REMPLIES

**CRÉER `database/seeders/SuiteSeeder.php`** qui insère **TOUTES** les suites avec **TOUTES** leurs informations, images et icônes :

#### Suite Junior

```php
[
    'name' => 'Suite Junior',
    'slug' => 'suite-junior',
    'type' => 'junior',
    'description' => 'Avec ses 70 m², la Suite Junior allie design contemporain, matériaux naturels et inspiration locale. Lumineuse et raffinée, elle révèle un luxe authentique dans sa plus grande simplicité.',
    'capacity_adults' => 2,
    'capacity_children' => 2,
    'area' => 70.00,
    'weekly_rate' => 200000,
    'weekend_rate' => 250000,
    'features' => json_encode(['Terrasse', 'TV']),
    'main_image' => 'img/4.jpg',
    'hero_background_image' => 'img/4.jpg',
    'images' => json_encode([
        'video/CHAMBRE 2 NEW VERSION.mp4',
        'images/DSC06627.jpg'
    ]),
    'is_active' => true,
]
```

**ICÔNES ET IMAGES POUR SUITE JUNIOR :**
- Image principale : `img/4.jpg`
- Images galerie : `video/CHAMBRE 2 NEW VERSION.mp4`, `images/DSC06627.jpg`
- Image hero : `img/4.jpg`
- Icône superficie : `images/510_20.svg`
- Icône terrasse : `images/iconeTerrasse.jpg`
- Icône TV : `images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png`
- Icônes bullet points : `images/272_1778.svg`, `images/272_1776.svg`, `images/279_1796.svg`
- Éléments décoratifs : `media/510_6.svg`, `media/510_8.svg`
- Indicateurs galerie : `images/Group 208.png`
- Séparateur : `images/324_579.svg`
- Icône area carte suite : `images/324_691.svg`

#### Suite Senior

```php
[
    'name' => 'Suite Senior',
    'slug' => 'suite-senior',
    'type' => 'senior',
    'description' => 'D\'une superficie de 85,91 m2, la Suite Senior offre de grands volumes rappelant le confort d\'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant.',
    'capacity_adults' => 2,
    'capacity_children' => 2,
    'area' => 85.91,
    'weekly_rate' => 280000,
    'weekend_rate' => 350000,
    'features' => json_encode(['Terrasse', 'TV']),
    'main_image' => 'images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg',
    'hero_background_image' => 'images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg',
    'images' => json_encode([
        'images/4e8bd77d88ebb1c9f445970808bcf56230320041.jpg',
        'images/IMG_5871.jpg',
        'images/IMG_1415.jpg'
    ]),
    'is_active' => true,
]
```

**ICÔNES ET IMAGES POUR SUITE SENIOR :**
- Image principale : `images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg`
- Images galerie : `images/4e8bd77d88ebb1c9f445970808bcf56230320041.jpg`, `images/IMG_5871.jpg`, `images/IMG_1415.jpg`
- Image hero : `images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg`
- Icône superficie : `images/510_20.svg`
- Icône terrasse : `images/iconeTerrasse.jpg`
- Icône TV : `images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png`
- Icônes bullet points : `images/272_1778.svg`, `images/272_1776.svg`, `images/279_1796.svg`
- Éléments décoratifs : `media/510_6.svg`, `media/510_8.svg`
- Indicateurs galerie : `images/Group 208.png`
- Séparateur : `images/324_579.svg`
- Icônes area merged carte suite : `images/324_583.svg`, `images/324_587.svg`, `images/324_589.svg`, `images/324_591.svg`

#### Suite Senior VIP (avec Piscine)

```php
[
    'name' => 'Suites Seniors avec Piscines',
    'slug' => 'suite-senior-vip',
    'type' => 'senior_vip',
    'description' => 'D\'une superficie de 85,91 m2, les suites senior avec piscines offrent de grands volumes rappelant le confort d\'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant. Ces suites offrent un confort exceptionnel pour un séjour inoubliable.',
    'capacity_adults' => 2,
    'capacity_children' => 2,
    'area' => 85.91,
    'weekly_rate' => 320000,
    'weekend_rate' => 400000,
    'features' => json_encode(['Piscine', 'TV', 'Terrasse']),
    'main_image' => 'img/13.jpg',
    'hero_background_image' => 'img/5.jpg',
    'images' => json_encode([
        'img/14.jpg',
        'images/IMG_5871.jpg',
        'img/5.jpg'
    ]),
    'is_active' => true,
]
```

**ICÔNES ET IMAGES POUR SUITE SENIOR VIP :**
- Image principale : `img/13.jpg`
- Images galerie : `img/14.jpg`, `images/IMG_5871.jpg`, `img/5.jpg`
- Image hero : `img/5.jpg`
- Icône superficie : `images/510_20.svg`
- Icône piscine : `images/272_1551.svg`
- Icône TV : `images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png`
- Icônes bullet points : `images/272_1778.svg`, `images/272_1776.svg`, `images/279_1796.svg`
- Éléments décoratifs : `media/510_6.svg`, `media/510_8.svg`
- Indicateurs galerie : `images/Group 208.png`
- Séparateur : `images/324_579.svg`
- Icônes area merged carte suite : `images/324_616.svg`, `images/324_621.svg`, `images/324_623.svg`, `images/324_625.svg`
- Icône piscine carte suite : `images/324_620.svg`

#### Villa Familiale avec Piscine Privée

```php
[
    'name' => 'Villa Familiale avec Piscine Privée',
    'slug' => 'villa-familiale',
    'type' => 'villa_familiale',
    'description' => 'Ouverte sur le jardin verdoyant de L\'Escapade, la Villa Familiale est un véritable refuge d\'exception. Dotée de sa piscine privée et d\'une large terrasse bordée de cocotiers, elle offre une vue apaisante sur les espaces verts de l\'hôtel. Avec ses deux chambres, son salon élégant et ses volumes généreux, cette suite est pensée pour accueillir familles et proches dans un confort absolu. Chaque détail reflète l\'hospitalité à l\'ivoirienne.',
    'capacity_adults' => 4,
    'capacity_children' => 4,
    'area' => 170.00,
    'weekly_rate' => 520000,
    'weekend_rate' => 650000,
    'features' => json_encode(['Piscine privée', 'Terrasse', 'TV', '2 Chambres', 'Salon']),
    'main_image' => 'images/DJI_0956.jpg',
    'hero_background_image' => 'images/DJI_0956.jpg',
    'images' => json_encode([
        'images/IMG_1415.jpg',
        'images/ImageVilla.jpg',
        'images/IMG_1341.jpg',
        'images/IMG_6280.jpg',
        'img/30.jpg'
    ]),
    'is_active' => true,
]
```

**ICÔNES ET IMAGES POUR VILLA FAMILIALE :**
- Image principale : `images/DJI_0956.jpg`
- Images galerie : `images/IMG_1415.jpg`, `images/ImageVilla.jpg`, `images/IMG_1341.jpg`, `images/IMG_6280.jpg`, `img/30.jpg`
- Image hero : `images/DJI_0956.jpg`
- Icône superficie : `images/510_20.svg`
- Icône piscine : `images/272_1551.svg`
- Icône TV : `images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png`
- Icônes bullet points : `images/272_1778.svg`, `images/272_1776.svg`, `images/279_1796.svg`
- Éléments décoratifs : `media/510_6.svg`, `media/510_8.svg`
- Indicateurs galerie : `images/Group 208.png`
- Séparateur : `images/324_579.svg`
- Icône area carte suite : `images/324_692.svg`
- Icône piscine carte suite : `images/324_618.svg`

**ICÔNES COMMUNES (utilisées sur toutes les pages) :**
- `images/568_819.png` (Favicon)
- `images/568_819.svg` (Logo L'Escapade - header)
- `images/568_939.svg` (Icône menu burger)
- `images/568_837.svg` (Séparateur langue FR/EN)
- `images/568_838.svg` (Bouton "Réserver une suite" - background)
- `images/568_833.svg` (Bouton "Réserver un espace" - background)
- `images/568_840.svg` (Bouton "Nous Contactez" - background)
- `images/527e11cd0fcc42350d0710d865057dc9385bcebf.png` (Logo footer)
- `images/427_66.svg` (Background titre "MENU" footer)
- `images/427_67.svg` (Background titre "CONTACT" footer)
- `images/427_62.svg` (Icône téléphone footer)
- `images/427_56.svg` (Icône email footer)
- `images/427_50.svg` (Icône localisation footer)
- `images/Vector.png` (Séparateur footer)
- `images/WaveLogo.png` (Logo Wave paiement)
- `images/logoOrange.png` (Logo Orange Money paiement)
- `Menu/images/542_446.svg` (Icône fermeture menu overlay)
- `Menu/images/542_445.svg` (Séparateur langue menu overlay)
- `Menu/images/542_454.svg` (Partie 1 logo menu overlay)
- `Menu/images/542_453.svg` (Partie 2 logo menu overlay)
- `Menu/images/542_457.svg` (Partie 3 logo menu overlay)
- `Menu/images/542_575.svg` (Ligne décorative nav menu)
- `Menu/images/542_560.svg` (Background nav "CHAMBRES & SUITES")
- `Menu/images/542_467.svg` (Background nav "LE RESTAURANT")
- `Menu/images/542_471.svg` (Background nav "LE LOUNGE")
- `Menu/images/542_564.svg` (Background nav "ÉVÈNEMENTIEL")
- `Menu/images/542_567.svg` (Background nav "A PROPOS")
- `Menu/images/542_461.svg` (Décoratif coin supérieur menu)
- `Menu/images/542_458.svg` (Décoratif coin inférieur menu)
- `Menu/images/IMG_1341.jpg` (Image par défaut menu overlay)

**IMPORTANT :** Le Seeder doit insérer **TOUTES** ces suites avec **TOUTES** leurs informations, y compris tous les chemins d'images et icônes mentionnés ci-dessus.

### 5. SEEDER : ADMIN PAR DÉFAUT

**CRÉER `database/seeders/AdminUserSeeder.php`** qui crée un utilisateur admin par défaut :

```php
User::create([
    'name' => 'Administrateur',
    'email' => 'admin@escapade.ci',
    'password' => Hash::make('password'), // À CHANGER EN PRODUCTION
    'role' => 'admin',
    'is_active' => true,
]);
```

### 6. SEEDER : PARAMÈTRES PAR DÉFAUT

**CRÉER `database/seeders/SettingsSeeder.php`** qui crée les paramètres par défaut :

```php
Setting::create(['key' => 'hotel_name', 'value' => 'L\'Escapade Hotel']);
Setting::create(['key' => 'hotel_email', 'value' => 'contact@escapade.ci']);
Setting::create(['key' => 'hotel_phone', 'value' => '+225 XX XX XX XX XX']);
Setting::create(['key' => 'hotel_address', 'value' => 'Adresse de l\'hôtel']);
// Ajouter d'autres paramètres selon les besoins
```

### 7. INSTALLATION ET CONFIGURATION FILAMENT PHP 3.x

**Installation :**
```bash
composer require filament/filament:"^3.0"
php artisan filament:install --panels
```

**Configuration du thème Filament :**

Créer un `PanelProvider` personnalisé ou modifier le `AdminPanelProvider` pour adapter Filament au projet :

```php
use Filament\Support\Colors\Color;

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
- Adapter les composants Filament pour correspondre au style du projet
- Utiliser les hooks Filament pour personnaliser les vues si nécessaire

### 8. PAGE DE CONNEXION ADMIN - DESIGN SPÉCIAL

**CRÉER `resources/views/auth/login.blade.php`** avec un design unique :

**Exigences :**

1. **Vidéo en arrière-plan :**
   - Vidéo en plein écran en arrière-plan (autoplay, muted, loop, playsinline)
   - Utiliser la vidéo : `video/PISCINE.mp4` (ou une vidéo similaire de l'hôtel)
   - Overlay sombre (opacité ~0.6) pour améliorer la lisibilité du formulaire
   - La vidéo doit être optimisée pour le web (format MP4, compression)

2. **Formulaire avec effet Glassmorphism :**
   - Formulaire centré verticalement et horizontalement
   - **Effet glassmorphism** : 
     - Background : `rgba(255, 255, 255, 0.15)` ou similaire
     - Backdrop-filter : `blur(15px)`
     - Border : `1px solid rgba(255, 255, 255, 0.3)`
     - Border-radius : `24px`
     - Box-shadow : ombre douce pour effet de profondeur
   - Padding généreux pour le formulaire
   - Champs de formulaire avec background semi-transparent
   - Bouton de connexion avec style élégant (couleurs du projet : `#B78F62` ou similaire)

3. **Éléments visuels :**
   - Logo L'Escapade centré en haut du formulaire
   - Titre "Connexion" ou "Admin" stylisé
   - Messages d'erreur avec style cohérent
   - Responsive : sur mobile, le formulaire reste lisible et bien positionné

**Structure HTML/CSS :**

```html
<div class="login-container">
  <video autoplay muted loop playsinline preload="auto" class="login-background-video">
    <source src="{{ asset('video/PISCINE.mp4') }}" type="video/mp4">
  </video>
  <div class="login-overlay"></div>
  <div class="login-form-wrapper">
    <form class="login-form glassmorphism" method="POST" action="{{ route('admin.login') }}">
      @csrf
      <div class="login-logo">
        <img src="{{ asset('images/568_819.svg') }}" alt="L'Escapade">
      </div>
      <h1 class="login-title">Connexion</h1>
      <!-- Champs email, password, bouton -->
    </form>
  </div>
</div>
```

**CSS Glassmorphism :**

```css
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
  z-index: 1;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.login-form-wrapper {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
}

.login-form input {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  backdrop-filter: blur(10px);
}

.login-form input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.login-form button {
  background: #B78F62;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.login-form button:hover {
  background: #BB996B;
}

@media (max-width: 768px) {
  .glassmorphism {
    padding: 2rem;
    max-width: 90%;
  }
}
```

**Route de connexion :**

Créer les routes dans `routes/web.php` :

```php
Route::get('/admin/login', [Auth\LoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [Auth\LoginController::class, 'login']);
Route::post('/admin/logout', [Auth\LoginController::class, 'logout'])->name('admin.logout');
```

**Contrôleur de connexion :**

Créer `app/Http/Controllers/Auth/LoginController.php` avec la logique d'authentification.

### 9. DÉPENDANCES REQUISES

**Packages Composer à installer :**

```json
{
  "require": {
    "laravel/framework": "^12.0",
    "filament/filament": "^3.0",
    "barryvdh/laravel-dompdf": "^3.0",
    "intervention/image": "^3.0"
  }
}
```

**Installation :**
```bash
composer require filament/filament:"^3.0"
composer require barryvdh/laravel-dompdf
composer require intervention/image
```

### 10. MIGRATIONS ET SEEDERS - EXÉCUTION

**Créer toutes les migrations :**
```bash
php artisan make:migration create_suites_table
php artisan make:migration create_reservations_table
php artisan make:migration create_settings_table
php artisan make:migration add_role_to_users_table
```

**Créer tous les seeders :**
```bash
php artisan make:seeder SuiteSeeder
php artisan make:seeder AdminUserSeeder
php artisan make:seeder SettingsSeeder
```

**Exécuter les migrations et seeders :**
```bash
php artisan migrate:fresh --seed
```

**OU exécuter individuellement :**
```bash
php artisan db:seed --class=SuiteSeeder
php artisan db:seed --class=AdminUserSeeder
php artisan db:seed --class=SettingsSeeder
```

## INSTRUCTIONS FINALES

1. **CRÉER TOUTE LA STRUCTURE DE BASE** : Migrations, modèles, seeders
2. **PRÉ-REMPLIR LA BASE DE DONNÉES** : Toutes les suites doivent être insérées avec TOUTES leurs informations (textes, images, prix, icônes)
3. **INSTALLER FILAMENT** : Filament PHP 3.x avec thème personnalisé
4. **CRÉER LA PAGE DE CONNEXION** : Design avec vidéo et glassmorphism
5. **TESTER** : Vérifier que toutes les migrations fonctionnent, que les seeders insèrent bien les données, et que la page de connexion s'affiche correctement

## LIVRABLES ATTENDUS

1. Projet Laravel 12 avec structure de base de données complète
2. Toutes les migrations créées et fonctionnelles
3. Tous les modèles avec leurs relations
4. Tous les seeders avec toutes les suites pré-remplies
5. Filament PHP 3.x installé et configuré avec thème personnalisé
6. Page de connexion admin avec vidéo et glassmorphism fonctionnelle
7. Base de données pré-remplie avec toutes les suites

---

**IMPORTANT :** Cette étape ne concerne QUE la fondation et la base de données. L'intégration du front-end Blade et la création des Resources Filament viendront dans l'ÉTAPE 2.


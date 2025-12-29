# Guide de Test - L'Escapade Hotel

## 🔐 Accès au Dashboard Admin

### URL du Dashboard
```
http://127.0.0.1:8000/admin
```

### Identifiants par défaut

#### Administrateur (Admin)
- **Email** : `admin@escapade.ci`
- **Mot de passe** : `password`
- **Rôle** : Admin (accès complet)

#### Sous-Administrateur (Sub-admin)
Pour créer un sous-admin :
1. Connectez-vous en tant qu'admin
2. Allez dans **Utilisateurs** → **Créer**
3. Remplissez les informations :
   - Nom : Votre nom
   - Email : votre-email@example.com
   - Mot de passe : votre mot de passe
   - Rôle : **Sub-admin**
   - Actif : ✅ Oui
4. Sauvegardez

**Note** : Les sous-admins ont un accès limité (pas d'accès à la gestion des utilisateurs ni aux paramètres).

---

## 🧪 Tests à Effectuer

### 1. Test du Backend - Ajout d'une Suite

#### Étapes :
1. Connectez-vous au dashboard : `http://127.0.0.1:8000/admin`
2. Dans le menu de gauche, cliquez sur **Suites**
3. Cliquez sur **Nouveau** (bouton en haut à droite)
4. Remplissez le formulaire :
   - **Nom** : Suite Deluxe (exemple)
   - **Slug** : Généré automatiquement depuis le nom
   - **Type** : Choisissez parmi :
     - Suite Junior
     - Suite Senior
     - Suite Senior VIP
     - Villa Familiale
   - **Description** : Description détaillée de la suite
   - **Capacité adultes** : 2
   - **Capacité enfants** : 2
   - **Superficie** : 50.00 (en m²)
   - **Tarif semaine** : 250000 (en FCFA)
   - **Tarif week-end** : 300000 (en FCFA)
   - **Features** : Ajoutez des features (ex: Terrasse, Piscine, TV)
   - **Image principale** : Uploadez une image
   - **Image hero** : Uploadez une image pour le hero
   - **Galerie d'images** : Uploadez plusieurs images
   - **Actif** : ✅ Oui (pour que la suite soit visible sur le site)
5. Cliquez sur **Créer**

#### Vérification :
- ✅ La suite apparaît dans la liste des suites
- ✅ La suite apparaît sur `http://127.0.0.1:8000/page_suite.html`
- ✅ La suite apparaît sur `http://127.0.0.1:8000/index.html` (galerie horizontale)
- ✅ La page individuelle est accessible : `http://127.0.0.1:8000/suite/suite-deluxe.html`

---

### 2. Test du Backend - Ajout d'un Événement

#### Étapes :
1. Connectez-vous au dashboard : `http://127.0.0.1:8000/admin`
2. Dans le menu de gauche, cliquez sur **Événements**
3. Cliquez sur **Nouveau**
4. Remplissez le formulaire :
   - **Titre** : Nouvel Événement (exemple)
   - **Slug** : Généré automatiquement
   - **Date de l'événement** : Sélectionnez une date
   - **Lieu** : L'Escapade Hotel
   - **Texte de date** : Édition du 15 janvier 2026 (exemple)
   - **Résumé court** : Description courte
   - **Description** : Description complète
   - **Image** : Uploadez une image
   - **Actif** : ✅ Oui
5. Cliquez sur **Créer**

#### Vérification :
- ✅ L'événement apparaît dans la liste des événements
- ✅ L'événement apparaît sur `http://127.0.0.1:8000/page_evenementiel.html`

---

### 3. Test du Processus de Réservation

#### Étape 1 : Sélection des dates et invités
1. Allez sur `http://127.0.0.1:8000/index.html`
2. Remplissez le formulaire de réservation :
   - **Date d'arrivée** : Sélectionnez une date future
   - **Date de départ** : Sélectionnez une date après l'arrivée
   - **Nombre d'invités** : 2 (ou plus)
3. Cliquez sur **Trouver une suite**

#### Étape 2 : Sélection de la suite
1. Vous êtes redirigé vers `http://127.0.0.1:8000/reservation1.html`
2. Vérifiez que le résumé affiche :
   - Les dates sélectionnées
   - Le nombre de nuits
   - Le nombre d'invités
3. Choisissez une suite (ex: Suite Junior)
4. Cliquez sur **Sélectionner**
5. Ajustez la quantité si nécessaire
6. Cliquez sur **Suivant**

#### Étape 3 : Confirmation des détails
1. Vous êtes redirigé vers `http://127.0.0.1:8000/reservation3.html`
2. Vérifiez que les informations affichées sont correctes :
   - Image de la suite
   - Titre de la suite
   - Quantité
   - Dates d'arrivée et de départ
   - Nombre d'invités
   - Prix total
3. Cliquez sur **Suivant**

#### Étape 4 : Informations client
1. Vous êtes redirigé vers `http://127.0.0.1:8000/reservation4.html`
2. Remplissez le formulaire :
   - **Prénom** : Jean
   - **Nom** : Dupont
   - **Email** : jean.dupont@example.com
   - **Téléphone** : +225 07 12 34 56 78
   - **Nationalité** : Ivoirienne (optionnel)
   - **Message** : Message optionnel
3. Cliquez sur **Suivant**

#### Étape 5 : Confirmation finale
1. Vous êtes redirigé vers `http://127.0.0.1:8000/reservation5.html`
2. Vérifiez que la page de confirmation s'affiche correctement

#### Vérification dans le Dashboard :
1. Connectez-vous au dashboard : `http://127.0.0.1:8000/admin`
2. Allez dans **Réservations**
3. Vérifiez que la nouvelle réservation apparaît dans la liste
4. Cliquez sur la réservation pour voir les détails

---

### 4. Test des Permissions (Admin vs Sub-admin)

#### Test Admin :
1. Connectez-vous avec `admin@escapade.ci` / `password`
2. Vérifiez que vous avez accès à :
   - ✅ **Suites** (CRUD complet)
   - ✅ **Réservations** (CRUD complet)
   - ✅ **Événements** (CRUD complet)
   - ✅ **Utilisateurs** (CRUD complet - Admin uniquement)
   - ✅ **Statistiques** (Admin uniquement)
   - ✅ **Paramètres** (Admin uniquement)

#### Test Sub-admin :
1. Créez un utilisateur avec le rôle **Sub-admin** (voir section Identifiants)
2. Connectez-vous avec cet utilisateur
3. Vérifiez que vous avez accès à :
   - ✅ **Suites** (CRUD complet)
   - ✅ **Réservations** (CRUD complet)
   - ✅ **Événements** (CRUD complet)
   - ❌ **Utilisateurs** (Non accessible)
   - ❌ **Statistiques** (Non accessible)
   - ❌ **Paramètres** (Non accessible)

---

## 🔗 Liens Utiles

### Front-end (Pages Publiques)
- **Page d'accueil** : `http://127.0.0.1:8000/index.html`
- **Suites** : `http://127.0.0.1:8000/page_suite.html`
- **Restaurant** : `http://127.0.0.1:8000/restaurant.html`
- **Lounge** : `http://127.0.0.1:8000/lounge.html`
- **Événements** : `http://127.0.0.1:8000/page_evenementiel.html`
- **À propos** : `http://127.0.0.1:8000/apropos.html`

### Backend (Dashboard Admin)
- **Dashboard Admin** : `http://127.0.0.1:8000/admin`
- **Login Admin** : `http://127.0.0.1:8000/admin/login`

### API (Pour développement)
- **Liste des suites** : `http://127.0.0.1:8000/api/suites`
- **Détails d'une suite** : `http://127.0.0.1:8000/api/suite/{slug}`
- **Liste des événements** : `http://127.0.0.1:8000/api/events`
- **Token CSRF** : `http://127.0.0.1:8000/api/csrf-token`

---

## 🚀 Commandes Utiles

### Démarrer le serveur Laravel
```bash
php artisan serve
```

### Réinitialiser la base de données avec les données de test
```bash
php artisan migrate:fresh --seed
```

### Créer un nouvel utilisateur admin via tinker
```bash
php artisan tinker
```
Puis dans tinker :
```php
$user = \App\Models\User::create([
    'name' => 'Nom Admin',
    'email' => 'admin2@escapade.ci',
    'password' => \Hash::make('password'),
    'role' => 'admin',
    'is_active' => true,
]);
```

### Voir les routes disponibles
```bash
php artisan route:list
```

### Vider le cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

---

## ⚠️ Notes Importantes

1. **Sécurité** : Changez le mot de passe par défaut de l'admin en production !
2. **Images** : Assurez-vous que les images sont dans les dossiers `public/images/` ou `public/img/`
3. **Vidéos** : Les vidéos doivent être dans `public/video/`
4. **Activation** : N'oubliez pas de cocher "Actif" pour que les suites/événements soient visibles sur le site
5. **Slug** : Le slug est généré automatiquement depuis le nom, mais vous pouvez le modifier

---

## 🐛 Dépannage

### Problème : Impossible de se connecter au dashboard
- Vérifiez que la base de données est bien configurée
- Exécutez `php artisan migrate:fresh --seed` pour créer les utilisateurs

### Problème : Les suites/événements n'apparaissent pas sur le site
- Vérifiez que "Actif" est coché dans le dashboard
- Videz le cache : `php artisan cache:clear`
- Vérifiez la console du navigateur pour les erreurs JavaScript

### Problème : Erreur 404 sur les pages individuelles de suites
- Vérifiez que le slug de la suite est correct
- Vérifiez que la suite est active
- Vérifiez que le fichier `public/suite_detail.html` existe

---

Bon test ! 🎉


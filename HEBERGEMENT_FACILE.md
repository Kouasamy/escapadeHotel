# 🚀 Hébergement Facile - L'Escapade Hotel

## ✅ MÉTHODE LA PLUS SIMPLE (Recommandée)

### Option 1 : Ploi.io (LE PLUS FACILE) ⭐

**Pourquoi Ploi ?**
- Interface graphique très simple
- Configuration automatique
- SSL gratuit automatique
- Prix : **10€/mois** (Ploi) + **5-6€/mois** (VPS)
- Total : ~15€/mois

**Étapes :**

1. **Créer un compte Ploi** : https://ploi.io
   - Inscription gratuite (14 jours d'essai)
   
2. **Acheter un VPS DigitalOcean via Ploi**
   - Dans Ploi, cliquez sur "Servers" → "New Server"
   - Choisissez DigitalOcean
   - Plan recommandé : **Basic (1GB RAM)** = 5$/mois
   - Région : Europe (Frankfurt ou Amsterdam)
   - Ploi configure tout automatiquement !

3. **Créer un site**
   - Dans Ploi, cliquez sur "Sites" → "Add Site"
   - Choisissez votre serveur
   - Domaine : votre-domaine.com (ou sans domaine pour tester)
   - PHP Version : 8.2
   - Cliquez sur "Create Site"

4. **Connecter votre code (3 méthodes) :**

   **Méthode A - Git (Recommandée)** :
   - Dans Ploi, allez sur votre site → "Git"
   - Connectez votre repository GitHub/GitLab
   - Branch : `main` ou `master`
   - Build Command : `composer install --optimize-autoloader --no-dev && php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache`
   - Activer "Auto Deployment"
   
   **Méthode B - Upload direct** :
   - Dans Ploi, allez sur votre site → "Files"
   - Utilisez l'éditeur de fichiers pour uploader votre code
   - Ou utilisez SFTP (info dans "SFTP" de Ploi)

   **Méthode C - Git Clone** :
   - Dans Ploi → "SSH Terminal"
   - Tapez : `cd /home/ploi/votre-domaine.com`
   - `git clone https://github.com/votre-repo/escapade-hotel.git .`
   - `composer install --optimize-autoloader --no-dev`
   - `php artisan migrate --force`
   - `php artisan config:cache`

5. **Configurer la base de données**
   - Dans Ploi → votre site → "Database"
   - Cliquez sur "Create Database"
   - Notez le nom, utilisateur et mot de passe
   - Dans Ploi → "Files" → éditez `.env`
   - Mettez les infos de la base de données :
     ```
     DB_DATABASE=nom_de_la_base
     DB_USERNAME=utilisateur
     DB_PASSWORD=mot_de_passe
     APP_ENV=production
     APP_DEBUG=false
     ```

6. **Déployer**
   - Si Git : Déployez automatiquement depuis Ploi
   - Sinon : Dans "SSH Terminal" :
     ```bash
     cd /home/ploi/votre-domaine.com
     php artisan migrate --force
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     ```

7. **SSL gratuit**
   - Dans Ploi → votre site → "SSL"
   - Cliquez sur "Let's Encrypt"
   - Entrez votre domaine
   - Cliquez sur "Install Certificate"
   - Ploi configure tout automatiquement !

**C'est tout ! Votre site est en ligne ! 🎉**

---

## Option 2 : Laravel Forge (Alternative)

**Pourquoi Forge ?**
- Créé par l'équipe Laravel
- Très populaire
- Prix : **12$/mois** + VPS
- Interface similaire à Ploi

**Étapes similaires à Ploi :**

1. Créer un compte : https://forge.laravel.com
2. Connecter DigitalOcean (ou autre)
3. Créer un serveur
4. Créer un site
5. Connecter votre Git
6. Configurer la base de données
7. Déployer

---

## Option 3 : Hébergement mutualisé (Le moins cher mais moins flexible)

**Pour qui ?**
- Budget très serré (3-10€/mois)
- Pas besoin de beaucoup de contrôle

**Hébergeurs recommandés :**
- **Hostinger** : https://www.hostinger.fr (3-5€/mois)
- **O2Switch** : https://www.o2switch.fr (7€/mois, excellent support)
- **OVH** : https://www.ovh.com (offres à partir de 4€/mois)

**Important :** Vérifiez qu'ils supportent :
- ✅ PHP 8.2+
- ✅ Composer
- ✅ MySQL/MariaDB
- ✅ .htaccess (Apache) ou Nginx
- ✅ SSL gratuit

**Installation sur hébergement mutualisé :**

1. Téléchargez votre projet (zip)
2. Upload via FTP/SFTP dans le dossier `public_html`
3. Créez une base de données via le panneau d'administration
4. Configurez `.env` avec les infos de la base
5. Via SSH (si disponible) ou via le panneau :
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan migrate --force
   php artisan config:cache
   ```

---

## 📋 Checklist avant déploiement

- [ ] `.env` configuré avec :
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `APP_URL=https://votre-domaine.com`
  - Infos de base de données correctes
- [ ] Code committé sur Git (si utilisation de Git)
- [ ] Base de données créée
- [ ] SSL/HTTPS configuré
- [ ] Tests locaux effectués

---

## 🎯 Recommandation finale

**Pour la simplicité maximale : Utilisez Ploi.io**

**Pourquoi ?**
1. ✅ Interface la plus simple
2. ✅ Configuration automatique (PHP, Nginx, SSL)
3. ✅ Support excellent
4. ✅ Déploiements en un clic
5. ✅ Pas besoin de connaissances serveur

**Budget mensuel :**
- Ploi : 10€/mois
- VPS DigitalOcean Basic : 5€/mois
- **Total : 15€/mois**

**Temps d'installation : 30-45 minutes**

---

## 🆘 Besoin d'aide ?

Si vous avez des questions pendant l'installation, les guides détaillés sont dans :
- `GUIDE_HEBERGEMENT.md` (méthode manuelle détaillée)
- `OPTIMISATIONS_PERFORMANCE.md` (optimisations à appliquer)

---

## 🔗 Liens utiles

- **Ploi** : https://ploi.io
- **Laravel Forge** : https://forge.laravel.com
- **DigitalOcean** : https://www.digitalocean.com
- **Let's Encrypt** : https://letsencrypt.org (SSL gratuit)


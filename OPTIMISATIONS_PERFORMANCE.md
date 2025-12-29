# Optimisations de Performance - Guide de Déploiement

## ✅ Optimisations déjà implémentées

### 1. Cache Laravel
- ✅ Cache des widgets du dashboard (5 minutes)
- ✅ Cache des statistiques
- ✅ Eager loading pour éviter les requêtes N+1
- ✅ Invalidation automatique du cache lors des modifications

### 2. Optimisations Front-end
- ✅ Lazy loading des images
- ✅ Defer sur tous les scripts non-critiques
- ✅ Preconnect pour les CDN externes
- ✅ Compression Gzip (configuration .htaccess)
- ✅ Cache des fichiers statiques (1 an)
- ✅ Background loader pour les images lazy

### 3. Optimisations Base de Données
- ✅ Requêtes optimisées avec groupBy
- ✅ Eager loading dans les resources Filament
- ✅ Index sur les colonnes fréquemment utilisées

## 🚀 Optimisations à appliquer avant le déploiement

### 1. Optimiser Composer Autoloader

```bash
composer install --optimize-autoloader --no-dev
```

### 2. Optimiser la configuration Laravel

```bash
# En production, assurez-vous que APP_ENV=production et APP_DEBUG=false dans .env
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### 3. Minifier les assets CSS/JS (si possible)

Si vous avez des assets compilés avec Vite/Mix, exécutez :
```bash
npm run build
```

### 4. Optimiser les images

**Avant le déploiement**, optimisez toutes les images :
- Utilisez des outils comme TinyPNG, ImageOptim, ou Squoosh
- Convertir les images en WebP quand c'est possible
- Redimensionner les images aux tailles réellement utilisées
- Compression JPG qualité 80-85 (invisible pour l'utilisateur)

### 5. Activer Opcache PHP

Dans `php.ini` :
```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0  # En production uniquement
opcache.save_comments=1
opcache.fast_shutdown=1
```

### 6. Utiliser Redis pour le cache (recommandé)

```bash
# Installer Redis
sudo apt install redis-server

# Dans .env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### 7. Compression au niveau serveur

Déjà configuré dans `.htaccess` (Apache) ou à configurer dans Nginx.

### 8. CDN pour les assets statiques (optionnel)

Utilisez Cloudflare (gratuit) ou un CDN payant pour servir les images, CSS et JS.

## 📊 Checklist avant déploiement

- [ ] `.env` configuré avec `APP_ENV=production` et `APP_DEBUG=false`
- [ ] Base de données créée et migrée
- [ ] `composer install --optimize-autoloader --no-dev` exécuté
- [ ] `php artisan config:cache` exécuté
- [ ] `php artisan route:cache` exécuté
- [ ] `php artisan view:cache` exécuté
- [ ] Images optimisées (compression, redimensionnement)
- [ ] Permissions correctes sur `storage/` et `bootstrap/cache/` (775)
- [ ] SSL/HTTPS configuré
- [ ] `.htaccess` ou configuration Nginx mise en place
- [ ] Opcache activé
- [ ] Backups automatiques configurés

## 🔄 Script de déploiement automatique

Créez `deploy.sh` :

```bash
#!/bin/bash
set -e

echo "🚀 Déploiement en cours..."

# Aller dans le répertoire du projet
cd /var/www/escapade-hotel

# Récupérer les dernières modifications
git pull origin main

# Installer les dépendances
composer install --optimize-autoloader --no-dev --quiet

# Migrer la base de données
php artisan migrate --force --quiet

# Optimiser Laravel
php artisan config:cache --quiet
php artisan route:cache --quiet
php artisan view:cache --quiet
php artisan event:cache --quiet

# Redémarrer les workers
sudo supervisorctl restart escapade-worker:* || true

# Nettoyer les anciens caches
php artisan cache:clear --quiet
php artisan view:clear --quiet

echo "✅ Déploiement terminé avec succès!"
```

## 📈 Monitoring des performances

### Métriques à surveiller :
1. **Temps de chargement** : < 3 secondes (objectif)
2. **Taille des pages** : < 2MB (objectif)
3. **Requêtes SQL** : Minimiser avec le cache
4. **Temps de réponse serveur** : < 500ms

### Outils :
- **Lighthouse** (Chrome DevTools) : Audit de performance
- **PageSpeed Insights** (Google) : Analyse complète
- **GTmetrix** : Tests de performance détaillés

## 🔧 Configuration .env de production

```env
APP_NAME="L'Escapade Hotel"
APP_ENV=production
APP_KEY=base64:... (généré avec php artisan key:generate)
APP_DEBUG=false
APP_URL=https://votre-domaine.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=escapade_hotel
DB_USERNAME=votre_user
DB_PASSWORD=votre_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## ⚠️ Points d'attention

1. **Ne jamais commit `.env`** dans Git
2. **Backups réguliers** de la base de données
3. **Mises à jour de sécurité** régulières
4. **Monitoring** des erreurs (Sentry, Bugsnag)
5. **Limites de ressources** : Surveiller la RAM/CPU


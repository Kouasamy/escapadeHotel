# Guide d'Hébergement - L'Escapade Hotel

## Budget : Maximum 60,98 € / an (≈ 5 € / mois)

## ✅ Recommandations d'Hébergeurs Compatibles Laravel

### 🥇 **RECOMMANDATION #1 : OVHcloud - Offre Perso**
**Prix : 3,95 € TTC/mois = 47,40 € TTC/an**

**Avantages :**
- ✅ Nom de domaine offert la première année (.fr, .com, .ci, etc.)
- ✅ 100 Go de stockage SSD
- ✅ Certificat SSL gratuit (Let's Encrypt)
- ✅ Protection anti-DDoS incluse
- ✅ Support Laravel complet (PHP 8.1+, MySQL, Composer)
- ✅ Sauvegardes quotidiennes
- ✅ Serveur français (RGPD compliant)
- ✅ cPanel ou Plesk inclus
- ✅ Email professionnel inclus

**Spécifications techniques :**
- PHP 8.1, 8.2, 8.3
- MySQL 8.0
- Composer pré-installé
- Mod_rewrite activé
- Extensions PHP Laravel complètes

**Lien :** https://www.ovhcloud.com/fr/web-hosting/

---

### 🥈 **RECOMMANDATION #2 : IONOS - Offre Essential**
**Prix : 1,20 € TTC/mois (1ère année) = 14,40 € TTC/an**
**Prix après : ~4-5 €/mois**

**Avantages :**
- ✅ Nom de domaine gratuit la première année
- ✅ 100 Go de stockage NVMe (très rapide)
- ✅ Certificat SSL inclus
- ✅ Support Laravel
- ✅ Protection anti-malware
- ✅ Interface simple
- ✅ Email professionnel inclus

**Spécifications techniques :**
- PHP 8.1+
- MySQL/MariaDB
- Composer disponible
- Support mod_rewrite

**Lien :** https://www.ionos.fr/hebergement/hebergement-web

**⚠️ Note :** Prix promotionnel la première année, puis augmente à ~4-5€/mois

---

### 🥉 **RECOMMANDATION #3 : OuiHeberg - Offre Web Start**
**Prix : 4,00 € TTC/mois = 48,00 € TTC/an**

**Avantages :**
- ✅ Nom de domaine gratuit la première année
- ✅ 50 Go de stockage NVMe
- ✅ Certificat SSL inclus
- ✅ Protection DDoS
- ✅ Support Laravel
- ✅ Sauvegardes automatiques
- ✅ Serveur français
- ✅ Support technique réactif

**Lien :** https://www.ouiheberg.com/fr/hebergement-site-web

---

## 🔒 Sécurité Incluse (Tous les hébergeurs ci-dessus)

- ✅ Certificat SSL/HTTPS gratuit (Let's Encrypt)
- ✅ Protection anti-DDoS
- ✅ Sauvegardes automatiques
- ✅ Protection anti-malware
- ✅ Firewall inclus
- ✅ Mises à jour de sécurité automatiques

---

## 📋 Checklist Avant de Choisir

### Vérifications importantes pour Laravel :

- [ ] **PHP 8.1+** (idéalement 8.2 ou 8.3)
- [ ] **MySQL 8.0+** ou MariaDB 10.3+
- [ ] **Composer** disponible
- [ ] **Mod_rewrite** activé (pour les routes Laravel)
- [ ] **Extensions PHP** : OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath
- [ ] **Espace disque** : Minimum 5 Go (recommandé 20+ Go)
- [ ] **Bande passante** : Illimitée ou généreuse
- [ ] **SSL/HTTPS** : Gratuit et facile à activer
- [ ] **Email** : Au moins 1 compte email professionnel

---

## 🚀 Configuration Recommandée : OVHcloud

### Pourquoi OVHcloud est le meilleur choix :

1. **Fiabilité** : Leader français, infrastructure solide
2. **Support Laravel** : Parfaitement compatible
3. **Sécurité** : Protection DDoS de niveau professionnel
4. **Prix** : Excellent rapport qualité/prix
5. **Support** : Assistance technique en français
6. **RGPD** : Conforme aux réglementations européennes

### Étapes d'installation sur OVHcloud :

1. **Commander l'hébergement** : Offre Perso (3,95€/mois)
2. **Choisir votre nom de domaine** : Ex: escapadehotel.ci ou escapadehotel.com
3. **Activer SSL** : Via le panneau de contrôle (gratuit)
4. **Uploader vos fichiers** : Via FTP/SFTP ou Git
5. **Configurer la base de données** : Créer une base MySQL
6. **Configurer Laravel** : 
   - Modifier le `.env` avec les identifiants de la base
   - Lancer `php artisan migrate`
   - Configurer les permissions des dossiers `storage/` et `bootstrap/cache/`

---

## 💡 Alternative : Hébergement VPS (Si besoin de plus de contrôle)

Si vous avez besoin de plus de contrôle et de performances :

### **OVHcloud VPS Starter**
**Prix : ~3,50 € HT/mois = ~42 € HT/an**

- Plus de contrôle
- Meilleures performances
- Nécessite des connaissances techniques
- Installation Laravel manuelle

---

## 📝 Configuration Post-Hébergement

Une fois l'hébergement choisi, vous devrez :

1. ✅ Mettre à jour le domaine dans `sitemap.xml`
2. ✅ Mettre à jour les URLs dans les meta tags (remplacer `www.escapadehotel.com`)
3. ✅ Configurer les emails (voir `CONFIGURATION_EMAIL.md`)
4. ✅ Activer HTTPS et redirections dans `.htaccess`
5. ✅ Configurer les variables d'environnement Laravel (`.env`)
6. ✅ Lancer les migrations de base de données
7. ✅ Configurer les permissions des dossiers

---

## 🎯 Notre Recommandation Finale

**👉 OVHcloud - Offre Perso à 3,95 €/mois**

**Pourquoi :**
- Parfait pour Laravel
- Excellent rapport qualité/prix
- Sécurité renforcée
- Support en français
- Dans votre budget (47,40 €/an)
- Nom de domaine inclus

**Lien direct :** https://www.ovhcloud.com/fr/web-hosting/

---

## ⚠️ Hébergeurs à Éviter pour Laravel

- ❌ Hébergeurs gratuits (limitations trop importantes)
- ❌ Hébergeurs sans support PHP 8.1+
- ❌ Hébergeurs sans Composer
- ❌ Hébergeurs sans mod_rewrite

---

## 📞 Support

Si vous avez besoin d'aide pour :
- Configurer Laravel sur l'hébergement
- Migrer votre site
- Configurer les emails
- Optimiser les performances

N'hésitez pas à demander de l'aide !

---

**Dernière mise à jour :** Janvier 2025

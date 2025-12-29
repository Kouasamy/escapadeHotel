# Configuration de l'envoi d'emails

## Formulaire de contact

Le formulaire de contact dans le footer de toutes les pages envoie maintenant les messages à l'adresse : **contact@escapadehotel.com**

## ⚠️ IMPORTANT : Si vous n'avez PAS le mot de passe de l'email de l'entreprise

Vous avez **plusieurs options** selon votre situation :

---

## 🎯 OPTION RECOMMANDÉE : Service d'email transactionnel (Sans mot de passe email)

Ces services sont spécialisés pour l'envoi d'emails depuis les applications web. **Ils ne nécessitent PAS le mot de passe de l'email de l'entreprise.**

### Option A : Resend (Gratuit jusqu'à 3000 emails/mois)

1. Créez un compte gratuit sur [resend.com](https://resend.com)
2. Générez une clé API
3. Configurez dans `.env` :

```env
MAIL_MAILER=resend
RESEND_API_KEY=votre-clé-api-resend
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

**Avantages** : Gratuit, facile à configurer, très fiable, pas besoin du mot de passe email

### Option B : Mailgun (Gratuit jusqu'à 5000 emails/mois)

1. Créez un compte gratuit sur [mailgun.com](https://www.mailgun.com)
2. Vérifiez votre domaine escapadehotel.com (ou utilisez leur domaine de test)
3. Installez le package : `composer require symfony/mailgun-mailer symfony/http-client`
4. Configurez dans `.env` :

```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=votre-domaine.mailgun.org
MAILGUN_SECRET=votre-clé-secrète-mailgun
MAILGUN_ENDPOINT=api.mailgun.net
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

### Option C : Postmark (Gratuit jusqu'à 100 emails/mois)

1. Créez un compte sur [postmarkapp.com](https://postmarkapp.com)
2. Générez une clé API
3. Configurez dans `.env` :

```env
MAIL_MAILER=postmark
POSTMARK_API_KEY=votre-clé-api-postmark
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

---

## 🔧 OPTION 2 : Utiliser le serveur web (Sendmail)

Si votre hébergeur a déjà configuré l'envoi d'emails sur le serveur, vous pouvez utiliser Sendmail **sans mot de passe** :

```env
MAIL_MAILER=sendmail
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

**Comment savoir si c'est disponible ?** Demandez à votre hébergeur ou testez cette configuration.

---

## 📝 OPTION 3 : Mode développement/test (Log)

Pour tester le formulaire **sans envoyer de vrais emails** (les emails seront dans les logs) :

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

Les emails seront enregistrés dans `storage/logs/laravel.log` au lieu d'être envoyés.

---

## 🔐 OPTION 4 : Demander les identifiants SMTP à l'entreprise

Si vous préférez utiliser directement l'email de l'entreprise, vous devez demander :

1. **Les identifiants SMTP** (pas forcément le mot de passe de l'email principal)
2. Ou créer un **compte email dédié** pour l'envoi automatique (ex: `noreply@escapadehotel.com`)
3. Ou utiliser un **mot de passe d'application** si l'entreprise utilise Gmail/Outlook

### Exemple avec Gmail (si l'entreprise utilise Gmail)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=contact@escapadehotel.com
MAIL_PASSWORD=mot-de-passe-d-application-gmail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

**Note** : Gmail nécessite un "mot de passe d'application" (pas le mot de passe normal) - à générer dans les paramètres Google.

---

## ✅ RECOMMANDATION FINALE

**Pour la production**, je recommande **Resend** ou **Mailgun** car :
- ✅ Pas besoin du mot de passe de l'email de l'entreprise
- ✅ Plus fiable que SMTP classique
- ✅ Meilleure délivrabilité (moins de spam)
- ✅ Statistiques d'envoi
- ✅ Gratuit pour commencer

## 🚀 Guide de démarrage rapide

### Étape 1 : Choisir votre solution

**Si vous n'avez PAS le mot de passe de l'email de l'entreprise** → Utilisez **Resend** (Option A ci-dessus)

**Si votre hébergeur gère déjà les emails** → Utilisez **Sendmail** (Option 2)

**Pour tester rapidement** → Utilisez **Log** (Option 3)

### Étape 2 : Configuration Resend (Recommandé)

1. Allez sur [resend.com](https://resend.com) et créez un compte gratuit
2. Dans le dashboard, allez dans "API Keys" et créez une nouvelle clé
3. Copiez la clé API
4. Ajoutez dans votre fichier `.env` :

```env
MAIL_MAILER=resend
RESEND_API_KEY=re_VOTRE_CLE_API_ICI
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

5. C'est tout ! Aucun mot de passe email nécessaire.

### Étape 3 : Vérifier la configuration

Pour vérifier que tout fonctionne, utilisez d'abord le mode `log` :

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

Puis testez le formulaire et vérifiez le fichier `storage/logs/laravel.log` pour voir l'email qui aurait été envoyé.

## Test de l'envoi d'email

Pour tester l'envoi d'email :

1. Remplissez le formulaire de contact sur n'importe quelle page du site
2. Cliquez sur "Envoyer"
3. Vérifiez que vous recevez l'email à **contact@escapadehotel.com**
4. Si vous utilisez le mode `log`, vérifiez `storage/logs/laravel.log`

## Structure de l'email

L'email reçu contiendra :
- Nom du client
- Prénom du client
- Adresse email du client
- Numéro de téléphone (si fourni)
- Message du client

Vous pouvez répondre directement à l'email pour contacter le client.

## Dépannage

Si les emails ne sont pas envoyés :

1. Vérifiez les logs dans `storage/logs/laravel.log`
2. Vérifiez que les variables MAIL_* sont correctement configurées dans `.env`
3. Vérifiez que le serveur SMTP est accessible depuis votre serveur
4. Pour le développement, utilisez `MAIL_MAILER=log` pour voir les emails dans les logs


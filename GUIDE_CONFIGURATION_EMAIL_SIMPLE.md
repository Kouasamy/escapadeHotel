# 📧 Guide Simple : Configuration Email SANS Mot de Passe

## 🎯 Solution Recommandée : Resend (GRATUIT)

**Vous n'avez PAS besoin du mot de passe de l'email de l'entreprise !**

### ✅ Avantages de Resend :
- ✅ **Gratuit** jusqu'à 3000 emails/mois
- ✅ **Pas besoin** du mot de passe de l'email
- ✅ Configuration en **2 minutes**
- ✅ Très fiable et professionnel
- ✅ Les emails arrivent directement à **contact@escapadehotel.com**

---

## 📝 Étapes de Configuration

### Étape 1 : Créer un compte Resend (2 minutes)

1. Allez sur **https://resend.com**
2. Cliquez sur **"Sign Up"** (c'est gratuit)
3. Créez votre compte avec votre email
4. Confirmez votre email

### Étape 2 : Obtenir votre clé API

1. Une fois connecté, allez dans **"API Keys"** (dans le menu)
2. Cliquez sur **"Create API Key"**
3. Donnez un nom (ex: "Escapade Hotel Site")
4. Copiez la clé API qui s'affiche (elle commence par `re_`)

⚠️ **Important** : Copiez la clé maintenant, vous ne pourrez plus la voir après !

### Étape 3 : Configurer dans Laravel

Ouvrez votre fichier `.env` et ajoutez/modifiez ces lignes :

```env
MAIL_MAILER=resend
RESEND_API_KEY=re_VOTRE_CLE_API_ICI
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

**Remplacez** `re_VOTRE_CLE_API_ICI` par la vraie clé que vous avez copiée à l'étape 2.

### Étape 4 : Tester

1. Allez sur votre site web
2. Remplissez le formulaire de contact dans le footer
3. Cliquez sur "Envoyer"
4. Vérifiez que l'email arrive à **contact@escapadehotel.com**

---

## 🔄 Alternative : Mode Test (Sans Envoyer de Vrais Emails)

Si vous voulez tester **sans configurer Resend** pour l'instant :

Dans votre `.env`, mettez :

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=contact@escapadehotel.com
MAIL_FROM_NAME="L'Escapade Hotel"
```

Les emails seront enregistrés dans `storage/logs/laravel.log` au lieu d'être envoyés. C'est parfait pour tester que le formulaire fonctionne !

---

## ❓ Questions Fréquentes

### Q : Est-ce que Resend est vraiment gratuit ?
**R :** Oui ! 3000 emails par mois gratuitement. C'est largement suffisant pour un site d'hôtel.

### Q : Est-ce que je dois donner le mot de passe de l'email de l'entreprise ?
**R :** **NON !** Resend n'a pas besoin du mot de passe. Vous utilisez juste une clé API.

### Q : Les emails arrivent-ils bien à contact@escapadehotel.com ?
**R :** Oui ! Les emails sont envoyés **depuis** votre site **vers** contact@escapadehotel.com. Vous recevrez tous les messages de contact dans cette boîte.

### Q : Que faire si Resend ne fonctionne pas ?
**R :** Vous pouvez utiliser Mailgun (gratuit aussi) ou demander à votre hébergeur s'il a déjà configuré l'envoi d'emails (Sendmail).

---

## 🆘 Besoin d'aide ?

Si vous avez des problèmes :
1. Vérifiez que la clé API est correcte dans `.env`
2. Vérifiez les logs dans `storage/logs/laravel.log`
3. Testez d'abord avec `MAIL_MAILER=log` pour voir si le formulaire fonctionne


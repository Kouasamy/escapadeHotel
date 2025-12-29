<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #B78F62;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #B78F62;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            padding: 10px;
            background-color: white;
            border-left: 3px solid #B78F62;
            margin-left: 0;
        }
        .message-box {
            padding: 15px;
            background-color: white;
            border-left: 3px solid #B78F62;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouveau message de contact</h1>
        <p>L'Escapade Hotel</p>
    </div>

    <div class="content">
        <div class="field">
            <span class="field-label">Nom :</span>
            <div class="field-value">{{ $name }}</div>
        </div>

        <div class="field">
            <span class="field-label">Prénom :</span>
            <div class="field-value">{{ $firstName }}</div>
        </div>

        <div class="field">
            <span class="field-label">Email :</span>
            <div class="field-value">{{ $email }}</div>
        </div>

        @if($phone)
        <div class="field">
            <span class="field-label">Téléphone :</span>
            <div class="field-value">{{ $phone }}</div>
        </div>
        @endif

        <div class="field">
            <span class="field-label">Message :</span>
            <div class="message-box">{{ $message }}</div>
        </div>
    </div>

    <div class="footer">
        <p>Ce message a été envoyé depuis le formulaire de contact du site web L'Escapade Hotel.</p>
        <p>Vous pouvez répondre directement à cet email pour contacter le client.</p>
    </div>
</body>
</html>

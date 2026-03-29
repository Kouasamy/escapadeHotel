# Technical Documentation - L'Escapade Hotel

---

## 🇫🇷 DOCUMENTATION FRANÇAISE

### 1. Architecture du Système
Le projet est bâti sur l'écosystème **Laravel 12.x**, utilisant une architecture MVC classique renforcée par **Filament PHP** pour la couche administrative. L'isolation des données et la gestion des états sont assurées par Eloquent.

### 2. Modèle de Données (Entities)
- **Suite** : Représente les hébergements. Champs clés : `title`, `description`, `price_per_night`, `capacity`, `amenities` (JSON), `images` (Collection).
- **Reservation** : Gère le cycle de vie du client. Champs clés : `customer_name`, `email`, `check_in`, `check_out`, `total_price`, `status` (Enum).
- **Event** : Catalogue d'activités hôtelières. Champs clés : `name`, `date`, `location`, `is_published`.
- **Setting** : Configuration globale du site (nom de l'hôtel, contact, réseaux sociaux).

### 3. Logiques Métier Spécifiques
- **Validation des Chevauchements** : Le système empêche techniquement la réservation d'une suite déjà occupée aux dates demandées via des règles de validation SQL avancées.
- **Traitement d'Image** : Utilisation d'Intervention Image pour le redimensionnement automatique et l'optimisation des visuels des suites lors de l'upload.
- **Reporting PDF** : Utilisation de `spatie/laravel-pdf` pour générer des récapitulatifs de réservations proactifs.

### 4. Déploiement & Optimisation
Le projet est optimisé pour les environnements de production (ex: Hostinger) avec une gestion fine des liens symboliques (`storage:link`) et un nettoyage automatique des caches lors des mises à jour.

---

## 🇺🇸 ENGLISH DOCUMENTATION

### 1. System Architecture
The project is built on the **Laravel 12.x** ecosystem, utilizing a classic MVC architecture bolstered by **Filament PHP** for the administrative layer. Data isolation and state management are handled through Eloquent.

### 2. Data Model (Entities)
- **Suite**: Represents accommodations. Key fields: `title`, `description`, `price_per_night`, `capacity`, `amenities` (JSON), `images` (Collection).
- **Reservation**: Manages the guest lifecycle. Key fields: `customer_name`, `email`, `check_in`, `check_out`, `total_price`, `status` (Enum).
- **Event**: Catalog of hotel activities. Key fields: `name`, `date`, `location`, `is_published`.
- **Setting**: Global site configuration (hotel name, contact, social media).

### 3. Specific Business Logic
- **Overlap Validation**: The system technically prevents booking an occupied suite on requested dates via advanced SQL validation rules.
- **Image Processing**: Leverages Intervention Image for automatic resizing and optimization of suite visuals during upload.
- **PDF Reporting**: Uses `spatie/laravel-pdf` to generate proactive booking summaries.

### 4. Deployment & Optimization
The project is optimized for production environments (e.g., Hostinger) with precise management of symbolic links (`storage:link`) and automated cache clearing during updates via custom providers.

---
**Technical Specifications by: Kouat Ekra Samuel**
*February 2026*

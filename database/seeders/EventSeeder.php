<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'La Boutique Éphémère',
                'slug' => Str::slug('La Boutique Éphémère'),
                'event_date' => '2025-12-20',
                'location' => 'L\'Escapade Hotel',
                'excerpt' => 'Une alliance inédite entre trois maisons de prestige s\'unissent pour créer une expérience lifestyle inédite au cœur de L\'Escapade Hotel. Du 20 décembre au 5 janvier, plongez dans un univers où la Haute Couture, la Maroquinerie d\'art et la Beauté premium se rencontrent pour sublimer vos fêtes de fin d\'année. La Boutique éphémère vous ouvre ses portes de 16H à 21H.',
                'description' => 'Une alliance inédite entre trois maisons de prestige s\'unissent pour créer une expérience lifestyle inédite au cœur de L\'Escapade Hotel. Du 20 décembre au 5 janvier, plongez dans un univers où la Haute Couture, la Maroquinerie d\'art et la Beauté premium se rencontrent pour sublimer vos fêtes de fin d\'année. La Boutique éphémère vous ouvre ses portes de 16H à 21H.',
                'image' => 'images/Event1.png',
                'date_text' => 'Édition du 20 décembre 2025 au 5 janvier 2026',
                'is_active' => true,
            ],
            [
                'title' => 'Pilates Sunset avec <br> Core Fitness',
                'slug' => Str::slug('Pilates Sunset avec Core Fitness'),
                'event_date' => '2026-01-17',
                'location' => 'L\'Escapade Hotel',
                'excerpt' => 'L\'Escapade proposera une séance exclusive de Pilates Sunset en collaboration avec Core Fitness et le coach Baba. Une expérience bien-être au coucher du soleil, pensée pour allier énergie, détente et cadre inspirant.',
                'description' => 'L\'Escapade proposera une séance exclusive de Pilates Sunset en collaboration avec Core Fitness et le coach Baba. Une expérience bien-être au coucher du soleil, pensée pour allier énergie, détente et cadre inspirant.',
                'image' => 'images/imagesEvent1.JPG',
                'date_text' => 'Édition du 17 janvier 2026',
                'is_active' => true,
            ],
            [
                'title' => 'Dîners et Déjeuner de Noël',
                'slug' => Str::slug('Dîners et Déjeuner de Noël'),
                'event_date' => '2025-12-24',
                'location' => 'L\'Escapade Hotel',
                'excerpt' => 'Les 24 et 25 décembre, L\'Escapade invite ses hôtes à célébrer Noël autour d\'un dîner à l\'assiette puis d\'un déjeuner buffet, tous deux accompagnés d\'un cocktail de bienvenue. Deux moments chaleureux pour vivre la magie des fêtes dans un décor tropical.',
                'description' => 'Les 24 et 25 décembre, L\'Escapade invite ses hôtes à célébrer Noël autour d\'un dîner à l\'assiette puis d\'un déjeuner buffet, tous deux accompagnés d\'un cocktail de bienvenue. Deux moments chaleureux pour vivre la magie des fêtes dans un décor tropical.',
                'image' => 'images/EventNoel.jpg',
                'date_text' => 'Édition du 24 & 25 décembre 2025',
                'is_active' => true,
            ],
            [
                'title' => 'Saint-Sylvestre & <br> Brunch du Nouvel An',
                'slug' => Str::slug('Saint-Sylvestre & Brunch du Nouvel An'),
                'event_date' => '2025-12-31',
                'location' => 'L\'Escapade Hotel',
                'excerpt' => 'L\'Escapade propose des packs exclusifs pour un réveillon tout en élégance, comprenant suite, dîner et champagne. Le 1er janvier, un brunch festif au bord de la lagune marquera l\'entrée en douceur dans la nouvelle année.',
                'description' => 'L\'Escapade propose des packs exclusifs pour un réveillon tout en élégance, comprenant suite, dîner et champagne. Le 1er janvier, un brunch festif au bord de la lagune marquera l\'entrée en douceur dans la nouvelle année.',
                'image' => 'images/imagesEvent2.JPG',
                'date_text' => 'Édition du 31 décembre 2025 & 1er janvier 2026',
                'is_active' => true,
            ],
        ];

        foreach ($events as $eventData) {
            Event::updateOrCreate(
                ['slug' => $eventData['slug']],
                $eventData
            );
        }
    }
}


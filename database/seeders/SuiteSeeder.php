<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Suite;

class SuiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suites = [
            [
                'name' => 'Suite Junior',
                'slug' => 'suite-junior',
                'type' => 'junior',
                'description' => 'Avec ses 45 m², la Suite Junior allie design contemporain, matériaux naturels et inspiration locale. Lumineuse et raffinée, elle révèle un luxe authentique dans sa plus grande simplicité.',
                'capacity_adults' => 2,
                'capacity_children' => 2,
                'area' => 45.00,
                'weekly_rate' => 200000,
                'weekend_rate' => 250000,
                'features' => ['Terrasse', 'TV'],
                'main_image' => 'img/4.jpg',
                'hero_background_image' => 'img/4.jpg',
                'images' => [
                    'video/CHAMBRE 2 NEW VERSION.mp4',
                    'images/DSC06627.jpg'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Suite Senior',
                'slug' => 'suite-senior',
                'type' => 'senior',
                'description' => 'D\'une superficie de 70 m², la Suite Senior offre de grands volumes rappelant le confort d\'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant.',
                'capacity_adults' => 2,
                'capacity_children' => 2,
                'area' => 70.00,
                'weekly_rate' => 280000,
                'weekend_rate' => 350000,
                'features' => ['Terrasse', 'TV'],
                'main_image' => 'images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg',
                'hero_background_image' => 'images/fed713276c2b8f97b67e33b6a240df722bb83d82.jpg',
                'images' => [
                    'images/4e8bd77d88ebb1c9f445970808bcf56230320041.jpg',
                    'images/IMG_5871.jpg',
                    'images/IMG_1415.jpg'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Suites Senior avec Piscines',
                'slug' => 'suite-senior-vip',
                'type' => 'senior_vip',
                'description' => 'D\'une superficie de 70 m², les suites senior avec piscines offrent de grands volumes rappelant le confort d\'un appartement privé. Ses intérieurs distincts, mêlant ouverture et harmonie, créent un cadre reposant et élégant. Ces suites offrent un confort exceptionnel pour un séjour inoubliable.',
                'capacity_adults' => 2,
                'capacity_children' => 2,
                'area' => 70.00,
                'weekly_rate' => 320000,
                'weekend_rate' => 400000,
                'features' => ['Piscine', 'TV', 'Terrasse'],
                'main_image' => 'img/5.jpg',
                'hero_background_image' => 'img/5.jpg',
                'images' => [
                    'img/14.jpg',
                    'images/IMG_5871.jpg',
                    'img/5.jpg'
                ],
                'is_active' => true,
            ],
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
                'features' => ['Piscine privée', 'Terrasse', 'TV', '2 Chambres', 'Salon'],
                'main_image' => 'images/DJI_0956.jpg',
                'hero_background_image' => 'images/DJI_0956.jpg',
                'images' => [
                    'images/IMG_1415.jpg',
                    'images/ImageVilla.jpg',
                    'images/IMG_1341.jpg',
                    'images/IMG_6280.jpg',
                    'img/30.jpg'
                ],
                'is_active' => true,
            ],
        ];

        foreach ($suites as $suite) {
            Suite::create($suite);
        }
    }
}

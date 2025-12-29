<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'hotel_name', 'value' => 'L\'Escapade Hotel'],
            ['key' => 'hotel_email', 'value' => 'contact@escapade.ci'],
            ['key' => 'hotel_phone', 'value' => '+225 XX XX XX XX XX'],
            ['key' => 'hotel_address', 'value' => 'Adresse de l\'hôtel'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}

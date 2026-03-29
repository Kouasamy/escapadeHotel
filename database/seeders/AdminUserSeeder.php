<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer ou mettre à jour l'administrateur par défaut
        User::updateOrCreate(
            ['email' => 'admin@escapade.ci'],
            [
            'name' => 'Administrateur',
            'password' => Hash::make('password'), // À CHANGER EN PRODUCTION
            'role' => 'admin',
            'is_active' => true,
            ]
        );
    }
}

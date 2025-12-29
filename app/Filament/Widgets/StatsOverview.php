<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use App\Models\Suite;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Cache;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        // Cache les statistiques pendant 5 minutes pour améliorer les performances
        return Cache::remember('dashboard.stats.overview', 300, function () {
            // Utiliser une seule requête avec groupBy pour éviter plusieurs requêtes
            $statusCounts = Reservation::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray();

            $totalReservations = array_sum($statusCounts);
            $pending = $statusCounts['pending'] ?? 0;
            $confirmed = $statusCounts['confirmed'] ?? 0;
            $cancelled = $statusCounts['cancelled'] ?? 0;
            
            // Cache séparé pour les suites actives (change moins souvent)
            $activeSuites = Cache::remember('dashboard.active_suites', 600, function () {
                return Suite::where('is_active', true)->count();
            });

            return [
                Stat::make('Réservations', $totalReservations),
                Stat::make('En attente', $pending),
                Stat::make('Confirmées', $confirmed),
                Stat::make('Annulées', $cancelled),
                Stat::make('Suites actives', $activeSuites),
            ];
        });
    }
}


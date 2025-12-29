<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class OccupancyChart extends ChartWidget
{
    protected ?string $heading = 'Occupation (30 jours)';

    protected function getData(): array
    {
        // Cache les données pendant 5 minutes
        return Cache::remember('dashboard.occupancy.chart', 300, function () {
            $start = Carbon::now()->subDays(29)->startOfDay();
            $end = Carbon::now()->endOfDay();
            $data = [];
            $labels = [];

            // Optimisation : une seule requête avec toutes les réservations pertinentes
            $reservations = Reservation::where('arrival_date', '<=', $end)
                ->where('departure_date', '>=', $start)
                ->select('arrival_date', 'departure_date')
                ->get();

            for ($i = 0; $i < 30; $i++) {
                $day = $start->copy()->addDays($i);
                $labels[] = $day->format('d/m');
                
                // Compter en mémoire plutôt que de faire une requête par jour
                $count = $reservations->filter(function ($reservation) use ($day) {
                    return $reservation->arrival_date <= $day && $reservation->departure_date >= $day;
                })->count();
                
                $data[] = $count;
            }

            return [
                'datasets' => [
                    [
                        'label' => 'Séjours en cours',
                        'data' => $data,
                        'borderColor' => '#B78F62',
                        'backgroundColor' => 'rgba(183,143,98,0.2)',
                        'fill' => true,
                        'tension' => 0.3,
                    ],
                ],
                'labels' => $labels,
            ];
        });
    }

    protected function getType(): string
    {
        return 'line';
    }
}


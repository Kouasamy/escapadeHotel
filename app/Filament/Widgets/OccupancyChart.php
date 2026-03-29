<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class OccupancyChart extends ChartWidget
{
    public ?string $period = 'days';

    public function getHeading(): string
    {
        $period = $this->period ?? 'days';
        $periodLabels = [
            'days' => 'Occupation (30 derniers jours)',
            'weeks' => 'Occupation (12 dernières semaines)',
            'months' => 'Occupation (12 derniers mois)',
            'years' => 'Occupation (5 dernières années)',
        ];

        return $periodLabels[$period] ?? 'Occupation';
    }


    protected function getData(): array
    {
        $period = $this->period ?? 'days';
        
        // Cache les données avec la clé incluant la période
        return Cache::remember("dashboard.occupancy.chart.{$period}", 300, function () use ($period) {
            $data = [];
            $labels = [];
            $start = null;
            $end = Carbon::now()->endOfDay();
            $points = 0;

            // Définir la période selon le filtre sélectionné
            switch ($period) {
                case 'days':
                    $start = Carbon::now()->subDays(29)->startOfDay();
                    $points = 30;
                    break;
                case 'weeks':
                    $start = Carbon::now()->subWeeks(11)->startOfWeek();
                    $points = 12;
                    break;
                case 'months':
                    $start = Carbon::now()->subMonths(11)->startOfMonth();
                    $points = 12;
                    break;
                case 'years':
                    $start = Carbon::now()->subYears(4)->startOfYear();
                    $points = 5;
                    break;
                default:
                    $start = Carbon::now()->subDays(29)->startOfDay();
                    $points = 30;
            }

            // Optimisation : une seule requête avec toutes les réservations pertinentes
            $reservations = Reservation::where('arrival_date', '<=', $end)
                ->where('departure_date', '>=', $start)
                ->select('arrival_date', 'departure_date')
                ->get();

            // Calculer les données selon la période
            for ($i = 0; $i < $points; $i++) {
                $currentPeriod = null;
                $label = '';

                switch ($period) {
                    case 'days':
                        $currentPeriod = $start->copy()->addDays($i);
                        $label = $currentPeriod->format('d/m');
                        break;
                    case 'weeks':
                        $currentPeriod = $start->copy()->addWeeks($i);
                        $label = 'Sem. ' . $currentPeriod->format('W/Y');
                        break;
                    case 'months':
                        $currentPeriod = $start->copy()->addMonths($i);
                        $label = $currentPeriod->format('m/Y');
                        break;
                    case 'years':
                        $currentPeriod = $start->copy()->addYears($i);
                        $label = $currentPeriod->format('Y');
                        break;
                }

                $labels[] = $label;

                // Compter les réservations pour cette période
                $count = 0;
                
                if ($period === 'days') {
                    // Pour les jours, compter les réservations actives ce jour-là
                    $count = $reservations->filter(function ($reservation) use ($currentPeriod) {
                        return $reservation->arrival_date <= $currentPeriod && 
                               $reservation->departure_date >= $currentPeriod;
                    })->count();
                } else {
                    // Pour les semaines, mois et années, calculer le nombre moyen de réservations actives
                    $periodStart = $currentPeriod->copy();
                    $periodEnd = $currentPeriod->copy();
                    
                    switch ($period) {
                        case 'weeks':
                            $periodEnd = $periodStart->copy()->endOfWeek();
                            break;
                        case 'months':
                            $periodEnd = $periodStart->copy()->endOfMonth();
                            break;
                        case 'years':
                            $periodEnd = $periodStart->copy()->endOfYear();
                            break;
                    }

                    // Calculer le nombre moyen de réservations actives par jour dans cette période
                    $totalReservations = 0;
                    $totalDays = $periodStart->diffInDays($periodEnd) + 1;
                    
                    $tempDate = $periodStart->copy();
                    while ($tempDate <= $periodEnd) {
                        $dayReservations = $reservations->filter(function ($reservation) use ($tempDate) {
                            return $reservation->arrival_date <= $tempDate && 
                                   $reservation->departure_date >= $tempDate;
                        })->count();
                        
                        $totalReservations += $dayReservations;
                        $tempDate->addDay();
                    }
                    
                    // Calculer la moyenne de réservations actives pour cette période
                    $count = $totalDays > 0 ? round($totalReservations / $totalDays, 1) : 0;
                }
                
                $data[] = $count;
            }

            $labelMap = [
                'days' => 'Séjours en cours',
                'weeks' => 'Moyenne de séjours (par jour)',
                'months' => 'Moyenne de séjours (par jour)',
                'years' => 'Moyenne de séjours (par jour)',
            ];

            return [
                'datasets' => [
                    [
                        'label' => $labelMap[$period] ?? 'Séjours',
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


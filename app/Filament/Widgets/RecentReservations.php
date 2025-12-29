<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentReservations extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected function getTableQuery(): Builder
    {
        // Eager loading pour éviter les requêtes N+1
        return Reservation::with('suite')
            ->latest()
            ->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('id')->label('ID'),
            Tables\Columns\TextColumn::make('first_name')->label('Prénom'),
            Tables\Columns\TextColumn::make('last_name')->label('Nom'),
            Tables\Columns\TextColumn::make('suite.name')->label('Suite'),
            Tables\Columns\TextColumn::make('arrival_date')->label('Arrivée')->date('d/m/Y'),
            Tables\Columns\TextColumn::make('status')
                ->label('Statut')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'pending' => 'warning',
                    'confirmed' => 'success',
                    'cancelled' => 'danger',
                    'completed' => 'info',
                    default => 'gray',
                }),
        ];
    }
}


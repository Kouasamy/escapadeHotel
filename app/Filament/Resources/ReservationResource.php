<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReservationResource\Pages;
use App\Models\Reservation;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
// use Barryvdh\DomPDF\Facade\Pdf; // TODO: Installer dompdf si nécessaire

class ReservationResource extends Resource
{
    protected static ?string $model = Reservation::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-calendar';
    }

    public static function getNavigationLabel(): string
    {
        return 'Réservations';
    }

    public static function getModelLabel(): string
    {
        return 'Réservation';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Réservations';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Gestion';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Informations client')
                    ->schema([
                        Forms\Components\TextInput::make('first_name')
                            ->label('Prénom')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('last_name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('phone')
                            ->label('Téléphone')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('Détails de la réservation')
                    ->schema([
                        Forms\Components\Select::make('suite_id')
                            ->label('Suite')
                            ->relationship('suite', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),

                        Forms\Components\DatePicker::make('arrival_date')
                            ->label('Date d\'arrivée')
                            ->required()
                            ->native(false),

                        Forms\Components\DatePicker::make('departure_date')
                            ->label('Date de départ')
                            ->required()
                            ->native(false)
                            ->after('arrival_date'),

                        Forms\Components\TextInput::make('guests')
                            ->label('Nombre d\'invités')
                            ->numeric()
                            ->required()
                            ->minValue(1),

                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options([
                                'pending' => 'En attente',
                                'confirmed' => 'Confirmée',
                                'cancelled' => 'Annulée',
                                'completed' => 'Terminée',
                            ])
                            ->required()
                            ->native(false)
                            ->default('pending'),

                        Forms\Components\Textarea::make('message')
                            ->label('Message')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with('suite')) // Eager loading pour éviter N+1
            ->columns([
                TextColumn::make('first_name')
                    ->label('Prénom')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('last_name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->label('Téléphone')
                    ->searchable(),

                TextColumn::make('suite.name')
                    ->label('Suite')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('arrival_date')
                    ->label('Arrivée')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('departure_date')
                    ->label('Départ')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('guests')
                    ->label('Invités')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'success',
                        'cancelled' => 'danger',
                        'completed' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'confirmed' => 'Confirmée',
                        'cancelled' => 'Annulée',
                        'completed' => 'Terminée',
                        default => $state,
                    })
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'confirmed' => 'Confirmée',
                        'cancelled' => 'Annulée',
                        'completed' => 'Terminée',
                    ]),

                SelectFilter::make('suite_id')
                    ->label('Suite')
                    ->relationship('suite', 'name')
                    ->searchable()
                    ->preload(),

                Filter::make('arrival_date')
                    ->form([
                        Forms\Components\DatePicker::make('arrival_from')
                            ->label('Arrivée à partir de'),
                        Forms\Components\DatePicker::make('arrival_until')
                            ->label('Arrivée jusqu\'à'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['arrival_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('arrival_date', '>=', $date),
                            )
                            ->when(
                                $data['arrival_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('arrival_date', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Actions\ViewAction::make(),
                Actions\EditAction::make(),
                Actions\Action::make('change_status')
                    ->label('Changer le statut')
                    ->icon('heroicon-o-arrow-path')
                    ->form([
                        Forms\Components\Select::make('status')
                            ->label('Nouveau statut')
                            ->options([
                                'pending' => 'En attente',
                                'confirmed' => 'Confirmée',
                                'cancelled' => 'Annulée',
                                'completed' => 'Terminée',
                            ])
                            ->required()
                            ->native(false),
                    ])
                    ->action(function (Reservation $record, array $data) {
                        $oldStatus = $record->status;
                        $record->update(['status' => $data['status']]);
                        
                        // Envoyer un email si le statut passe à "confirmée"
                        if ($data['status'] === 'confirmed' && $oldStatus !== 'confirmed') {
                            // TODO: Implémenter l'envoi d'email
                        }
                    })
                    ->requiresConfirmation(),
                // Action::make('export_pdf')
                //     ->label('Exporter en PDF')
                //     ->icon('heroicon-o-document-arrow-down')
                //     ->action(function (Reservation $record) {
                //         $pdf = Pdf::loadView('reservations.pdf', ['reservation' => $record]);
                //         return $pdf->download('reservation-' . $record->id . '.pdf');
                //     }),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReservations::route('/'),
            'create' => Pages\CreateReservation::route('/create'),
            'view' => Pages\ViewReservation::route('/{record}'),
            'edit' => Pages\EditReservation::route('/{record}/edit'),
        ];
    }
}


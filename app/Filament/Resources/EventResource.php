<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Support\Str;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-calendar-days';
    }

    public static function getNavigationLabel(): string
    {
        return 'Événements';
    }

    public static function getModelLabel(): string
    {
        return 'Événement';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Événements';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Gestion';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Détails')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->label('Titre')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (string $operation, $state, Set $set) {
                            if ($operation !== 'create') {
                                return;
                            }
                            $set('slug', Str::slug($state));
                        }),
                    Forms\Components\TextInput::make('slug')
                        ->label('Slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),
                    Forms\Components\DatePicker::make('event_date')
                        ->label('Date de l\'événement')
                        ->native(false),
                    Forms\Components\TextInput::make('date_text')
                        ->label('Texte de date (ex: "Édition du 20 décembre 2025 au 5 janvier 2026")')
                        ->maxLength(255)
                        ->helperText('Texte personnalisé pour l\'affichage de la date. Si vide, la date sera formatée automatiquement.'),
                    Forms\Components\TextInput::make('location')
                        ->label('Lieu')
                        ->maxLength(255),
                    Forms\Components\Textarea::make('excerpt')
                        ->label('Résumé court')
                        ->rows(3)
                        ->maxLength(500),
                    Forms\Components\RichEditor::make('description')
                        ->label('Description')
                        ->columnSpanFull(),
                    Forms\Components\FileUpload::make('image')
                        ->label('Image')
                        ->image()
                        ->disk('public')
                        ->directory('events')
                        ->imageEditor()
                        ->visibility('public'),
                    Forms\Components\Toggle::make('is_active')
                        ->label('Actif')
                        ->default(true),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('event_date')
                    ->label('Date')
                    ->date('d/m/Y')
                    ->sortable(),
                TextColumn::make('location')
                    ->label('Lieu')
                    ->limit(30)
                    ->searchable(),
                BooleanColumn::make('is_active')
                    ->label('Actif')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('is_active')
                    ->label('Statut')
                    ->options([
                        1 => 'Actif',
                        0 => 'Inactif',
                    ]),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('event_date', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}


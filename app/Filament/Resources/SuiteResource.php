<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SuiteResource\Pages;
use App\Models\Suite;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Hidden;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class SuiteResource extends Resource
{
    protected static ?string $model = Suite::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-home';
    }

    public static function getNavigationLabel(): string
    {
        return 'Suites';
    }

    public static function getModelLabel(): string
    {
        return 'Suite';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Suites';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Gestion';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Informations générales')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nom de la suite')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Set $set) {
                                if ($operation !== 'create') {
                                    return;
                                }
                                $set('slug', Str::slug($state));
                                // Générer automatiquement le type à partir du nom
                                $nameLower = strtolower($state);
                                if (str_contains($nameLower, 'junior')) {
                                    $set('type', 'junior');
                                } elseif (str_contains($nameLower, 'senior') && (str_contains($nameLower, 'vip') || str_contains($nameLower, 'piscine'))) {
                                    $set('type', 'senior_vip');
                                } elseif (str_contains($nameLower, 'senior')) {
                                    $set('type', 'senior');
                                } elseif (str_contains($nameLower, 'villa') || str_contains($nameLower, 'familiale')) {
                                    $set('type', 'villa_familiale');
                                } else {
                                    $set('type', 'junior'); // Par défaut
                                }
                            }),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->helperText('Généré automatiquement depuis le nom'),

                        Hidden::make('type')
                            ->default('junior'),

                        Textarea::make('description')
                            ->label('Description')
                            ->rows(4)
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Suite active')
                            ->default(true)
                            ->helperText('Désactiver pour masquer la suite du site public'),
                    ])
                    ->columns(2),

                Section::make('Capacité et superficie')
                    ->schema([
                        TextInput::make('capacity_adults')
                            ->label('Capacité adultes')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->default(2),

                        TextInput::make('capacity_children')
                            ->label('Capacité enfants')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0),

                        TextInput::make('area')
                            ->label('Superficie (m²)')
                            ->required()
                            ->numeric()
                            ->step(0.01)
                            ->minValue(0)
                            ->suffix('m²'),
                    ])
                    ->columns(3),

                Section::make('Tarifs')
                    ->schema([
                        TextInput::make('weekly_rate')
                            ->label('Prix hebdomadaire')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->prefix('FCFA')
                            ->step(1000),

                        TextInput::make('weekend_rate')
                            ->label('Prix week-end')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->prefix('FCFA')
                            ->step(1000),
                    ])
                    ->columns(2),

                Section::make('Équipements')
                    ->schema([
                        CheckboxList::make('features')
                            ->label('Équipements disponibles')
                            ->options([
                                'Terrasse' => 'Terrasse',
                                'TV' => 'TV',
                                'Piscine' => 'Piscine',
                                'Piscine privée' => 'Piscine privée',
                                'Climatisation' => 'Climatisation',
                                'WiFi' => 'WiFi',
                                'Minibar' => 'Minibar',
                                'Salle de bain privée' => 'Salle de bain privée',
                            ])
                            ->columns(2)
                            ->descriptions([
                                'Terrasse' => 'Terrasse extérieure',
                                'TV' => 'Télévision',
                                'Piscine' => 'Accès à la piscine',
                                'Piscine privée' => 'Piscine privée dans la suite',
                            ]),
                    ]),

                Section::make('Images')
                    ->schema([
                        FileUpload::make('images')
                            ->label('Galerie d\'images')
                            ->multiple()
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->maxFiles(10)
                            ->directory('suites')
                            ->disk('public')
                            ->visibility('public')
                            ->nullable()
                            ->columnSpanFull()
                            ->helperText('Téléchargez plusieurs images pour la galerie (optionnel)'),

                        FileUpload::make('main_image')
                            ->label('Image principale')
                            ->image()
                            ->imageEditor()
                            ->required()
                            ->directory('suites')
                            ->disk('public')
                            ->visibility('public')
                            ->helperText('Image affichée sur la page de liste des suites'),

                        FileUpload::make('hero_background_image')
                            ->label('Image de fond hero')
                            ->image()
                            ->imageEditor()
                            ->directory('suites')
                            ->disk('public')
                            ->visibility('public')
                            ->nullable()
                            ->helperText('Image de fond pour la page de détail de la suite (optionnel)'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'junior' => 'info',
                        'senior' => 'success',
                        'senior_vip' => 'warning',
                        'villa_familiale' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'junior' => 'Junior',
                        'senior' => 'Senior',
                        'senior_vip' => 'Senior VIP',
                        'villa_familiale' => 'Villa Familiale',
                        default => $state,
                    })
                    ->sortable(),

                TextColumn::make('area')
                    ->label('Superficie')
                    ->suffix(' m²')
                    ->sortable(),

                TextColumn::make('weekly_rate')
                    ->label('Prix semaine')
                    ->money('XOF', locale: 'fr')
                    ->sortable(),

                TextColumn::make('weekend_rate')
                    ->label('Prix week-end')
                    ->money('XOF', locale: 'fr')
                    ->sortable(),

                BooleanColumn::make('is_active')
                    ->label('Active')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->label('Type')
                    ->options([
                        'junior' => 'Suite Junior',
                        'senior' => 'Suite Senior',
                        'senior_vip' => 'Suite Senior VIP',
                        'villa_familiale' => 'Villa Familiale',
                    ]),

                Filter::make('is_active')
                    ->label('Suites actives uniquement')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true))
                    ->toggle(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
                Actions\Action::make('toggle_active')
                    ->label(fn (Suite $record): string => $record->is_active ? 'Désactiver' : 'Activer')
                    ->icon(fn (Suite $record): string => $record->is_active ? 'heroicon-o-eye-slash' : 'heroicon-o-eye')
                    ->color(fn (Suite $record): string => $record->is_active ? 'warning' : 'success')
                    ->action(function (Suite $record) {
                        $record->update(['is_active' => !$record->is_active]);
                    })
                    ->requiresConfirmation(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                    Actions\BulkAction::make('activate')
                        ->label('Activer')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn ($records) => $records->each->update(['is_active' => true]))
                        ->requiresConfirmation(),
                    Actions\BulkAction::make('deactivate')
                        ->label('Désactiver')
                        ->icon('heroicon-o-x-circle')
                        ->color('warning')
                        ->action(fn ($records) => $records->each->update(['is_active' => false]))
                        ->requiresConfirmation(),
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
            'index' => Pages\ListSuites::route('/'),
            'create' => Pages\CreateSuite::route('/create'),
            'edit' => Pages\EditSuite::route('/{record}/edit'),
        ];
    }
}


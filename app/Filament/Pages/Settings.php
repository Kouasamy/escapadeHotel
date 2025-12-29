<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Pages\Page;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;

class Settings extends Page
{
    protected string $view = 'filament.pages.settings';

    public ?array $data = [];

    public static function getNavigationLabel(): string
    {
        return 'Paramètres';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Administration';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-cog-6-tooth';
    }

    public static function canAccess(): bool
    {
        $user = auth()->user();
        return $user && $user->role === 'admin';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::canAccess();
    }

    public function mount(): void
    {
        $this->data = [
            'opening_hours' => Setting::get('opening_hours'),
            'contact_phone' => Setting::get('contact_phone'),
            'contact_email' => Setting::get('contact_email'),
            'contact_address' => Setting::get('contact_address'),
            'hotel_info' => Setting::get('hotel_info'),
        ];
    }

    protected function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Contacts & horaires')
                ->schema([
                        Forms\Components\TextInput::make('opening_hours')
                            ->label('Horaires d\'ouverture'),
                        Forms\Components\TextInput::make('contact_phone')
                            ->label('Téléphone'),
                        Forms\Components\TextInput::make('contact_email')
                            ->label('Email')
                            ->email(),
                        Forms\Components\Textarea::make('contact_address')
                            ->label('Adresse')
                            ->rows(2),
                        Forms\Components\Textarea::make('hotel_info')
                            ->label('Informations générales')
                            ->rows(3),
                ]),
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();
        
        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        $this->notify('success', 'Paramètres mis à jour.');
    }
}


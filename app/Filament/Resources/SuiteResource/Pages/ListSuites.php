<?php

namespace App\Filament\Resources\SuiteResource\Pages;

use App\Filament\Resources\SuiteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSuites extends ListRecords
{
    protected static string $resource = SuiteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}


<?php

namespace App\Filament\Resources\SuiteResource\Pages;

use App\Filament\Resources\SuiteResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSuite extends EditRecord
{
    protected static string $resource = SuiteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}


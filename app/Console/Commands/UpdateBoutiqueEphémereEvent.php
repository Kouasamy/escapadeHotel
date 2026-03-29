<?php

namespace App\Console\Commands;

use App\Models\Event;
use Illuminate\Console\Command;

class UpdateBoutiqueEphémereEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'event:update-boutique-ephémere';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour l\'événement La Boutique Éphémère avec la date de fin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $event = Event::where('slug', 'la-boutique-ephemere')->first();
        
        if (!$event) {
            $this->error('Événement "La Boutique Éphémère" non trouvé.');
            return 1;
        }

        $event->end_date = '2026-01-05';
        $event->save();

        $this->info('Événement "La Boutique Éphémère" mis à jour avec la date de fin : 2026-01-05');
        
        return 0;
    }
}


<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Définir la locale depuis la session
        if (session()->has('locale')) {
            app()->setLocale(session('locale'));
        } else {
            app()->setLocale('fr'); // Langue par défaut
        }

        // Optimisation : Prévenir les requêtes N+1 en désactivant le lazy loading
        Model::preventLazyLoading(!app()->isProduction());
        
        // Optimisation : Limiter les requêtes sans eager loading en production
        if (app()->isProduction()) {
            Model::preventSilentlyDiscardingAttributes();
        }
    }
}

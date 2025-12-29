<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class Suite extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'capacity_adults',
        'capacity_children',
        'area',
        'weekly_rate',
        'weekend_rate',
        'features',
        'images',
        'main_image',
        'hero_background_image',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'images' => 'array',
        'area' => 'decimal:2',
        'weekly_rate' => 'decimal:2',
        'weekend_rate' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Boot du modèle pour invalider le cache lors des modifications
     */
    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('dashboard.active_suites');
        });

        static::deleted(function () {
            Cache::forget('dashboard.active_suites');
        });
    }

    /**
     * Relation avec les réservations
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Scope pour les suites actives
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope pour filtrer par type
     */
    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    /**
     * Accessor pour obtenir les features sous forme de tableau
     */
    public function getFeaturesAttribute($value)
    {
        return is_string($value) ? json_decode($value, true) : $value;
    }

    /**
     * Mutator pour stocker les features en JSON
     */
    public function setFeaturesAttribute($value)
    {
        $this->attributes['features'] = is_array($value) ? json_encode($value) : $value;
    }

    /**
     * Accessor pour obtenir les images sous forme de tableau
     */
    public function getImagesAttribute($value)
    {
        return is_string($value) ? json_decode($value, true) : $value;
    }

    /**
     * Mutator pour stocker les images en JSON
     */
    public function setImagesAttribute($value)
    {
        $this->attributes['images'] = is_array($value) ? json_encode($value) : $value;
    }

    /**
     * Accessor pour obtenir l'URL complète de l'image principale
     */
    public function getMainImageUrlAttribute(): ?string
    {
        if (!$this->main_image) {
            return null;
        }

        // Si le chemin commence par "images/" ou "img/", c'est un fichier dans public/
        if (str_starts_with($this->main_image, 'images/') || str_starts_with($this->main_image, 'img/')) {
            return asset($this->main_image);
        }

        // Sinon, c'est un fichier uploadé via Filament dans storage/app/public/
        return \Illuminate\Support\Facades\Storage::disk('public')->url($this->main_image);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class Reservation extends Model
{
    protected $fillable = [
        'suite_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'arrival_date',
        'departure_date',
        'guests',
        'message',
        'status',
    ];

    protected $casts = [
        'arrival_date' => 'date',
        'departure_date' => 'date',
    ];

    /**
     * Boot du modèle pour invalider le cache lors des modifications
     */
    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('dashboard.stats.overview');
            Cache::forget('dashboard.occupancy.chart');
        });

        static::deleted(function () {
            Cache::forget('dashboard.stats.overview');
            Cache::forget('dashboard.occupancy.chart');
        });
    }

    /**
     * Relation avec la suite
     */
    public function suite(): BelongsTo
    {
        return $this->belongsTo(Suite::class);
    }

    /**
     * Scope pour les réservations en attente
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope pour les réservations confirmées
     */
    public function scopeConfirmed(Builder $query): Builder
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope pour les réservations annulées
     */
    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', 'cancelled');
    }

    /**
     * Scope pour les réservations en cours
     */
    public function scopeInStay(Builder $query): Builder
    {
        return $query->where('status', 'in_stay');
    }

    /**
     * Scope pour les réservations terminées
     */
    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', 'completed');
    }

    /**
     * Accessor pour obtenir le label du statut
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pending' => 'En attente',
            'confirmed' => 'Confirmée',
            'cancelled' => 'Annulée',
            'in_stay' => 'En séjour',
            'completed' => 'Terminée',
            default => $this->status,
        };
    }

    /**
     * Accessor pour obtenir la classe badge du statut
     */
    public function getStatusBadgeAttribute(): string
    {
        return match($this->status) {
            'pending' => 'warning',
            'confirmed' => 'success',
            'cancelled' => 'danger',
            'in_stay' => 'info',
            'completed' => 'secondary',
            default => 'secondary',
        };
    }
}

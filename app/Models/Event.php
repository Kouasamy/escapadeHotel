<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'event_date',
        'location',
        'excerpt',
        'description',
        'image',
        'date_text',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Accessor pour compatibilité avec l'API (date au lieu de event_date)
     */
    public function getDateAttribute()
    {
        return $this->event_date;
    }

    /**
     * Accessor pour compatibilité avec l'API (summary au lieu de excerpt)
     */
    public function getSummaryAttribute()
    {
        return $this->excerpt;
    }
}


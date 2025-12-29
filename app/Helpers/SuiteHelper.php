<?php

namespace App\Helpers;

class SuiteHelper
{
    /**
     * Obtenir l'icône de superficie selon le type de suite
     */
    public static function getAreaIcon($type)
    {
        return match($type) {
            'junior' => 'images/324_691.svg',
            'senior' => 'merged', // Nécessite 4 images superposées
            'senior_vip' => 'merged_vip', // Nécessite 4 images superposées différentes
            'villa_familiale' => 'images/324_692.svg',
            default => 'images/324_691.svg',
        };
    }

    /**
     * Obtenir l'icône de terrasse
     */
    public static function getTerraceIcon()
    {
        return 'images/iconeTerrasse.jpg';
    }

    /**
     * Obtenir l'icône de TV
     */
    public static function getTVIcon()
    {
        return 'images/4549a4342843ea65a58fc8c16959a3919cfb25dd.png';
    }

    /**
     * Obtenir l'icône de piscine
     */
    public static function getPoolIcon($type)
    {
        return match($type) {
            'senior_vip' => 'images/324_620.svg',
            'villa_familiale' => 'images/324_618.svg',
            default => 'images/324_618.svg',
        };
    }

    /**
     * Vérifier si la suite a une piscine
     */
    public static function hasPool($features)
    {
        if (!is_array($features)) {
            return false;
        }
        return in_array('Piscine', $features) || in_array('Piscine privée', $features);
    }

    /**
     * Vérifier si la suite a une terrasse
     */
    public static function hasTerrace($features)
    {
        if (!is_array($features)) {
            return false;
        }
        return in_array('Terrasse', $features);
    }

    /**
     * Vérifier si la suite a une TV
     */
    public static function hasTV($features)
    {
        if (!is_array($features)) {
            return false;
        }
        return in_array('TV', $features);
    }
}


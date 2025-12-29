<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::query()
            ->where('is_active', true)
            ->orderByDesc('event_date')
            ->get();

        return view('events', compact('events'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Suite;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $suites = Suite::where('is_active', true)->get();
        return view('home', compact('suites'));
    }
}

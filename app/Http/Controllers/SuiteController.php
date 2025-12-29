<?php

namespace App\Http\Controllers;

use App\Models\Suite;
use Illuminate\Http\Request;

class SuiteController extends Controller
{
    public function index()
    {
        $suites = Suite::where('is_active', true)->get();
        return view('suites.index', compact('suites'));
    }

    public function show($slug)
    {
        $suite = Suite::where('slug', $slug)->where('is_active', true)->firstOrFail();
        return view('suites.show', compact('suite'));
    }
}

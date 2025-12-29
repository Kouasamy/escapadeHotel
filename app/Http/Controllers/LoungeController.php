<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoungeController extends Controller
{
    public function index()
    {
        return view('lounge');
    }
}

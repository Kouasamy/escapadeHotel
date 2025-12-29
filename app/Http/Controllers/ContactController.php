<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            // Envoyer l'email à l'adresse de l'entreprise
            Mail::to('contact@escapadehotel.com')
                ->send(new ContactMail(
                    $validated['name'],
                    $validated['first_name'],
                    $validated['email'],
                    $validated['phone'] ?? '',
                    $validated['message']
                ));

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de l\'envoi de l\'email de contact: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
            ], 500);
        }
    }
}

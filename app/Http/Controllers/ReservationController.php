<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Suite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function step1()
    {
        return view('reservations.step1');
    }

    public function storeStep1(Request $request)
    {
        try {
            $validated = $request->validate([
                'arrival_date' => 'nullable|date',
                'departure_date' => 'nullable|date',
                'check_in' => 'nullable|date',
                'check_out' => 'nullable|date',
                'guests' => 'required|integer|min:1',
            ]);

            $arrival = $validated['arrival_date'] ?? $validated['check_in'] ?? null;
            $departure = $validated['departure_date'] ?? $validated['check_out'] ?? null;

            // Validation des dates
            if (!$arrival || !$departure) {
                return back()->withErrors(['dates' => 'Les dates d\'arrivée et de départ sont requises.'])->withInput();
            }

            $arrivalDate = \Carbon\Carbon::parse($arrival);
            $departureDate = \Carbon\Carbon::parse($departure);

            if ($arrivalDate->isPast() && !$arrivalDate->isToday()) {
                return back()->withErrors(['arrival_date' => 'La date d\'arrivée doit être aujourd\'hui ou dans le futur.'])->withInput();
            }

            if ($departureDate->lte($arrivalDate)) {
                return back()->withErrors(['departure_date' => 'La date de départ doit être après la date d\'arrivée.'])->withInput();
            }

            session(['reservation_data' => [
                'arrival_date' => $arrival,
                'departure_date' => $departure,
                'guests' => (int) $validated['guests'],
            ]]);

            // Rediriger vers la deuxième page de réservation (reservation1.html)
            return redirect('/reservation1.html');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Une erreur est survenue. Veuillez réessayer.'])->withInput();
        }
    }

    public function step3()
    {
        $reservationData = session('reservation_data');

        if (!$reservationData) {
            return redirect()->route('reservations.step1');
        }

        $suites = Suite::where('is_active', true)
            ->where('capacity_adults', '>=', $reservationData['guests'])
            ->get()
            ->filter(function ($suite) use ($reservationData) {
                return $this->isSuiteAvailable($suite->id, $reservationData['arrival_date'], $reservationData['departure_date']);
            });

        return view('reservations.step3', compact('suites', 'reservationData'));
    }

    public function storeStep3(Request $request)
    {
        $validated = $request->validate([
            'suite_id' => 'required|exists:suites,id',
        ]);

        $reservationData = session('reservation_data', []);
        $reservationData['suite_id'] = $validated['suite_id'];

        // Vérifier la dispo avant de poursuivre
        if (!$this->isSuiteAvailable($validated['suite_id'], $reservationData['arrival_date'] ?? null, $reservationData['departure_date'] ?? null)) {
            return back()->withErrors(['suite_id' => 'Suite indisponible pour ces dates.']);
        }

        session(['reservation_data' => $reservationData]);

        // Rediriger vers la page HTML statique reservation3.html
        return redirect('/reservation3.html');
    }

    public function step4()
    {
        $reservationData = session('reservation_data');

        if (!$reservationData || !isset($reservationData['suite_id'])) {
            return redirect()->route('reservations.step1');
        }

        $suite = Suite::findOrFail($reservationData['suite_id']);

        return view('reservations.step4', compact('suite', 'reservationData'));
    }

    public function storeStep4(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:255',
                'message' => 'nullable|string',
                'nationality' => 'nullable|string|max:255',
            ]);

            $reservationData = session('reservation_data', []);

            if (!$reservationData || !isset($reservationData['arrival_date']) || !isset($reservationData['departure_date'])) {
                if ($request->expectsJson()) {
                    return response()->json(['error' => 'Données de réservation manquantes. Veuillez recommencer depuis le début.'], 400);
                }
                return redirect('/page_reservation1.html')->withErrors(['error' => 'Données de réservation manquantes. Veuillez recommencer depuis le début.']);
            }

            // Construire le message complet avec la nationalité si fournie
            $message = $validated['message'] ?? '';
            if (!empty($validated['nationality'])) {
                $message = (!empty($message) ? $message . "\n\n" : '') . 'Nationalité: ' . $validated['nationality'];
            }

            // Récupérer toutes les suites sélectionnées
            $selectedSuites = isset($reservationData['selected_suites']) && is_array($reservationData['selected_suites']) 
                ? $reservationData['selected_suites'] 
                : [];

            $reservationIds = [];
            $firstReservation = null;

            // Si aucune suite sélectionnée mais suite_id existe (rétrocompatibilité)
            if (empty($selectedSuites)) {
            $suiteId = null;
            if (isset($reservationData['suite_id'])) {
                $suiteId = $reservationData['suite_id'];
            } elseif (isset($reservationData['suite_type'])) {
                // Mapper les types du front-end vers les types de la base de données
                $typeMapping = [
                    'junior' => 'junior',
                    'senior' => 'senior',
                        'senior_pool' => 'senior_vip',
                        'villa' => 'villa_familiale',
                ];

                $dbType = $typeMapping[$reservationData['suite_type']] ?? $reservationData['suite_type'];
                    $suite = Suite::where('is_active', true)->where('type', $dbType)->first();

                if ($suite) {
                    $suiteId = $suite->id;
                } else {
                    if ($request->expectsJson()) {
                        return response()->json(['error' => 'Suite non trouvée pour le type sélectionné.'], 400);
                    }
                    return redirect('/reservation1.html')->withErrors(['error' => 'Suite non trouvée pour le type sélectionné.']);
                }
            } else {
                if ($request->expectsJson()) {
                    return response()->json(['error' => 'Aucune suite sélectionnée.'], 400);
                }
                return redirect('/reservation1.html')->withErrors(['error' => 'Aucune suite sélectionnée.']);
            }

                // Créer une seule réservation (rétrocompatibilité)
                $firstReservation = Reservation::create([
                'suite_id' => $suiteId,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'arrival_date' => $reservationData['arrival_date'],
                'departure_date' => $reservationData['departure_date'],
                'guests' => $reservationData['guests'] ?? 1,
                'message' => !empty($message) ? $message : null,
                'status' => 'pending',
            ]);

                $reservationIds[] = $firstReservation->id;
            } else {
                // Créer une réservation pour chaque suite sélectionnée
                foreach ($selectedSuites as $selectedSuite) {
                    $suite = Suite::find($selectedSuite['suite_id']);
                    
                    if (!$suite || !$suite->is_active) {
                        continue; // Ignorer les suites introuvables ou inactives
                    }

                    // Créer une réservation pour chaque quantité de cette suite
                    $quantity = $selectedSuite['quantity'] ?? 1;
                    for ($i = 0; $i < $quantity; $i++) {
                        $reservation = Reservation::create([
                            'suite_id' => $suite->id,
                            'first_name' => $validated['first_name'],
                            'last_name' => $validated['last_name'],
                            'email' => $validated['email'],
                            'phone' => $validated['phone'],
                            'arrival_date' => $reservationData['arrival_date'],
                            'departure_date' => $reservationData['departure_date'],
                            'guests' => $reservationData['guests'] ?? 1,
                            'message' => !empty($message) ? $message : null,
                            'status' => 'pending',
                        ]);
                        
                        if (!$firstReservation) {
                            $firstReservation = $reservation;
                        }
                        $reservationIds[] = $reservation->id;
                    }
                }

                if (empty($reservationIds)) {
                    if ($request->expectsJson()) {
                        return response()->json(['error' => 'Aucune suite valide sélectionnée.'], 400);
                    }
                    return redirect('/reservation1.html')->withErrors(['error' => 'Aucune suite valide sélectionnée.']);
                }
            }

            // Stocker les IDs de réservation dans la session
            session(['reservation_ids' => $reservationIds]);
            session(['reservation_id' => $reservationIds[0]]); // Pour la rétrocompatibilité

            session()->forget('reservation_data');

            if ($request->expectsJson()) {
                $responseData = [
                    'success' => true,
                    'message' => count($reservationIds) > 1 
                        ? 'Réservations créées avec succès.' 
                        : 'Réservation créée avec succès.',
                ];
                
                if (count($reservationIds) > 1) {
                    $responseData['reservation_ids'] = $reservationIds;
                    $responseData['reservation_count'] = count($reservationIds);
                } else {
                    $responseData['reservation_id'] = $reservationIds[0];
                }
                
                return response()->json($responseData);
            }

            return redirect('/reservation5.html');
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'errors' => $e->errors(),
                    'message' => 'Erreurs de validation.',
                ], 422);
            }
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Error in storeStep4: ' . $e->getMessage());
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Une erreur est survenue lors de la création de la réservation.',
                    'message' => $e->getMessage(),
                ], 500);
            }
            return back()->withErrors(['error' => 'Une erreur est survenue. Veuillez réessayer.'])->withInput();
        }
    }

    public function step5(Reservation $reservation)
    {
        return view('reservations.step5', compact('reservation'));
    }

    private function isSuiteAvailable(int $suiteId, ?string $arrival, ?string $departure): bool
    {
        if (!$arrival || !$departure) {
            return false;
        }

        return !Reservation::where('suite_id', $suiteId)
            ->where(function ($query) use ($arrival, $departure) {
                $query->whereBetween('arrival_date', [$arrival, $departure])
                    ->orWhereBetween('departure_date', [$arrival, $departure])
                    ->orWhere(function ($q) use ($arrival, $departure) {
                        $q->where('arrival_date', '<=', $arrival)
                          ->where('departure_date', '>=', $departure);
                    });
            })
            ->exists();
    }
}

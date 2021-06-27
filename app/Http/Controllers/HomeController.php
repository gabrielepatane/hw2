<?php

use Illuminate\Routing\Controller;
use App\Models\User;

class HomeController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if(!isset($user)) {
            return redirect('login');
        }
        else {
            return view('home')->with('user', $user);
        }
    }

    public function search($query) {

        $token = Http::withHeaders([
            'Authorization' => 'Basic '.base64_encode(env('SPOTIFY_CLIENT_ID').':'.env('SPOTIFY_CLIENT_SECRET')),
        ])->asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials'
        ]);

        if ($token->failed()) abort(500);

        Session::put('spotify_token', $token);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token['access_token'],
        ])->get('https://api.spotify.com/v1/search', [
            'type' => 'track',
            'q' => $query,
        ]);

        if ($response->failed()) abort(500);
        
        return $response;
    }

}
?>
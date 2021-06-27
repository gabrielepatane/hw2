<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Song;
use App\Models\Composition;

class ProfileController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if(!isset($user)) {
            return redirect('login');
        }
        else {
            return view('profile')->with('user', $user);
        }
    }

    public function getStats() {
        $session_id = session('user_id');
        
        $comp_count = Composition::all()->groupBy('progression_id')->max()->where('user_id', $session_id)->first();

        $keys_count = Song::all('content->key as key')->groupBy('key')->max()->first();

        $avg_energy = Song::all('content->energy as energy')->AVG('energy');

        $avg_tempo = Song::all('content->tempo as tempo')->AVG('tempo');

        $song_count = Song::all()->count();

        //return $keys_count;

        return json_encode(array('fav_prog' => $comp_count->progression->prog, 'fav_key' => $keys_count->key, 'avg_energy' => $avg_energy, 'avg_tempo' => $avg_tempo, 'num_songs' => $song_count));

    }
}
?>
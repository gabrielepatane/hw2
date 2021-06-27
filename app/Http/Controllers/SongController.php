<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Song;
use App\Models\Composition;
use App\Models\Progression;

class SongController extends Controller {

    public function getTrackFeatures($query) {

        $token = session('spotify_token');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token['access_token'],
        ])->get('https://api.spotify.com/v1/audio-features/'.$query);

        if ($response->failed()) abort(500);
        
        return $response;
    }

    public function getUserSongs(){
        $user_id = session('user_id');
        $songs = Song::where('user_id', $user_id)->get();
        $songsArray = array();

        foreach ($songs as $song) {
            $songsArray[] = array('userid' => $song->user_id, 'songid' => $song->id, 'content' => $song->content);
        }

        return $songsArray;
    }

    public function getProgressions(){
        $compositions = Composition::all();
        
        $progArray = array();

        foreach ($compositions as $composition) {
            $progArray[] = array('id' => $composition->id, 'song' => $composition->song_id, 'prog' => $composition->progression->prog);
        }

        return $progArray;
    }

    public function saveSong(){
        $request = request();
        $user_id = session('user_id');

        $content = array('title' => $request->title, 'artist' => $request->artist, 'duration' => $request->duration, 'popularity' => $request->popularity, 'image' => $request->image, 'release_date' => $request->release_date, 'key' => $request->key, 'energy' => $request->energy, 'tempo' => $request->tempo);

        $song = Song::create([
            'id' => $request->id,
            'user_id' => $user_id,
            'content' => $content
        ]);
        $song->saveOrFail();

        return json_encode(array('ok' => true));
    }

    public function deleteSong(){
        $request = request();

        $song = Song::where('id', $request->id);
        $song->delete();

        return json_encode(array('ok' => true));
    }

    public function saveProg(){
        $request = request();
        $user_id = session('user_id');

        if( Progression::where('prog', $request->prog)->count() == 0 ) {
            $newProg = Progression::create([
                'user_id' => $user_id,
                'n_chords' => $request->chords,
                'prog' => $request->prog
            ]);
    
            $newProg->saveOrFail();
        }

        $prog = Progression::where('prog', $request->prog)->first();

        $comp = Composition::create([
            'user_id' => $user_id,
            'song_id' => $request->id,
            'progression_id' => $prog->id
        ]);

        $comp->saveOrFail();

        return json_encode(array('id' => $prog->id));
    }

    public function updateProg(){

        $request = request();
        $user_id = session('user_id');

        //Controllo se esistono canzoni con la stessa progressione

        if (Composition::where('progression_id', $request->old_progid)->whereNotIn('song_id', [$request->id])->count() > 0) {

            if( Progression::where('prog', $request->prog)->count() == 0 ) {
                $newProg = Progression::create([
                    'user_id' => $user_id,
                    'n_chords' => $request->chords,
                    'prog' => $request->prog
                ]);
        
                $newProg->saveOrFail();
            }

            $prog = Progression::where('prog', $request->prog)->first();

            $comp = Composition::where('song_id', $request->id)->where('progression_id', $request->old_progid)->first();

            $comp->progression_id = $prog->id;

            $comp->save();

            return json_encode(array('id' => $prog->id));
    
        }

        else {

            $prog1 = Progression::where('prog', $request->prog)->first();

            if( $prog1 != null ) {
                
                $comp1 = Composition::where('song_id', $request->id)->where('progression_id', $request->old_progid)->first();

                $comp1->progression_id = $prog1->id;

                $comp1->save();

                $old_prog = Progression::where('id', $request->old_progid)->first();

                $old_prog->delete();

                return json_encode(array('id' => $prog1->id));

            }

            else {

                $old_prog = Progression::where('id', $request->old_progid)->first();

                $old_prog->prog = $request->prog;

                $old_prog->save();

                return json_encode(array('id' => $old_prog->id));

            }

        }
    }

    public function deleteProg(){

        $request = request();

        //Controllo se esistono canzoni con la stessa vecchia progressione

        if (Composition::where('progression_id', $request->progid)->whereNotIn('song_id', [$request->songid])->count() > 0) {

            $comp = Composition::where('progression_id', $request->progid)->where('song_id', $request->songid);

            $comp->delete();

            return json_encode(array('ok' => true));
    
        }

        else {

            $comp = Composition::where('progression_id', $request->progid)->where('song_id', $request->songid);

            $comp->delete();

            $prog = Progression::where('id', $request->progid);

            $prog->delete();

            return json_encode(array('ok' => true));

        }
    }
}
?>
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progression extends Model
{
    
    protected $table = 'progressions';

    protected $fillable = [
        'prog',
        'n_chords',
        'user_id'
    ];

    public $timestamps = false;

    public function user() {
        return $this -> belongsTo("App\Models\User");
    }

    public function composition() {
        return $this -> hasMany("App\Models\Composition");
    }

}

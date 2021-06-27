<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Composition extends Model
{
    
    protected $table = 'compositions';

    protected $fillable = [
        'song_id',
        'progression_id',
        'user_id'
    ];

    public $timestamps = false;

    public function user() {
        return $this -> belongsTo("App\Models\User");
    }

    public function progression() {
        return $this -> belongsTo("App\Models\Progression");
    }

}

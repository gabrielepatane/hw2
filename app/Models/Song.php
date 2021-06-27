<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    
    protected $table = 'songs';

    protected $fillable = [
        'id',
        'user_id',
        'content'
    ];

    protected $casts = [
        'id' => 'string',
        'content' => 'array'
    ];

    public $timestamps = false;

    public function user() {
        return $this -> belongsTo("App\Models\User");
    }

    public function composition() {
        return $this -> belongsToMany("App\Models\Composition");
    }

}

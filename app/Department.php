<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model {

    protected $fillable = [
        'title',
        'slug'
    ];

    public function employees() {
        return $this->hasMany('App\Employee');
    }

}

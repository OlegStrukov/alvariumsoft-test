<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model {

    protected $fillable = [
        'full_name',
        'date_of_birth',
        'department_id',
        'position',
        'type',
        'payment',
        'cur_m_hours',
    ];

    public function department() {
        return $this->belongsTo('App\Department');
    }

}

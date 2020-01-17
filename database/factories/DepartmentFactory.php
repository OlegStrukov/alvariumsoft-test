<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Department;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Department::class, function (Faker $faker) {
    $title = Str::random(5);
    return [
        'title' => $title,
        'slug' => $title,
    ];
});

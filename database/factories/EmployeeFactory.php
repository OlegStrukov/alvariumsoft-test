<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Employee;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Employee::class, function (Faker $faker) {
    $type = random_int(1, 2);
    $payment = 0;
    if ($type == 1) {
        $payment = random_int(1000, 5000);
    } else {
        $payment = random_int(50, 100);
    }
    return [
        'full_name' => $faker->name.' '.$faker->title,
        'date_of_birth' => $faker->dateTimeThisCentury->format('Y-m-d'),
        'department_id' => random_int(1, 5),
        'position' => 'Position' . random_int(1, 10),
        'type' => $type,
        'payment' => $payment,
        'cur_m_hours' => random_int(30, 50),
    ];
});

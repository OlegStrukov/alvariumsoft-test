<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'api'], function () {

    Route::get('/get-employees', 'api\EmployeeController@index');
    Route::get('/get-departments', 'api\DepartmentController@index');

    //Route::post('/users-frontend/{user}/update', 'frontend\UserController@update');

    //favorites
//    Route::get('/fovorites-frontend/list', 'frontend\FavoriteController@index');
//    Route::post('/fovorites-frontend/create', 'frontend\FavoriteController@create');
//    Route::get('/fovorites-frontend/check-favorites', 'frontend\FavoriteController@checkFavorites');


});

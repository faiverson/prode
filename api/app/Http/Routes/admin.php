<?php
Route::group(['namespace' => 'Auth', 'middleware' => 'domain'], function () {
	Route::post('/users/signup', 'UsersController@signup');
	Route::post('/users/password', 'PasswordController@postEmail');
	Route::post('/users/password/reset', 'PasswordController@postReset');

	Route::post('/admin/login', 'AuthController@admin');
	Route::post('/users/login', 'AuthController@login');
	Route::post('/users/logout', 'AuthController@logout');
});

Route::group(['middleware' => 'domain'], function () {
    Route::group(['middleware' => ['jwt.auth', 'role:admin']], function () {
		Route::get('/seasons', 'SeasonsController@index');
		Route::get('/seasons/{season_id}/fixture', 'FixturesController@index')->where('season_id', '[0-9]+');
		Route::put('/seasons/{season_id}/fixture/{id}', 'FixturesController@update')->where('season_id', '[0-9]+')->where('id', '[0-9]+');

		Route::get('/seasons/{season_id}/fixture/{fixture_id}/games', 'GamesController@index')->where('season_id', '[0-9]+')->where('fixture_id', '[0-9]+');
		Route::post('/seasons/{season_id}/fixture/{fixture_id}/games', 'GamesController@update')->where('season_id', '[0-9]+')->where('fixture_id', '[0-9]+');
    });
});
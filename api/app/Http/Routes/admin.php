<?php
Route::group(['namespace' => 'Auth', 'middleware' => 'domain'], function () {
	Route::post('/users/signup', 'UsersController@signup');
	Route::post('/users/password', 'PasswordController@postEmail');
	Route::post('/users/password/reset', 'PasswordController@postReset');

	Route::post('/admin/login', 'AuthController@admin');
	Route::post('/users/login', 'AuthController@login');
	Route::post('/users/logout', 'AuthController@logout');
});
<?php
Route::get('/', function () {
    return response()->ok('PRODE API');
});

//Route::get('/testing', function () {
//	$transaction = App\Models\Transaction::find(108);
//	Event::fire(new \App\Events\CheckoutEvent($transaction));
//	return response()->ok('RVM API');
//});

//Event::listen('illuminate.query', function($query, $params)
//{
//	print $query.'<br>';
//	var_dump($params);
////	exit;
//});
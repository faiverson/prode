<?php

return [

	'limit' => 10,

	'from' => 'Fabian Torres',

	'admin' => 'system@prode.com',

	'admin_site' => env('ADMIN_URL'),

	'salt' => env('ENCRYPT_SALT', "CXRhW%r:m1rpq.a4'c{(-/98Q[Z^8i"),

	'cors' => env('API_CORS', ''),

	'expire_password' => 2, // time in hs
];


<?php

namespace App\Helpers;

use JWTAuth;
use JWTFactory;
use App\Models\User;
use App\Models\Page;
use App\Models\Lead;

class Token {

	public static function getId($request)
	{
		$jwt = JWTAuth::setRequest($request);
		$payload = $jwt->getPayload($jwt->getToken());
		return $payload['sub'];
	}

	public static function getPayload($request)
	{
		$jwt = JWTAuth::setRequest($request);
		$payload = $jwt->getPayload($jwt->getToken());
		return $payload->toArray();
	}

	public static function add($user_id, $expiration = '+7 days', $iss = 'user')
	{
		$user = User::with('roles.permissions')->find($user_id);
		if($user == null) {
			return false;
		}
		$customClaims = $user->toArray();
        $customClaims['iss'] = $iss;
		$customClaims['exp'] = strtotime($expiration, time());
		unset($customClaims['id']);
		return JWTAuth::setIdentifier('id')->fromUser($user, $customClaims);
	}

	public static function refresh($request)
	{
		$old_token = JWTAuth::setRequest($request)->getToken();
		$payload = JWTAuth::setRequest($request)->getPayload();
		$user = User::with('roles.permissions')->find($payload['sub']);
		$customClaims = $user->toArray();
		$customClaims['iss'] = 'user';
		$customClaims['exp'] = strtotime('+7 days', time());
		unset($customClaims['id']);
		$token = JWTAuth::fromUser($user, $customClaims);
		if($token) {
			JWTAuth::invalidate($old_token);
		}
		return $token;
	}

	public static function deprecate($request)
	{
		$token = JWTAuth::setRequest($request)->getToken();
		return JWTAuth::invalidate($token);
	}
}
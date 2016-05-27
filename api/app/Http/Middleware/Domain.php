<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Request;
use Config;
use Log;

/**
 * Class Roles
 *
 * Check permission for a role
 *
 * @package App\Http\Middleware
 */
class Domain
{
	/**
	 * Creates a new instance of the middleware.
	 *
	 * @param Guard $auth
	 */
	public function __construct()
	{
		$this->domains = $this->remove_http(env('DOMAINS'));
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  Closure $next
	 * @param  $perms
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$http_domain = $this->remove_http($request->server('HTTP_ORIGIN'));
		$owner = false;
		$user = $request->user();
		if ($user) {
			$owner = $user->hasRole('owner');
		} 

		if (!$owner) {
			$http = $this->remove_http($request->server('HTTP_ORIGIN'));
			$domains = array_map(function ($item) {
				return $this->remove_http($item);
			}, explode(',', $this->domains));

			if (!in_array($http, $domains)) {
				return response()->error('The domain is not allowed to access ' . $http, 403);
			}
			$request->domain = $http;
		}
		return $next($request);
	}

	private function remove_http($url) {
		$disallowed = array('http://', 'https://');
		foreach($disallowed as $d) {
			if(strpos($url, $d) === 0) {
				return str_replace($d, '', $url);
			}
		}
		return $url;
	}
}

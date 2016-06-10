<?php

namespace App\Http\Controllers;

use App\Repositories\FixtureRepository;
use Illuminate\Http\Request;

class FixturesController extends Controller
{
    public function __construct(FixtureRepository $fixtureRepository)
    {
		parent::__construct();
		$this->gateway = $fixtureRepository;
    }

	/**
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$response = [];
		$limit = $request->limit ? $request->limit : $this->limit;
		$offset = $request->offset ? $request->offset : 0;
		$order_by = $request->sorting ? $request->sorting : ['id' => 'desc'];
		$filters = $request->filter ? $request->filter : [];
		$total = $this->gateway->total($filters);
		if($request->season_id) {
			$filters['season_id'] = $request->season_id;
		}
		if($total > 0) {
			$response = $this->gateway->all(null, $limit, $offset, $order_by, $filters);
		}

		return response()->ok([
			'total' => $total,
			'fixtures' => $response
		]);
	}
//
//	/**
//	 *
//	 * @param  \Illuminate\Http\Request $request
//	 * @return \Illuminate\Http\Response
//	 */
//	public function store(Request $request)
//	{
//		$fields = $request->all();
//		$fields['ip_address'] = $request->ip();
//		if(!array_key_exists('customer_id', $fields) && !$request->user()) {
//			$fields['customer_id'] = $request->customer->id;
//		} else {
//			$fields['customer_id'] = array_key_exists('customer_id', $fields) ? $fields['customer_id'] : $request->user()->customer_id;
//		}
//
//		if($fields['email']){
//			$parts = explode("@", $fields['email']);
//			$fields['stratics_email'] = $parts[0]. "+" .$request->customer->email_identifier.'@'.$parts[1];
//		}
//
//		$user = $this->gateway->create($fields);
//		if (!$user) {
//			return response()->error($this->gateway->errors());
//		}
//		$token = $this->generateToken($user->id);
//		$response = array_merge(compact('token'), ['user' => $user->toArray()]);
//		return response()->ok($response);
//	}
//
//	/**
//	 *
//	 * @param  \Illuminate\Http\Request $request
//	 * @return \Illuminate\Http\Response
//	 */
//	public function update(Request $request)
//	{
//		$user_id = $request->user_id;
//		$fields = $request->all();
//		$response = $this->gateway->edit($fields, $user_id);
//		if (!$response) {
//			return response()->error($this->gateway->errors());
//		}
//		return response()->ok($response);
//	}
//
//	/**
//	 *
//	 * @param  \Illuminate\Http\Request $request
//	 * @return \Illuminate\Http\Response
//	 */
//	public function destroy(Request $request)
//	{
//		$response = $this->gateway->destroy($request->user_id);
//		if (!$response) {
//			return response()->error($this->gateway->errors());
//		}
//		return response()->ok();
//	}
//	protected function generateToken($user_id)
//	{
//		try {
//			$token = Token::add($user_id);
//		} catch (JWTException $e) {
//			return response()->error('Could not create a token', $e->getStatusCode());
//		}
//		return $token;
//	}
}

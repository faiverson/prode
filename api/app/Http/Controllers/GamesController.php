<?php

namespace App\Http\Controllers;

use App\Repositories\MatchRepository;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function __construct(MatchRepository $matchRepository)
    {
		parent::__construct();
		$this->gateway = $matchRepository;
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
        $with = ['home', 'away'];
		if($request->fixture_id) {
			$filters['fixture_id'] = $request->fixture_id;
		}

		$total = $this->gateway->total($filters);
		if($total > 0) {
			$response = $this->gateway->all(null, $limit, $offset, $order_by, $filters, $with);
		}

		return response()->ok([
			'total' => $total,
			'games' => $response
		]);
	}

	/**
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
//	public function store(Request $request)
//	{
//		$fields = $request->all();
//		$user = $this->gateway->create($fields);
//		if (!$user) {
//			return response()->error($this->gateway->errors());
//		}
//		$token = $this->generateToken($user->id);
//		$response = array_merge(compact('token'), ['user' => $user->toArray()]);
//		return response()->ok($response);
//	}

	/**
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request)
	{
		$response = $this->gateway->update_all($request->input('games'));
		if (!$response) {
			return response()->error($this->gateway->errors());
		}
		return response()->ok($response);
	}

	/**
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
//	public function destroy(Request $request)
//	{
//		$response = $this->gateway->destroy($request->user_id);
//		if (!$response) {
//			return response()->error($this->gateway->errors());
//		}
//		return response()->ok();
//	}
}

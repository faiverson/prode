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
		$id = $request->id;
		$response = $this->gateway->update([
            'start_at' => $request->input('start_at'),
            'end_at' =>  $request->input('end_at')
        ], $id);
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

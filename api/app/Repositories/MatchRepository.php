<?php namespace App\Repositories;

use App\Repositories\Contracts\SeasonRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;
use App\Models\Match;

class MatchRepository extends AbstractRepository implements SeasonRepositoryInterface
{
	public function model()
	{
		return Match::class;
	}

	public function create_bulk($data)
	{
		return $this->model->insert($data);
	}
}
<?php namespace App\Repositories;

use App\Repositories\Contracts\SeasonTeamRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;
use App\Models\SeasonTeam;

class SeasonTeamRepository extends AbstractRepository implements SeasonTeamRepositoryInterface
{
	public function model()
	{
		return SeasonTeam::class;
	}

	public function create_bulk($data)
	{
		return $this->model->insert($data);
	}
}
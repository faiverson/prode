<?php namespace App\Repositories;

use App\Repositories\Contracts\TeamRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;
use App\Models\Team;

class TeamRepository extends AbstractRepository implements TeamRepositoryInterface
{
	public function model()
	{
		return Team::class;
	}
}
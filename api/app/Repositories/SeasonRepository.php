<?php namespace App\Repositories;

use App\Repositories\Contracts\SeasonRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;
use App\Models\Season;

class SeasonRepository extends AbstractRepository implements SeasonRepositoryInterface
{
	public function model()
	{
		return Season::class;
	}
}
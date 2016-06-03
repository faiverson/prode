<?php namespace App\Repositories;

use App\Models\Fixture;
use App\Repositories\Contracts\FixtureRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;

class FixtureRepository extends AbstractRepository implements FixtureRepositoryInterface
{
	public function model()
	{
		return Fixture::class;
	}

	public function setFilters($query, $filters)
	{
		foreach($filters as $key => $w) {
			switch($key) {
				case 'number':
					$query = $query->where('number', $w);
					break;
				case 'season_id':
					$query = $query->where('season_id', $w);
					break;
				case 'fixture_id':
					$query = $query->where('id', $w);
					break;
			}
		}
		return $query;
	}
}
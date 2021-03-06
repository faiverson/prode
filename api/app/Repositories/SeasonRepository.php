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

	public function setFilters($query, $filters)
	{
		foreach($filters as $key => $w) {
			switch($key) {
				case 'name':
					$query = $query->where('name', 'LIKE', $w . '%');
					break;
				case 'league_id':
					$query = $query->where('league_id', $w);
					break;
				case 'season_id':
					$query = $query->where('id', $w);
					break;
			}
		}
		return $query;
	}
}
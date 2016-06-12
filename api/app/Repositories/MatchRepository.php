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

	public function setFilters($query, $filters)
	{
		foreach($filters as $key => $w) {
			switch($key) {
				case 'fixture_id':
					$query = $query->where('fixture_id', $w);
					break;
				case 'season_id':
					$query = $query->where('season_id', $w);
					break;
				case 'game_id':
					$query = $query->where('id', $w);
					break;
			}
		}
		return $query;
	}
    
    public function update_all($games)
    {
        foreach ($games as $game) {
            $id = $game['id'];
            unset($game['id']);
            $data = $this->setResult($game);
            if($data['result'] != 'Not played') {
                $this->update($data, $id);
            }

        }
        return true;
    }

    protected function setResult($game)
    {
        if($game['home_result'] !== null && $game['away_result'] !== null) {
            if($game['home_result'] > $game['away_result']) {
                $game['result'] = 'home';
            }
            elseif($game['home_result'] == $game['away_result']) {
                $game['result'] = 'draw';
            }
            else {
                $game['result'] = 'away';
            }
        }

        return $game;
    }
}
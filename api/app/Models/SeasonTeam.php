<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeasonTeam extends Model
{
	protected $table = 'seasons_team';

	public $timestamps = false;

	protected $fillable	 = ['season_id', 'team_id'];

//	public function league()
//	{
//		return $this->belongsTo(\App\Models\Season::class, 'id', 'season_id');
//	}
//
//	public function league()
//	{
//		return $this->belongsTo(\App\Models\League::class, 'id', 'league_id');
//	}

}

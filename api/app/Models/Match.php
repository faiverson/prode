<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
	protected $table = 'matches';

	public $timestamps = false;

	protected $fillable	 = ['fixture_id', 'home_team_id', 'away_team_id', 'home_result', 'away_result', 'result'];

}

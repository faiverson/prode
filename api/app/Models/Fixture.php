<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
	protected $table = 'fixtures';

	public $timestamps = false;

	protected $fillable	 = ['name', 'number', 'season_id', 'start_at', 'end_at'];

	public function matches()
	{
		return $this->belongsTo(\App\Models\Match::class, 'id', 'fixture_id');
	}

	public function season()
	{
		return $this->hasOne(Season::class, 'id', 'season_id');
	}

}

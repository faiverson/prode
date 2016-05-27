<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
	protected $table = 'fixtures';

	public $timestamps = false;

	protected $fillable	 = ['name', 'number', 'season_id', 'start_dt', 'end_dt'];

	public function matches()
	{
		return $this->belongsTo(\App\Models\Match::class, 'id', 'fixture_id');
	}

}

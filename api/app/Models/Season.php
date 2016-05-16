<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
	protected $table = 'seasons';

	public $timestamps = false;

	protected $fillable	 = ['name', 'league_id'];

	public function league()
	{
		return $this->belongsTo(\App\Models\League::class, 'id', 'league_id');
	}

}

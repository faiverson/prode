<?php  namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class League extends Model
{
	protected $table = 'leagues';

	public $timestamps = false;

	protected $fillable	 = ['name'];

	public function seasons()
	{
		return $this->hasMany(\App\Models\Season::class, 'league_id', 'id');
	}

}

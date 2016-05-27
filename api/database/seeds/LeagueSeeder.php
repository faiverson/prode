<?php

use Illuminate\Database\Seeder;
use App\Models\League;
use App\Models\Season;

class LeagueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $league = League::create(['name' => 'Argentina']);

        Season::create([
            'name' => 'Primera Division 2015',
            'league_id' => $league->id
        ]);

        Season::create([
            'name' => 'Primera Division 2016',
            'league_id' => $league->id
        ]);

        Season::create([
            'name' => 'Copa Argentina 2016',
            'league_id' => $league->id
        ]);
    }
}

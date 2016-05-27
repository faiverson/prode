<?php

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teams = [
            'Atletico Rafaela',
            'Atletico Tucuman',
            'Aldosivi',
            'Boca',
            'River',
            'Belgrano',
            'San Lorenzo',
            'Huracan',
            'Estudiantes LP',
            'Gimnasia LP',
            'Velez',
            'Lanus',
            'Godoy Cruz',
            'Defensa y Justicia',
            'Arsenal',
            'Racing',
            'Independiente',
            'Union',
            'Colon',
            'Tigre',
            'Argentinos',
            'Olimpo',
            'Quilmes',
            'Temperley',
            'Newells',
            'Rosario Central',
            'Banfield',
            'Patronato',
            'San Martin SJ',
            'Sarmiento',
            'Crucero',
            'Nueva Chicago',
        ];
        foreach ($teams as $team) {
            Team::create([
                'name' => $team,
            ]);
        }
    }
}

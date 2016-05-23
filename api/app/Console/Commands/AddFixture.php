<?php

namespace App\Console\Commands;

use App\Models\SeasonTeam;
use App\Repositories\SeasonRepository;
use App\Repositories\SeasonTeamRepository;
use App\Repositories\TeamRepository;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Log;


class AddFixture extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'season:fixture';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new fixture';
	
    protected $seasonRepository;
	
    protected $teamRepository;

    protected $seasonTeamRepository;

    protected $season;

    protected $teams;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(SeasonRepository $seasonRepository, TeamRepository $teamRepository, SeasonTeamRepository $seasonTeamRepository)
    {
        parent::__construct();
		$this->seasonRepository = $seasonRepository;
		$this->teamRepository = $teamRepository;
		$this->seasonTeamRepository = $seasonTeamRepository;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
		$this->info('Start fixture');
        $team_home = ['Velez', 'Newells', 'Sarmiento', 'Quilmes', 'Belgrano', 'Union', 'Arsenal', 'Godoy Cruz', 'Gimnasia', 'San Lorenzo', 'Argentinos', 'Banfield', 'Boca', 'Racing', 'Tigre'];
        $team_away = ['Crucero', 'Rosario Central', 'Olimpo', 'Temperley', 'Rafaela', 'Colon', 'Defensa', 'San Martin SJ', 'Estudiantes', 'Huracan', 'Nueva Chicago', 'Lanus', 'River', 'Independiente', 'Aldosivi'];
        $fixture = [];
        $jocker = $team_away[0];
        $jocker_position = 'home';
        $number = 0;
        $prev = $number;
        $team_away = array_reverse($team_away);
        $all_teams = array_merge($team_home, $team_away);
        foreach ($team_home as $key => $team) {
            if($jocker == $team_away[$key]) {
                $fixture[$number][] = ['home' => $jocker, 'away' => $team];
            } else {
                $fixture[$number][] = ['home' => $team, 'away' => $team_away[$key]];
            }

        }
//        $jocker_position = 'away';
        for ($number = 1; $number <= count($team_home); $number++) {
            $teams = array_merge($team_home, $team_away);
            $temp_home = $team_home;
            $tempA = array_slice($temp_home, 0, $number);
            $tempCommonA = array_slice($temp_home, $number);
            $temp_away = $team_away;
            $index_jocker_rival = (integer) floor($number / 2);
            if($jocker_position == 'home') {
                $jocker_position = 'away';
                $jocker_rival = $team_home[$index_jocker_rival];
                $match = ['home' => $jocker_rival, $jocker_position => $jocker];
            }
            else {
                $jocker_position = 'home';
                $jocker_rival = $team_away[count($team_away) - $index_jocker_rival - 1];
                if($jocker_rival == $jocker) {
                    $jocker_rival = $team_away[count($team_away) - $index_jocker_rival - 1];
                }
                $match = [$jocker_position => $jocker, 'away' => $jocker_rival];
            }
            array_splice($temp_away, array_search($jocker, $temp_away), 1);
            $fixture[$number][] = $match;
            if($number % 2 == 0) {
                $home = 'home';
                $away = 'away';
                array_splice($temp_away, array_search($jocker_rival, $temp_away), 1);
            }
            else {
                $home = 'away';
                $away = 'home';
            }

            foreach ($tempCommonA as $key => $team) {
                if(!in_array($team, $tempCommonA)) {
                    continue;
                }
                $index = array_search($team, $temp_home);
                if($index == 0) {
                    $team_link = $team_home[count($team_home) - 1];
                } else {
                    $team_link = $team_home[$index - 1];
                }
                $n = array_search($team_link, array_column($fixture[$prev], $away));
                $rival = array_filter($fixture[$prev][$n], function ($item) use($team_link) {
                    return $item != $team_link;
                });
                $rival_position = array_keys($rival)[0] == 'home' ? 'away' : 'home';;
                $team_position = $rival_position == 'home' ? 'away' : 'home';
                $rival = array_values($rival)[0];
                $match = [$team_position => $team, $rival_position => $rival];
                $fixture[$number][] = $match;
                array_splice($temp_away, array_search($rival, $temp_away), 1);
                array_splice($tempCommonA, array_search($rival, $tempCommonA), 1);
            }

            array_splice($tempA, array_search($jocker_rival, $tempA), 1);
            foreach (array_reverse($tempA) as $key => $team) {
                if(!in_array($team, $tempA)) {
                    continue;
                }
                $index = array_search($team, $team_home);

                if($index == 0) {
                    $team_link = $team_away[0];
                } else {
                    $team_link = $team_home[$index - 1];
                }

                $n = array_search($team_link, array_column($fixture[$prev], $home));
                if($n === false) {
                    $n = array_search($team_link, array_column($fixture[$prev], $away));
                }

                $rival = array_filter($fixture[$prev][$n], function ($item) use($team_link, $jocker) {
                    return $item != $team_link;
                });
//                dd($team, $team_link, $fixture[$prev][$n]);

                $rival_position = array_keys($rival)[0] == 'home' ? 'away' : 'home';
                $rival = array_values($rival)[0];

                if($rival == $jocker) {
                    $n = array_search($team_link, array_column($fixture[$prev - 1], $home));
                    if($n === false) {
                        $n = array_search($team_link, array_column($fixture[$prev - 1], $away));
                    }
                    $rival = $fixture[$prev - 1][$n];
                    $rival_position = array_keys($rival)[0] == 'home' ? 'away' : 'home';
                    $rival = array_values($rival)[0];
//                    if($number == 4) {
//                        dd($team, $fixture[$prev][$n], $rival, $rival_position);
//                    }
//                    $rival_position = array_keys($rival)[0] == 'home' ? 'away' : 'home';
//                    if($number == 5) {
//                        dd($fixture[$prev - 1][$n]);
//                        dd($rival);
//                    }
                }
                $team_position = $rival_position == 'home' ? 'away' : 'home';
                $match = [$team_position => $team, $rival_position => $rival];
                $fixture[$number][] = $match;
//                if($number == 5) {
//                    dd($match);
//                    dd($team, $fixture[$prev][$n][$home]);
//                }
                array_splice($tempA, array_search($rival, $tempA), 1);
            }

            $tempB = array_slice($temp_away, 0, $number);
            $remain = array_diff($tempB, $match);

            foreach ($remain as $key => $team) {
                if(!in_array($team, $remain)) {
                    continue;
                }
                $index = array_search($team, $team_away);

                if($index == 0) {
                    $team_link = $team_away[count($team_away) - 1];
                } else {
                    $team_link = $team_away[$index + 1];
                }
                $n = array_search($team_link, array_column($fixture[$prev], $away));


                if($n === false) {
                    $n = array_search($team_link, array_column($fixture[$prev], $home));
                }
                $rival = array_filter($fixture[$prev][$n], function ($item) use($team_link, $jocker) {
                    return $item != $team_link;
                });

                $rival_position = array_keys($rival)[0] == 'home' ? 'away' : 'home';
                $rival = array_values($rival)[0];

                if($rival == $jocker) {
                    $n = array_search($team_link, array_column($fixture[$prev - 1], $away));
                    if($n === false) {
                        $n = array_search($team_link, array_column($fixture[$prev - 1], $home));
                    }
                    $rival = $fixture[$prev - 1][$n][$away];
                }

                $team_position = $rival_position == 'home' ? 'away' : 'home';
                $match = [$team_position => $team, $rival_position => $rival];
                $fixture[$number][] = $match;
                array_splice($remain, array_search($team, $remain), 1);
                array_splice($remain, array_search($rival, $remain), 1);
            }
            $prev = $number;
        }
    }
}

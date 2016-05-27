<?php

namespace App\Console\Commands;

use App\Models\SeasonTeam;
use App\Repositories\SeasonRepository;
use App\Repositories\SeasonTeamRepository;
use App\Repositories\TeamRepository;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Log;


class AddSeasonTeam extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'season:teams';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new season';
	
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
		$this->info('Adding teams to season');
        $season_list = $this->seasonRepository->all(null, null, null, ['name'=>'asc']);
        $teams_list = $this->teamRepository->all(null, null, 0, ['name'=>'asc']);

        $season_array = $season_list->pluck('name')->toArray();
        $season = $this->choice('What is the season name', $season_array);
        $this->season = $season_list[array_search($season, $season_array)];
        $continue = true;

        $team_array = $teams_list->pluck('name')->toArray();
        if (!$this->confirm('Do you want to finish? [yes|no]')) {
            while ($continue) {
                $team = $this->choice('What team do you want to exclude?', $team_array);
                $index = array_search($team, $team_array);
                $teams_list->splice($index, 1);
                array_splice($team_array, $index, 1);
                if ($this->confirm('Do you want to finish? [y|N]')) {
                    $continue = false;
                }
            }
        }
        $this->teams = $teams_list;

        $bulk = $teams_list->transform(function ($item, $key) {
            return (array)['season_id' => $this->season->id, 'team_id' => $item->id];
        });

        $this->seasonTeamRepository->create_bulk($bulk->toArray());
        $this->info($bulk);
        $this->info('Finished! Teams added to league');
    }
}

<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Starting to seed Users");
        // creates the admin user
		$role = Role::where('name', 'admin')->first();
		User::create([
			'first_name' => 'fabian',
			'last_name' => 'torres',
			'username' => 'fabian',
			'email' => 'fabian@gmail.com',
			'password' => 'admin'
		])->attachRole($role->id);

		User::create([
			'first_name' => 'juan',
			'last_name' => 'borda',
			'username' => 'juan',
			'email' => 'juan@borda.com',
			'password' => 'admin'
		])->attachRole($role->id);

		if (App::Environment() === 'local') {
			$this->fakeUsers();
		}
    }

	protected function fakeUsers()
	{
		$faker = Faker::create();
		// common users
		$total_batch = 5;
		$by_bath = 30;
		foreach(range(1, $total_batch) as $batch) {
			$this->command->info("Starting batch " . $batch . " of " . $total_batch);
			$users = [];

			foreach (range(1, $by_bath) as $index) {
				$total = $index * $batch - 1;
				try {
					User::create([
						'first_name' => $faker->firstName,
						'last_name' => $faker->lastName,
						'username' => str_replace('.', '_', $faker->unique()->userName),
						'email' => $faker->unique()->email,
						'password' => 'password',
						'phone' => rand(0,2) == 0 ? $faker->phoneNumber : null,
						'ip_address' => $faker->ipv4,
						'created_at' => $faker->dateTimeThisYear('now'),
						'updated_at' => $faker->dateTimeThisYear('now')
					]);
				} catch (Exception $e) {
					var_dump($e);
				}
			}

		}
	}
}

<?php

use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Starting to seed permissions");
		$adminP = Permission::create([
			'name' => 'admin',
			'display_name' => 'Admin',
			'description' => 'Allow to access admin in the system',
		]);
		$userP = Permission::create([
			'name' => 'user',
			'display_name' => 'User',
			'description' => 'Allow to users info in the system',
		]);

		$this->command->info("Starting to seed roles");
        Role::create([
			'name' => 'admin',
			'display_name' => 'Administrator',
			'description' => 'This role is an admin'
        ])->attachPermissions([$adminP, $userP]);

		Role::create([
			'name' => 'user',
			'display_name' => 'User',
			'description' => 'This role is an editor'
		])->attachPermission($userP);
    }
}

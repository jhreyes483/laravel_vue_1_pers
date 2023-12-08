<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create(['name'=> 'Admin']);
        $role2 = Role::create(['name'=> 'Consultor']);

        Permission::create(['name' => 'table.medication']);
        Permission::create(['name' => 'table.investment']);
        Permission::create(['name' => 'table.inventory']);
        Permission::create(['name' => 'table.medication_register']);


        
    }
}

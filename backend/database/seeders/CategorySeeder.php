<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::upsert([
            ['name' => 'To Do','position' => 1],
            ['name' => 'In Progress','position' => 2],
            ['name' => 'Done','position' => 3],
        ],['name','position']);
    }
}

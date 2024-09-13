<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AbsensiMasuk;
use App\Models\DataJadwal;
use App\Models\DataMapel;
use App\Models\DataSiswa;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $this->call([
            DataKelasSeeder::class,
        ]);
        DataMapel::factory(10)->create();
        DataSiswa::factory(70)->create();
        DataJadwal::factory(30)->create();
        AbsensiMasuk::factory(100)->create();
    }
}

<?php

namespace Database\Seeders;

use App\Models\DataKelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        DataKelas::create([
            'kd_kelas' => 'k001',
            'nama_kelas' => 'VIIA',
        ]);
        DataKelas::create([
            'kd_kelas' => 'k002',
            'nama_kelas' => 'VIIB',
        ]);
        DataKelas::create([
            'kd_kelas' => 'k003',
            'nama_kelas' => 'VIIIA',
        ]);
        DataKelas::create([
            'kd_kelas' => 'k004',
            'nama_kelas' => 'VIIIB',
        ]);
        DataKelas::create([
            'kd_kelas' => 'k005',
            'nama_kelas' => 'IXA',
        ]);
        DataKelas::create([
            'kd_kelas' => 'k006',
            'nama_kelas' => 'IXB',
        ]);
    }
}

<?php

namespace Database\Factories;

use App\Models\DataJadwal;
use App\Models\DataSiswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AbsensiMasuk>
 */
class AbsensiMasukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'data_jadwal_id' => fake()->randomElement(DataJadwal::get()->pluck('id')),
            'data_siswa_id' => fake()->randomElement(DataSiswa::get()->pluck('id')),
            'tanggal' => fake()->dateTimeBetween('-1 years', 'now'),
            'jam_absen' => rand(7, 10) . ':00',
            'status_absen' => fake()->randomElement(['on time', 'terlambat']),
            'status_kehadiaran' => fake()->randomElement(['alpha', 'hadir']),
        ];
    }
}

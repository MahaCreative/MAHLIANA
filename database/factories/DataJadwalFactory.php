<?php

namespace Database\Factories;

use App\Models\DataKelas;
use App\Models\DataMapel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataJadwal>
 */
class DataJadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'data_kelas_id' => fake()->randomElement(DataKelas::get()->pluck('id')),
            'data_mapel_id' => fake()->randomElement(DataMapel::get()->pluck('id')),
            'hari' => fake()->randomElement(['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']),
            'jam_masuk' => rand(7, 12) . ':00',
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\DataKelas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataSiswa>
 */
class DataSiswaFactory extends Factory
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
            'nis' => rand(111111111, 999999999),
            'nama' => fake()->name(),
            'jenis_kelamin' => fake()->randomElement(['laki-laki', 'perempuan']),
            'tanggal_lahir' => fake()->dateTimeBetween('-19 years', 'now'),
        ];
    }
}

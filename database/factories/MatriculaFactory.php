<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matricula>
 */
class MatriculaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fecha' => $faker->dateTimeBetween('2020-01-01', '2024-12-31')->format('Y-m-d H:i:s'), // Fecha aleatoria
            'nota' => $faker->randomFloat(1, 0, 10, 20), // Nota aleatoria con 1 decimal entre 0 y 10
            'estado' => $faker->randomElement(['Aprobado', 'Desaprobado', 'Pendiente']), // Estado aleatorio
            'estudiante_id' => $faker->numberBetween(1, 10), // ID aleatorio del estudiante
            'grupo_id' => $faker->numberBetween(1, 10), // ID aleatorio del grupo
            'pago_id' => $faker->numberBetween(1, 10), // ID aleatorio de pago
            'created_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
            'updated_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),

        ];
    }
}

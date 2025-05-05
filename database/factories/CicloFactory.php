<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ciclo>
 */
class CicloFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
         
            'nombre' => $this->faker->randomElement(['Básico', 'Intermedio', 'Avanzado']), // Nombre del ciclo
            'nivel' => $this->faker->randomElement([1, 2, 3, 4]), // Nivel del ciclo
            'idioma_id' => 1, // ID del idioma
            'created_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-01'), // Fecha de creación aleatoria
            'updated_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-01'), // Fecha de actualización aleatoria
        ];
       
    }
}

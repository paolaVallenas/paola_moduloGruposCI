<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Docente>
 */
class DocenteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombres' => $this->faker->firstName(), // Nombre
            'aPaterno' => $this->faker->lastName(), // Apellido Paterno
            'aMaterno' => $this->faker->lastName(), // Apellido Materno
            'sexo' => $this->faker->randomElement(['masculino', 'femenino']), // Sexo
            'dni' => $this->faker->numerify('#########'), // DNI (9 dígitos)
            'celular' => $this->faker->phoneNumber(), // Número de celular
            'fechaNacimiento' => $this->faker->date('Y-m-d', '2000-01-01'), // Fecha de nacimiento
            'emailInstitucional' => strtolower($this->faker->firstName() . '.' . $this->faker->lastName()) . '@istta.edu.pe', // Correo institucional
            'fotoDocente' => $this->faker->imageUrl(200, 200, 'people'), // Foto
            'user_id' => 1, // Asignar siempre el valor 1
            'created_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-01'), // Fecha de creación aleatoria
            'updated_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-01'), // Fecha de actualización aleatoria
        ];
    }
}

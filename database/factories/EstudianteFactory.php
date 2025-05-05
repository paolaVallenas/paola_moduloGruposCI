<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estudiante>
 */
class EstudianteFactory extends Factory
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
            'dni' => $this->faker->numerify('#########'), // DNI (9 dígitos)
            'sexo' => $this->faker->randomElement(['masculino', 'femenino']), // Sexo: 'masculino' o 'femenino'
            'celular' => $this->faker->phoneNumber(), // Número de celular
            'email' => $this->faker->email(), // Email
            'emailInstitucional' => strtolower($this->faker->firstName().'.'.$this->faker->lastName()).'@istta.edu.pe', // Correo institucional en minúsculas
            'programaEstudios' => $this->faker->randomElement(['DSi', 'T.E', 'Electronica E', 'Contabilidad', 'Turismo', 'Mecanica', 'Mecatronica']), // Programa de estudios
            'user_id' => 1, // Asignar siempre el valor 1
            'created_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
            'updated_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grupo>
 */
class GrupoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ];

        return [
            'modalidad' => $this->faker->randomElement(['Presencial', 'Virtual']), // Modalidad del curso
            'periodo' => $this->faker->year().' - '.$meses[$this->faker->numberBetween(0, 11)], // Año y mes en letras
            'nroEstudiantes' => $this->faker->numberBetween(20, 100), // Número de estudiantes
            'nroVacantes' => $this->faker->numberBetween(5, 50), // Número de vacantes
            'horario' => $this->faker->time('H:i'), // Hora del curso (formato HH:MM)

        ];
    }
}

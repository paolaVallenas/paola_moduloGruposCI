<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pago>
 */
class PagoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'fecha' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-01')->format('Y-m-d H:i:s'), // Fecha aleatoria en el rango especificado 
            'nroComprobante' => $this->faker->unique()->numerify('####-####-####'), // Número de comprobante en formato '####-####-####'
            'monto' => $this->faker->randomFloat(2, 10, 1000), // Monto aleatorio con 2 decimales entre 10 y 1000
            'medioPago' => $this->faker->randomElement(['Cajaintitucional', 'BancoNacion']), // Medio de pago aleatorio
            'imgComprobante' => $this->faker->imageUrl(400, 300, 'business', true, 'invoice'), // URL de una imagen relacionada con el comprobante
            'created_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
            'updated_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
        ];
      
    }
}

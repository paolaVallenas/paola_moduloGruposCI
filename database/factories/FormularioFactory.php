<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formulario>
 */
class FormularioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'nombres' => $this->faker->firstName,  // Genera un nombre completo (primer nombre
            'aPaterno' => $this->faker->lastName,  // Genera un apellido paterno
            'aMaterno' => $this->faker->lastName,  // Genera un apellido materno
            'dni' => $this->faker->unique()->numerify('########'),  // Genera un DNI único, con 8 dígitos numéricos
            'sexo' => $this->faker->randomElement(['Masculino', 'Femenino']),  // Genera aleatoriamente el sexo de la persona
            'celular' => $this->faker->unique()->numerify('9########'),  // Genera un número de celular único (8 dígitos)
            'fechaNacimiento' => $this->faker->date('Y-m-d', '2000-01-01'),  // Genera una fecha de nacimiento, asegurando que sea antes del 1 de enero de 2000
            'tipoAlumno' => $this->faker->randomElement(['egresado', 'no_alumno', 'alumno']),  // Genera el tipo de alumno (egresado, no alumno o alumno)
            'programaEstudios' => $this->faker->randomElement(['DSi', 'T.E', 'Electronica E', 'Contabilidad', 'Turismo', 'Mecanica', 'Mecatronica']),  // Genera el programa de estudios al que pertenece el alumno
            'semestre' => $this->faker->randomElement(['I', 'II', 'III', 'IV', 'V', 'VI']),  // Genera un semestre aleatorio (I-VI)
            'correoInstitucional' => strtolower($this->faker->firstName.'.'.$this->faker->lastName).'@istta.edu.pe',  // Genera un correo institucional en minúsculas (ejemplo: nombre.apellido@istta.edu.pe)
            'email' => $this->faker->unique()->safeEmail,  // Genera un correo electrónico único y seguro
            'anioEgreso' => $this->faker->year('now'),  // Genera el año de egreso (el año actual)
            'institucionProviene' => $this->faker->company,  // Genera el nombre de la institución de la que proviene el alumno
            'medioPublicitario' => $this->faker->randomElement(['facebook', 'folletos', 'amigos', 'familiares', 'anuncios', 'pagina_web']),  // Genera el medio publicitario por el cual el alumno conoció el instituto
            'cicloIngles' => $this->faker->randomElement(['BASICO - QUECHUA-1']),  // Genera el ciclo de inglés que está cursando el alumno
            'horarioIngles' => $this->faker->randomElement(['12:00PM - 1:00PM']),  // Genera el horario de clases de inglés
            'tieneCertificadoIngles' => $this->faker->boolean,  // Genera un valor booleano aleatorio para saber si el alumno tiene certificado de inglés
            'realizoInglesBasico' => $this->faker->boolean,  // Genera un valor booleano aleatorio para saber si el alumno realizó inglés básico
            'realizoInglesIntermedio' => $this->faker->boolean,  // Genera un valor booleano aleatorio para saber si el alumno realizó inglés intermedio
            'nroComprobante' => $this->faker->unique()->numerify('COM#####'),  // Genera un número de comprobante único, con el prefijo 'COM' seguido de 5 dígitos
            'fechaPago' => $this->faker->date('Y-m-d', 'now'),  // Genera una fecha de pago, que será el día de hoy
            'montoPago' => $this->faker->randomFloat(2, 100, 500),  // Genera un monto de pago aleatorio con 2 decimales, entre 100 y 500
            'medioPago' => $this->faker->randomElement(['BancoNacion', 'CajaInstitucinal']),  // Genera el medio de pago utilizado (Banco Nación o Caja Institucional)
            'imgComprobante' => $this->faker->imageUrl(640, 480, 'business'),  // Genera una URL de imagen de un comprobante de pago de tamaño 640x480, con temática 'business'
            'estado' => $this->faker->randomElement(['Pendiente']),  // Genera el estado del pago (en este caso solo 'Pendiente')
            'created_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-31'),  // Genera la fecha y hora de creación del registro en un rango entre el 01 de enero y 31 de diciembre de 2024
            'updated_at' => $this->faker->dateTimeBetween('2024-01-01', '2024-12-31'),  // Genera la fecha y hora de actualización del registro, en el mismo rango de fechas

        ];
    }
}

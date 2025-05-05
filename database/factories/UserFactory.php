<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            /*'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),*/
            //PARA CREAR USUARIO ADMIN
            'name' => 'Cuenta de Administrador',
            'email' => 'admin@gmail.com',
            'tipoUsuario' => 'admin',
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('passAdmin'),
            'remember_token' => Str::random(10),
            //PARA CREAR USUARIO ESTUDIANTE
            /*'name' => 'Cuenta de Estudiante',
            'email' => 'estudiante@gmail.com',
            'tipoUsuario' => 'est',
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('passEstudiante'),
            'remember_token' => Str::random(10),*/
            // PARA CREAR USUARIO DOCENTE
            /*'name' => 'Cuenta de Docente',
            'email' => 'docente@gmail.com',
            'tipoUsuario' => 'doc',
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('passDocente'),
            'remember_token' => Str::random(10),*/
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

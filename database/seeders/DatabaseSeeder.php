<?php

namespace Database\Seeders;

use App\Models\Ciclo;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Docente;
use App\Models\Estudiante;
use App\Models\Formulario;
use App\Models\Grupo;
use App\Models\Pago;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Matricula::factory(100)create();
        // Pago::factory(100)->create();
        //  Grupo::factory(100)->create();
        // Estudiante::factory(100)->create();
        // Docente::factory(1000)->create();
        // Ciclo::factory(1000)->create();
        //  Formulario::factory(1000)->create();

        // User::factory(10)->create();

        User::factory()->create([
            // para admin
            'name' => 'Cuenta Administrador',
            'email' => 'admin@gmail.com',
            'tipoUsuario' => 'admin',
            // para estudiante
            /*'name' => 'Cuenta Estudiante',
             'email' => 'estudiante@gmail.com',
             'tipoUsuario' => 'est',*/
            // para docente
        /*'name' => 'Cuenta Docente',
             'email' => 'docente@gmail.com',
             'tipoUsuario' => 'doc',*/]);

    }
}

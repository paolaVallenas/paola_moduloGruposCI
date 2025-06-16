<?php

use App\Http\Controllers\CicloController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\IdiomaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página de inicio redirige directamente al dashboard del admin
Route::get('/', function () {
    return Inertia::render('Administrador/Dashboard');
})->name('dashboard');
Route::get('/dashboard', [GrupoController::class, 'dashboard'])->name('dashboard');


// RUTAS LIBRES (sin middleware ni login)
Route::resource('idioma', IdiomaController::class);
Route::resource('ciclo', CicloController::class);
Route::resource('docente', DocenteController::class);
Route::resource('grupo', GrupoController::class);

// Gestión de estudiantes por grupo (acceso libre)
Route::get('/gestionestudiantesgrupo', function () {
    $grupos = App\Models\Grupo::with(['estudiantes', 'docente', 'ciclo.idioma'])->get();

    return Inertia::render('Administrador/Grupos/GestionEstudiantesGrupo', [
        'grupos' => $grupos,
    ]);
})->name('gestion.estudiantes.grupo');

// Ruta para ver el reporte de estudiantes de un grupo
Route::get('/reporte-estudiantes-grupo/{grupoId}', [GrupoController::class, 'generarReporte'])
    ->name('reporte.estudiantes.grupo');

// Rutas que ya no se necesitan (comentadas o eliminadas)
// Route::post('/formulario', [FormularioController::class, 'store'])->name('formulario.store');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// Route::get('/verificar-certificado/{codigo}', [FuncionEstudianteController::class, 'verificar'])->name('verificar.certificado');

// Route::middleware('EsAdmin')->group(function () { ... });
// Route::middleware('EsEstudiante')->group(function () { ... });
// Route::middleware('EsDocente')->group(function () { ... });

// require __DIR__.'/auth.php';

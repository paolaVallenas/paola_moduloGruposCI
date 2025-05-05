<?php

use App\Http\Controllers\CicloController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EstadisticasController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\FuncionAdminController;
use App\Http\Controllers\FuncionDocenteController;
use App\Http\Controllers\FuncionEstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\IdiomaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\ProfileController;
use App\Models\Grupo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Pagina de Inicio
Route::get('/', function () {
    $grupos = Grupo::with(['ciclo.idioma', 'docente'])->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'ListaGrupos' => $grupos,
    ]);
});

Route::post('/formulario', [FormularioController::class, 'store'])->name('formulario.store');
// Para Todos los Usuarios
// verifica que sea un usuario
Route::get('/inicio', function () {
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified', 'InterfazUsuario'])->name('dashboard');
// verifica el tipo de usuario
Route::get('/dashboard', function () {
    $rol = Auth::user()->tipoUsuario;
    if ($rol === 'admin') {
        return Inertia::render('Administrador/Dashboard');
    } elseif ($rol === 'est') {
        return Inertia::render('Estudiante/Dashboard');
    } elseif ($rol === 'doc') {
        return Inertia::render('Docente/Dashboard');
    }
})->middleware(['auth', 'verified'])->name('DUsuario');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// verificar certificados
Route::get('/verificar-certificado/{codigo}', [FuncionEstudianteController::class, 'verificar'])->name('verificar.certificado');

// Para Administrador
Route::middleware('EsAdmin')->group(function () {
    Route::get('/formulario', [FormularioController::class, 'index'])->name('formulario.index');
    Route::resource('idioma', IdiomaController::class);
    Route::resource('ciclo', CicloController::class);
    Route::resource('docente', DocenteController::class);
    Route::resource('matricula', MatriculaController::class);
    Route::resource('grupo', GrupoController::class);
    Route::resource('/estadisticas', EstadisticasController::class);
    Route::post('/estadisticas/filtrar', [EstadisticasController::class, 'filtrar']);
    Route::post('/formularios/{id}/aceptar', [FormularioController::class, 'aceptar'])->name('formularios.aceptar');
    Route::post('/formularios/{id}/rechazar', [FormularioController::class, 'rechazar'])->name('formularios.rechazar');
    Route::get('/gestionestudiantesgrupo', function () {
        $grupos = App\Models\Grupo::with(['estudiantes', 'docente', 'ciclo.idioma'])->get();

        return Inertia::render('Administrador/Grupos/GestionEstudiantesGrupo', [
            'grupos' => $grupos,
        ]);
    })->name('gestion.estudiantes.grupo');

    Route::get('/usuarios', [FuncionAdminController::class, 'index'])->name('usuarios.index');
    Route::get('/certificados', [FuncionAdminController::class, 'inicioCert'])->name('certificados.index');
    Route::get('/datacertificados', [FuncionAdminController::class, 'dataCert']);

    Route::post('/aprobar', [FuncionAdminController::class, 'aprobar'])->name('matricula.aprobar');
    Route::post('/rechazar', [FuncionAdminController::class, 'rechazar'])->name('matricula.rechazar');

    Route::get('/reporte-estudiantes-grupo/{grupoId}', [GrupoController::class, 'generarReporte'])
        ->name('reporte.estudiantes.grupo');

    Route::post('/generar', [FuncionAdminController::class, 'generarCertificado'])->name('generar.certificado');

    Route::get('/mostrarQR/{id}', [FuncionAdminController::class, 'mostrarCertificado'])->name('mostrar.certificado');
});

// Para Estudiante
Route::middleware('EsEstudiante')->group(function () {
    Route::get('estudiante', [FuncionEstudianteController::class, 'registrar'])->name('estudiante.registrar');
    Route::get('estudiante/ver', [FuncionEstudianteController::class, 'ver'])->name('estudiante.ver');
    Route::post('estudiante/enviar', [FuncionEstudianteController::class, 'enviar'])->name('estudiante.enviar');
});

// Para Docente
Route::middleware('EsDocente')->group(function () {
    Route::get('docentes', [FuncionDocenteController::class, 'verGrupos'])->name('docentes.verGrupos');
    Route::post('/docentes/guardar-nota', [FuncionDocenteController::class, 'guardarNota'])->name('docente.guardar-nota');
    Route::get('/reporte-grupo/{grupoId}', [FuncionDocenteController::class, 'generarReporteGrupo'])
        ->name('docente.reporte.grupo');
    Route::get('/docentes/asistencias', [FuncionDocenteController::class, 'registrarAsistencias'])->name('docentes.registrarAsistencias');
});

require __DIR__.'/auth.php';

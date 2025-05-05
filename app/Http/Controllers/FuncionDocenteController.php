<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Grupo;
use App\Models\Matricula;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FuncionDocenteController extends Controller
{
    public function verGrupos()
    {
        try {
            // Load the docente with user and grupos relationship
            $docente = Docente::with(['user', 'grupos.ciclo', 'grupos.estudiantes', 'grupos.matriculas'])
                ->where('user_id', Auth::id())
                ->first();

            if (! $docente) {
                return Inertia::render('Docente/VerGrupos', [
                    'error' => 'No se encontraron datos del docente',
                ]);
            }

            return Inertia::render('Docente/VerGrupos', [
                'docente' => $docente,
                'grupos' => $docente->grupos,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Docente/VerGrupos', [
                'error' => 'Error al cargar los datos del docente: '.$e->getMessage(),
            ]);
        }
    }

    public function guardarNota(Request $request)
    {
        try {
            $request->validate([
                'matricula_id' => 'required|exists:matriculas,id',
                'nota' => 'required|numeric|min:0|max:20',
            ]);

            $matricula = Matricula::findOrFail($request->matricula_id);
            $matricula->nota = $request->nota;
            $matricula->save();

            return back()->with('success', 'Nota guardada correctamente')->with('matricula', $matricula);
        } catch (\Exception $e) {
            return back()->with('error', 'Error al guardar la nota: '.$e->getMessage());
        }
    }

    public function generarReporteGrupo($grupoId)
    {
        try {
            $grupo = Grupo::with([
                'docente',
                'ciclo.idioma',
                'estudiantes' => function ($query) use ($grupoId) {
                    $query->with(['matricula' => function ($query) use ($grupoId) {
                        $query->where('grupo_id', $grupoId);
                    }]);
                },
            ])->findOrFail($grupoId);

            $pdf = PDF::loadView('reportes.estudiantes-grupo-docente', [
                'grupo' => $grupo,
                'estudiantes' => $grupo->estudiantes,
            ]);

            return $pdf->download('reporte-estudiantes-'.$grupo->periodo.'.pdf');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al generar el reporte: '.$e->getMessage()], 500);
        }
    }

    public function registrarAsistencias()
    {
        return Inertia::render('Docente/RegistrarAsistencias');
    }
}

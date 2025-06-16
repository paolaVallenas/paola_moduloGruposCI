<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Docente;
use App\Models\Grupo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;  // Corregir el import del PDF

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grupos = Grupo::with(['ciclo.idioma', 'docente', 'estudiantes'])->paginate(10); // Añadimos 'estudiantes' a la relación
        $ciclos = Ciclo::with('idioma')->get(); // Cargar el idioma junto con el ciclo
        $docentes = Docente::all();

        return Inertia::render('Administrador/Grupos/Index', [
            'grupos' => $grupos,
            'ciclos' => $ciclos,
            'docentes' => $docentes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function dashboard()
{
    return Inertia::render('Administrador/Dashboard');
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'periodo' => 'required|string',
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'required|integer',
            'nroVacantes' => 'required|integer',
            'horario' => 'required|string',
            'docente_id' => 'required|exists:docentes,id',
            'ciclo_id' => 'required|exists:ciclos,id',
        ]);

        Grupo::create($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grupo $grupo)
    {
        $request->validate([
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'integer',
            'nroVacantes' => 'required|integer',
            'horario' => 'required|string',
            'docente_id' => 'required|exists:docentes,id',
            'ciclo_id' => 'required|exists:ciclos,id',
        ]);

        $grupo->update($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function generarReporte($grupoId)
    {
        try {
            $grupo = Grupo::with(['estudiantes', 'docente', 'ciclo.idioma'])->findOrFail($grupoId);

            // Verificar que el grupo existe y tiene la información necesaria
            if (! $grupo || ! $grupo->docente || ! $grupo->ciclo || ! $grupo->ciclo->idioma) {
                return back()->with('error', 'No se encontró toda la información necesaria para generar el reporte.');
            }

            $pdf = PDF::loadView('reportes.estudiantes-grupo', [
                'grupo' => $grupo,
                'estudiantes' => $grupo->estudiantes,
            ]);

            return $pdf->download("reporte-grupo-{$grupoId}.pdf");
        } catch (\Exception $e) {
            Log::error('Error al generar el reporte: '.$e->getMessage());

            return back()->with('error', 'Ocurrió un error al generar el reporte.');
        }
    }
}

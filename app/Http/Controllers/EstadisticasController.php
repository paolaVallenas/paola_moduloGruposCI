<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EstadisticasController extends Controller
{
    // Método que genera estadísticas para el mes y año actuales o cualquier mes y año
    public function index(Request $request)
    {
        // Si no se recibe mes o año, usamos los valores actuales por defecto
        $month = $request->input('month', now()->month);  // Mes actual por defecto
        $year = $request->input('year', now()->year);    // Año actual por defecto

        // Obtener los datos de tipos de alumnos y medios publicitarios
        $tiposAlumnos = $this->getEstadisticas($month, $year, 'tipoAlumno');
        $medioPublicitario = $this->getEstadisticas($month, $year, 'medioPublicitario');
        
        // Se obtiene toda la data de formularios (si es necesario para la vista)
        $datos = Formulario::all();

        // Retorna la vista con los datos obtenidos
        return Inertia::render('Administrador/Estadisticas/Estadisticas', [
            'datos' => $datos,
            'tiposAlumnos' => $tiposAlumnos,
            'medioPublicitario' => $medioPublicitario,
            'month' => $month, // Para mostrar el mes en el frontend
            'year' => $year   // Para mostrar el año en el frontend
        ]);
    }

    // Método que filtra los datos según mes, año y tipo
    public function filtrar(Request $request)
    {
        // Validación de los parámetros de la solicitud
        $validated = $request->validate([
            'month' => 'required|integer|between:1,12',  // Mes debe ser entre 1 y 12
            'year' => 'required|integer|digits:4',       // Año debe tener 4 dígitos
            'type' => 'required|in:tiposAlumnos,medioPublicitario', // Validación del tipo
        ]);
    
        $month = $validated['month'];  // Mes (número entre 1 y 12)
        $year = $validated['year'];    // Año (formato YYYY)
        $type = $validated['type'];    // Tipo de estadística
    
        // Filtrar según el tipo solicitado
        if ($type === 'tiposAlumnos') {
            $tiposAlumnos = $this->getEstadisticas($month, $year, 'tipoAlumno');
            return response()->json(['tiposAlumnos' => $tiposAlumnos, 'month' => $month, 'year' => $year]);
        } elseif ($type === 'medioPublicitario') {
            $medioPublicitario = $this->getEstadisticas($month, $year, 'medioPublicitario');
            return response()->json(['medioPublicitario' => $medioPublicitario, 'month' => $month, 'year' => $year]);
        }
    
        // Si el tipo no es válido, retornar un error
        return response()->json(['error' => 'Tipo no válido'], 400);
    }

    // Método que obtiene las estadísticas de acuerdo a un tipo de campo (tipoAlumno o medioPublicitario)
    private function getEstadisticas($month, $year, $campo)
    {
        return Formulario::selectRaw("$campo, COUNT(*) as cantidad")
            ->whereMonth('created_at', $month)   // Filtramos por mes
            ->whereYear('created_at', $year)     // Filtramos por año
            ->groupBy($campo)  // Agrupamos por el campo proporcionado
            ->get();
    }
}

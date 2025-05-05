<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\FormularioMatricula;
use App\Models\Grupo;
use App\Models\Matricula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FuncionEstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function registrar()
    {
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;
        $grupos = Grupo::with(['ciclo.idioma'])->get();

        return Inertia::render('Estudiante/RegistrarMatricula', ['ListaGrupos' => $grupos, 'est' => $estudianteId]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function ver()
    {
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;

        // Obtiene las matrículas del estudiante, paginadas
        $matriculas = Matricula::with(['estudiante', 'grupo.ciclo.idioma', 'pago'])
            ->where('estudiante_id', $estudianteId)
            ->paginate(10); // Ajusta el número de elementos por página según lo necesario

        return Inertia::render('Estudiante/VerMatriculas', [
            'ListaMatriculas' => $matriculas,
        ]);
    }

    public function enviar(Request $request)
    {
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;

        // Validación de los datos
        $data = $request->validate([
            'fechaMatricula' => 'required|date',
            'cicloIngles' => 'required|exists:ciclos,id',
            'horarioIngles' => [
                'required',
                'exists:grupos,id',
                function ($attribute, $value, $fail) use ($estudianteId) {
                    // Verifica si ya existe una matrícula con el mismo estudiante y grupo
                    $exists = DB::table('matriculas')
                        ->where('grupo_id', $value)
                        ->where('estudiante_id', $estudianteId)
                        ->exists();

                    if ($exists) {
                        $fail('Ya te matriculaste en este ciclo y horario.');
                    }
                },
            ],
            'medioPago' => 'required|string',
            'fechaPago' => 'required|date|before_or_equal:today',
            'montoPago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048',
        ], [
            'horarioIngles.unique' => 'Ya te matriculaste en este ciclo y horario',
            'fechaPago.before_or_equal' => 'La fecha no puede estar en el futuro.',
        ]);

        try {
            // Asocia el estudiante ID
            $data['estudiante_id'] = $estudianteId;
            $data['estado'] = 'pendiente';
            $grupo = Grupo::with(['ciclo.idioma'])->find($data['horarioIngles']);
            if ($grupo) {
                $data['cicloIngles'] = $grupo->ciclo->nombre.' - '.$grupo->ciclo->idioma->nombre.' - '.$grupo->ciclo->nivel;
                $data['horarioIngles'] = $grupo->horario;
            }

            // Manejo de imagen
            if ($request->hasFile('imgComprobante')) {
                $path = $request->file('imgComprobante')->store('images', 'public');
                $data['imgComprobante'] = Storage::url($path);
            }

            // Registro en la base de datos
            FormularioMatricula::create($data);

            return redirect()->route('estudiante.registrar')->with('message', 'Formulario de Matrícula enviada correctamente');
        } catch (\Exception $e) {
            Log::error('Error al enviar el formulario: '.$e->getMessage());

            return redirect()->back()->with('message', 'Error al enviar el formulario: '.$e->getMessage());
        }
    }

    public function verificar($codigo)
    {
        $certificado = Certificado::where('codigo', $codigo)->first();

        if ($certificado) {
            return view('certificados.verificar', compact('certificado'));
        }

        return response()->json(['mensaje' => 'Certificado no encontrado'], 404);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use App\Models\Grupo;
use App\Models\Estudiante;
use App\Models\Matricula;
use App\Models\Pago;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class FormularioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formularios = Formulario::paginate(10);
        return Inertia::render('Administrador/Formulario/Index', ['ListaFormularios' => $formularios]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombres' => 'required|string',
            'aPaterno' => 'required|string',
            'aMaterno' => 'required|string',
            'dni' => 'required|string',
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'tipoAlumno' => 'required|string',
            'programaEstudios' => 'nullable|string',
            'semestre' => 'nullable|string',
            'correoInstitucional' => 'nullable|email',
            'email' => 'nullable|email',
            'anioEgreso' => 'nullable|string',
            'institucionProviene' => 'nullable|string',
            'medioPublicitario' => 'nullable|string',
            'cicloIngles' => 'required|exists:ciclos,id',
            'horarioIngles' => 'required|exists:grupos,id',
            'realizoInglesBasico' => 'nullable|in:istta,otro',
            'realizoInglesIntermedio' => 'nullable|in:istta,otro',
            'tienecertificadoIngles' => 'nullable|in:si,no',
            'tieneCertificadoIntermedio' => 'nullable|in:si,no',
            'medioPago' => 'required|string',
            'fechaPago' => 'required|date',
            'montoPago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048', // Valida que sea una imagen
            'estado' => 'required|string', // Add this line
        ]);

        try {
            // Ensure estado is set to 'Pendiente' before creating
            $data['estado'] = 'Pendiente';
            
            // Antes de crear el formulario, obtén los datos adicionales necesarios
            $grupo = Grupo::with(['ciclo.idioma'])->find($data['horarioIngles']);
            if ($grupo) {
                $data['cicloIngles'] = $grupo->ciclo->nombre . ' - ' . $grupo->ciclo->idioma->nombre. ' - ' .$grupo->ciclo->nivel;
                $data['horarioIngles'] = $grupo->horario;
            }

            if ($request->hasFile('imgComprobante')) {
                $path = $request->file('imgComprobante')->store('images', 'public');
                $data['imgComprobante'] = Storage::url($path);
            }
            //dd($data);
            Formulario::create($data);
            return redirect('/')->with('message', 'Formulario registrado correctamente');
        } catch (\Exception $e) {
            // Esto te ayudará a capturar el error
            Log::error('Error al guardar el formulario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al guardar el formulario: ' . $e->getMessage());
        }
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function aceptar(string $id)
    {
        try {
            $formulario = Formulario::findOrFail($id);

            // Buscar el grupo correspondiente
            $grupo = Grupo::where('horario', $formulario->horarioIngles)
                ->whereHas('ciclo', function ($query) use ($formulario) {
                    $query->whereRaw("CONCAT(nombre, ' - ', (SELECT nombre FROM idiomas WHERE id = ciclos.idioma_id), ' - ' ,nivel) = ?", [$formulario->cicloIngles]);
                })
                ->first();

            if (!$grupo) {
                throw new \Exception('No se encontró el grupo correspondiente');
            }

            // Verificar si hay vacantes disponibles
            if (!$grupo->tieneVacantes()) {
                throw new \Exception('No hay vacantes disponibles en este grupo');
            }

            // Determine email based on student type and institutional email availability
            $email = $this->determineEmail($formulario);

            // Crear usuario
            $user = User::create([
                'name' => $formulario->nombres . ' ' . $formulario->aPaterno . ' ' . $formulario->aMaterno,
                'email' => $email,
                'password' => Hash::make($formulario->dni),
                'tipoUsuario' => 'est',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);

            // Crear estudiante con el correo apropiado
            $estudiante = Estudiante::create([
                'nombres' => $formulario->nombres,
                'aPaterno' => $formulario->aPaterno,
                'aMaterno' => $formulario->aMaterno,
                'dni' => $formulario->dni,
                'sexo' => $formulario->sexo,
                'celular' => $formulario->celular,
                'email' => $formulario->email ?? $email,
                'emailInstitucional' => $this->getInstitutionalEmail($formulario),
                'programaEstudios' => $formulario->programaEstudios,
                'user_id' => $user->id
            ]);

            // Verificar si el estudiante ya está matriculado en el grupo
            if ($grupo->tieneEstudiante($estudiante->id)) {
                throw new \Exception('El estudiante ya está matriculado en este grupo');
            }

            // Create payment record
            $pago = Pago::create([
                'fecha' => $formulario->fechaPago,
                'monto' => $formulario->montoPago,
                'medioPago' => $formulario->medioPago,
                'nroComprobante' => $formulario->nroComprobante,
                'imgComprobante' => $formulario->imgComprobante
            ]);

            // Crear matrícula
            $matricula = Matricula::create([
                'fecha' => Carbon::now(),
                'nota' => 0,
                'estado' => 'vigente',
                'estudiante_id' => $estudiante->id,
                'grupo_id' => $grupo->id,
                'pago_id' => $pago->id
            ]);

            // Incrementar el número de estudiantes y reducir vacantes
            $grupo->incrementarEstudiantes();

            // Actualizar el estado del formulario
            $formulario->estado = 'Aceptado';
            $formulario->save();

            return redirect()->back()->with([
                'message' => 'Estudiante, matrícula y pago registrados correctamente',
                'formularioId' => $formulario->id
            ]);
        } catch (\Exception $e) {
            Log::error('Error al registrar estudiante y matrícula: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }

    private function determineEmail($formulario)
    {
        // Si es alumno regular, usar correo institucional
        if ($formulario->tipoAlumno === 'alumno') {
            return $formulario->correoInstitucional;
        }
        
        // Si es egresado con correo institucional
        if ($formulario->tipoAlumno === 'egresado' && $formulario->correoInstitucional) {
            return $formulario->correoInstitucional;
        }

        // Si es egresado sin correo institucional o no es alumno del instituto
        return 'cid' . $formulario->dni . '@istta.edu.pe';
    }

    private function getInstitutionalEmail($formulario)
    {
        // Para alumnos regulares y egresados con correo institucional
        if ($formulario->correoInstitucional) {
            return $formulario->correoInstitucional;
        }

        // Para egresados sin correo institucional y no alumnos
        return 'cid' . $formulario->dni . '@istta.edu.pe';
    }

    public function rechazar(string $id)
    {
        try {
            $formulario = Formulario::findOrFail($id);
            $formulario->delete();
            return redirect()->back()->with('message', 'Formulario rechazado y eliminado correctamente');
        } catch (\Exception $e) {
            Log::error('Error al eliminar el formulario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al eliminar el formulario: ' . $e->getMessage());
        }
    }
}

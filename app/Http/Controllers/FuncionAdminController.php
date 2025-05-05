<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\FormularioMatricula;
use App\Models\Grupo;
use App\Models\Matricula;
use App\Models\Pago;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class FuncionAdminController extends Controller
{
    public function index()
    {
        $usuarios = User::paginate(15);

        return Inertia::render('Administrador/Usuarios/Index', ['usuarios' => $usuarios]);
    }

    public function dataCert()
    {
        $estudiantes = Matricula::with(['estudiante', 'grupo.ciclo.idioma'])
            ->where('estado', 'vigente')
            ->whereHas('grupo.ciclo', function ($query) {
                $query
                    ->whereHas('idioma', function ($subQuery) {
                        $subQuery->whereColumn('nivel', 'nivelCert'); // Comparar nivel del ciclo con nivelCert del idioma
                    });
            })
            ->paginate(15);
        $certificados = Certificado::paginate(15);

        // Retornar los datos en formato JSON
        return response()->json([
            'estudiantes' => $estudiantes,
            'certificados' => $certificados,
        ]);
    }

    public function inicioCert()
    {
        $estudiantes = Matricula::with(['estudiante', 'grupo.ciclo.idioma'])
            ->where('estado', 'vigente')
            ->whereHas('grupo.ciclo', function ($query) {
                $query
                    ->whereHas('idioma', function ($subQuery) {
                        $subQuery->whereColumn('nivel', 'nivelCert'); // Comparar nivel del ciclo con nivelCert del idioma
                    });
            })
            ->paginate(15);
        $certificados = Certificado::paginate(15);

        return Inertia::render('Administrador/Certificaciones/Index', ['estudiantes' => $estudiantes, 'certificados' => $certificados]);
    }

    public function generarCertificado(Request $request)
    {
        $codigo = Str::uuid(); // Genera un identificador único
        $matricula = Matricula::findOrFail($request->idMatricula);

        $certificado = Certificado::create([
            'nombre' => $request->nombre,
            'codigo' => $codigo,
            'cicloCert' => $request->cicloCert,
        ]);

        $matricula->estado = 'certificado';
        $matricula->save();

        return redirect()->route('usuarios.index');
    }

    public function mostrarCertificado($id)
    {

        $certificado = Certificado::findOrFail($id);

        // Generar QR y codificarlo en svg
        $qrCode = QrCode::format('svg')
            ->size(200)
            ->generate(route('verificar.certificado', ['codigo' => $certificado->codigo]));

        return view('certificados.mostrar', compact('certificado', 'qrCode'));
    }

    public function aprobar(Request $request)
    {
        try {
            $formulario = FormularioMatricula::findOrFail($request->id);

            // Buscar el grupo correspondiente
            $grupo = Grupo::where('horario', $request->horarioIngles)
                ->whereHas('ciclo', function ($query) use ($request) {
                    $query->whereRaw("CONCAT(nombre, ' - ', (SELECT nombre FROM idiomas WHERE id = ciclos.idioma_id), ' - ' ,nivel) = ?", [$request->cicloIngles]);
                })
                ->first();

            if (! $grupo) {
                throw new \Exception('No se encontró el grupo correspondiente');
            }
            // Create pago
            $pago = Pago::create([
                'fecha' => $formulario->fechaPago,
                'monto' => $formulario->montoPago,
                'medioPago' => $formulario->medioPago,
                'nroComprobante' => $formulario->nroComprobante,
                'imgComprobante' => $formulario->imgComprobante,
            ]);

            // Crear matricula
            $matricula = Matricula::create([
                'fecha' => Carbon::now(),
                'nota' => 0,
                'estado' => 'vigente',
                'estudiante_id' => $formulario->estudiante_id,
                'grupo_id' => $grupo->id,
                'pago_id' => $pago->id,
            ]);

            // Actualizar el estado del formulario_matricula
            $formulario->estado = 'aceptado';
            $formulario->save();

            return redirect()->back()->with([
                'message' => 'Matrícula y pago registrados correctamente',
                'formularioId' => $formulario->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Error al registrar matrícula y pago: '.$e->getMessage());

            return redirect()->back()->with('error', 'Error al procesar la solicitud: '.$e->getMessage());
        }
    }

    public function rechazar(Request $request)
    {
        try {
            $formulario = FormularioMatricula::findOrFail($request->id);
            // Eliminar el archivo de imagen asociado si existe
            if ($formulario->imgComprobante) {
                // Obtener la ruta completa del archivo
                $filePath = str_replace(config('app.url').'/storage/', '', $formulario->imgComprobante);

                // Eliminar el archivo de storage
                if (Storage::exists('public/'.$filePath)) {
                    Storage::delete('public/'.$filePath);
                }
            }
            // Elimina el formulario
            $formulario->delete();

            return redirect()->back()->with([
                'message' => 'Formulario eliminado',
            ]);
        } catch (\Exception $e) {
            Log::error('Error al eliminar formulario'.$e->getMessage());

            return redirect()->back()->with('error', 'Error al procesar la solicitud: '.$e->getMessage());
        }
    }
}

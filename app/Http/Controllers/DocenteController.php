<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DocenteController extends Controller
{
    public function index()
    {
        $docentes = Docente::with('user')->paginate(15);

        return Inertia::render('Administrador/Docentes/Index', [
            'ListaDocentes' => $docentes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Administrador/Docentes/FormularioDocentes');
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'nombres' => 'required|string|max:255',
                'aPaterno' => 'required|string|max:255',
                'aMaterno' => 'required|string|max:255',
                'sexo' => 'required|in:MASCULINO,FEMENINO',
                'dni' => 'required|string|size:8|unique:docentes,dni',
                'celular' => 'required|string|size:9',
                'fechaNacimiento' => 'required|date',
                'emailInstitucional' => 'required|email|unique:docentes,emailInstitucional',
                'fotoDocente' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',

            ],
            [
                'emailInstitucional.unique' => 'El email institucional ya está en uso',
                'dni.unique' => 'El DNI ya está en uso',
                'emailInstitucional.required' => 'El email institucional es obligatorio',
                'dni.required' => 'El DNI es obligatorio',
                'nombres.required' => 'El nombre es obligatorio',
                'aPaterno.required' => 'El apellido paterno es obligatorio',
                'aMaterno.required' => 'El apellido materno es obligatorio',
                'sexo.required' => 'El sexo es obligatorio',
                'celular.required' => 'El celular es obligatorio',
                'fechaNacimiento.required' => 'La fecha de nacimiento es obligatoria',
                'fotoDocente.image' => 'El archivo debe ser una imagen',
                'fotoDocente.mimes' => 'El archivo debe ser de tipo: jpeg, png, jpg',
                'fotoDocente.max' => 'El tamaño máximo de la imagen es de 2MB',
            ]
        );

        try {
            if ($request->hasFile('fotoDocente')) {
                $path = $request->file('fotoDocente')->store('docentes', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            }

            // Crear usuario primero
            $user = User::create([
                'name' => $validated['nombres'].' '.$validated['aPaterno'].' '.$validated['aMaterno'],
                'email' => $validated['emailInstitucional'],
                'password' => bcrypt($validated['dni']),
                'tipoUsuario' => 'doc',
                'email_verified_at' => now(), // Añadir verificación de email
                'remember_token' => Str::random(10), // Añadir remember token
            ]);

            // Añadir user_id al docente
            $validated['user_id'] = $user->id;

            // Crear docente
            $docente = Docente::create($validated);

            return redirect()->route('docente.index')->with('message', 'Docente creado exitosamente');
        } catch (\Exception $e) {
            return Inertia::render('Administrador/Docentes/FormularioDocentes', [
                'errors' => $e->getMessage(), // Enviar el error al componente
                'docentes' => Docente::all(), // Enviar los docentes si es necesario
            ]);
        }
    }

    public function edit($id)
    {
        return Inertia::render('Administrador/Docentes/FormularioDocentes', [
            'docente' => Docente::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $docente = Docente::findOrFail($id);

        $request->merge([
            'nombres' => strtoupper($request->input('nombres')),
            'aPaterno' => strtoupper($request->input('aPaterno')),
            'aMaterno' => strtoupper($request->input('aMaterno')),
            'sexo' => strtoupper($request->input('sexo')),
        ]);

        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'aPaterno' => 'required|string|max:255',
            'aMaterno' => 'required|string|max:255',
            'sexo' => 'required|in:MASCULINO,FEMENINO',
            'dni' => 'required|string|size:8|unique:docentes,dni,'.$id,
            'celular' => 'required|string|size:9',
            'fechaNacimiento' => 'required|date',
            'emailInstitucional' => 'required|email|unique:docentes,emailInstitucional,'.$id,
            'fotoDocente' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            if ($request->hasFile('fotoDocente')) {
                // Borrar la imagen anterior si existe
                if ($docente->fotoDocente) {
                    $oldPath = str_replace('/storage/', '', parse_url($docente->fotoDocente, PHP_URL_PATH));
                    Storage::disk('public')->delete($oldPath);
                }

                // Guardar la nueva imagen
                $path = $request->file('fotoDocente')->store('docentes', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            } else {
                // Si no se sube una nueva imagen, mantener la imagen actual
                $validated['fotoDocente'] = $docente->fotoDocente;
            }

            // Actualizar el docente
            $docente->update($validated);

            return redirect()->route('docente.index')->with('message', 'Docente actualizado exitosamente');
        } catch (\Exception $e) {
            return Inertia::render('Administrador/Docentes/FormularioDocentes', [
                'errors' => $e->getMessage(), // Enviar el error al componente
                'docentes' => Docente::all(), // Enviar los docentes si es necesario
            ]);
        }
    }
}

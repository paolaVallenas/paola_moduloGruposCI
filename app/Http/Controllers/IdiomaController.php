<?php

namespace App\Http\Controllers;

use App\Models\Idioma;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IdiomaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idiomas = Idioma::all();

        return Inertia::render('Administrador/Idiomas/Index', ['Listaidiomas' => $idiomas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'nombre' => 'required|unique:idiomas|string|max:30',
            'montoMes' => 'required|numeric|min:50|max:900',
            'nivelCert' => 'required|numeric|min:1|max:30',
        ], [
            'nombre.unique' => 'El nombre de este idioma ya existe, por favor ingrese otro',
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El nombre no puede tener más de 30 caracteres.',
        ]);

        // Crear el nuevo idioma
        Idioma::create([
            'nombre' => $request->nombre,
            'montoMes' => $request->montoMes,
            'nivelCert' => $request->nivelCert,
        ]);

        // Redirigir al usuario con un mensaje de éxito
        return redirect()->route('ciclo.index')->with(
            'message', 'Idioma creado exitosamente'
        );
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
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:40',
            'montoMes' => 'required|numeric|min:50|max:900',
            'nivelCert' => 'required|numeric|min:1|max:30',
        ], [
            'nombre.unique' => 'El nombre de este idioma ya existe, por favor ingrese otro',
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El nombre no puede tener más de 30 caracteres.',
        ]);

        // Buscar el idioma por su ID
        $idioma = Idioma::findOrFail($id);

        // Actualizar los atributos del idioma
        $idioma->nombre = $validatedData['nombre'];
        $idioma->montoMes = $validatedData['montoMes'];
        $idioma->nivelCert = $validatedData['nivelCert'];

        $idioma->save();

        return redirect()->route('ciclo.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

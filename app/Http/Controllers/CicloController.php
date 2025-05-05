<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Idioma;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CicloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ciclos = Ciclo::with('idioma')->paginate(10);
        $idiomas = Idioma::all();

        return Inertia::render('Administrador/Ciclos/Index', ['ListaCiclos' => $ciclos, 'ListaIdiomas' => $idiomas]);
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

        // Validar la solicitud
        $request->validate([
            'nombre' => 'required|string|max:20|unique:ciclos,nombre,NULL,id,idioma_id,'.$request->idioma_id.',nivel,'.$request->nivel,
            'nivel' => 'required|numeric|min:1|max:30',
            'idioma_id' => 'required|exists:idiomas,id',
        ], [
            'nombre.unique' => 'Ya existe un ciclo con el mismo nombre, nivel e idioma.',
            'nombre.required' => 'El campo de nombre es obligatorio',
            'nombre.max' => 'El campo de nombre no puede tener más de 20 caracteres',
        ]);

        Ciclo::create([
            'nombre' => $request->nombre,
            'nivel' => $request->nivel,
            'idioma_id' => $request->idioma_id,
        ]);

        return redirect()->route('ciclo.index');
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
            'nombre' => 'required|string|max:20|unique:ciclos,nombre,NULL,id,idioma_id,'.$request->idioma_id.',nivel,'.$request->nivel,
            'periodo' => 'required|string|max:10',
            'nivel' => 'required|numeric|min:1|max:30',
            'idioma_id' => 'required|exists:idiomas,id',
        ], [
            'nombre.unique' => 'Ya existe un ciclo con el mismo nombre, nivel e idioma.',
            'nombre.required' => 'El campo de nombre es obligatorio',
            'nombre.max' => 'El campo de nombre no puede tener más de 20 caracteres',
        ]);

        // Buscar el idioma por su ID
        $idioma = Ciclo::findOrFail($id);

        // Actualizar los atributos del idioma
        $idioma->nombre = $validatedData['nombre'];
        $idioma->periodo = $validatedData['periodo'];
        $idioma->nivel = $validatedData['nivel'];
        $idioma->idioma_id = $validatedData['idioma_id'];

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

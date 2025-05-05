<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulario extends Model
{
    /** @use HasFactory<\Database\Factories\FormularioFactory> */
    use HasFactory;
    // Campos que pueden ser asignados en masa
    protected $fillable = [
        'nombres',
        'aPaterno',
        'aMaterno',
        'dni',
        'sexo',
        'celular',
        'fechaNacimiento',
        'tipoAlumno',
        'programaEstudios',
        'semestre',
        'correoInstitucional',
        'email',
        'anioEgreso',
        'institucionProviene',
        'medioPublicitario',
        'cicloIngles',
        'horarioIngles',
        'realizoInglesBasico',
        'realizoInglesIntermedio',
        'tienecertificadoIngles',
        'medioPago',
        'fechaPago',
        'montoPago',
        'nroComprobante',
        'imgComprobante',
        'estado',
    ];
}

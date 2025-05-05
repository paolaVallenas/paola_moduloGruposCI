<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    /** @use HasFactory<\Database\Factories\EstudianteFactory> */
    use HasFactory;

    protected $fillable = [
        'nombres',
        'aPaterno',
        'aMaterno',
        'dni',
        'sexo',
        'celular',
        'email',
        'emailInstitucional',
        'programaEstudios',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'matriculas', 'estudiante_id', 'grupo_id');
    }

    public function matricula()
    {
        return $this->hasOne(Matricula::class);
    }
}

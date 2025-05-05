<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    /** @use HasFactory<\Database\Factories\MatriculaFactory> */
    use HasFactory;

    protected $table = 'matriculas';
    
    protected $fillable = [
        'fecha',
        'nota',
        'estado',
        'estudiante_id',
        'grupo_id',
        'pago_id',
    ];

    protected $casts = [
        'nota' => 'float',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }
    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }
    public function pago()
    {
        return $this->belongsTo(Pago::class);
    }
    
}

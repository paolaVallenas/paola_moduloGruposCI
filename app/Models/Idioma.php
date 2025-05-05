<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idioma extends Model
{
    /** @use HasFactory<\Database\Factories\IdiomaFactory> */
    use HasFactory;
    protected $fillable =[
        'nombre',
        'montoMes',
        'nivelCert',
    ];
}

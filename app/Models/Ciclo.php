<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    /** @use HasFactory<\Database\Factories\CicloFactory> */
    use HasFactory;
    protected $fillable = [
        'idioma_id',
        'nombre',
        'nivel'
    ];
    public function idioma()
    {
        return $this->belongsTo(Idioma::class);
    }
}

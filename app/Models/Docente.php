<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Docente extends Model
{
    /** @use HasFactory<\Database\Factories\DocenteFactory> */
    use HasFactory;
    protected $fillable = [
        'nombres',
        'aPaterno',
        'aMaterno',
        'sexo',
        'dni',
        'celular',
        'fechaNacimiento',
        'emailInstitucional',
        'fotoDocente',
        'user_id',
    ];

    /**
     * Get the user that owns the Docente
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function grupos(): HasMany
    {
        return $this->hasMany(Grupo::class, 'docente_id', 'id');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('formularios', function (Blueprint $table) {
            $table->id();
            $table->string('nombres');
            $table->string('aPaterno');
            $table->string('aMaterno');
            $table->string('dni');
            $table->string('sexo');
            $table->string('celular');
            $table->date('fechaNacimiento');
            $table->string('tipoAlumno');
            $table->string('programaEstudios')->nullable();
            $table->string('semestre')->nullable();
            $table->string('correoInstitucional')->nullable();
            $table->string('email')->nullable();
            $table->string('anioEgreso')->nullable();
            $table->string('institucionProviene')->nullable();
            $table->string('medioPublicitario')->nullable();
            $table->string('cicloIngles');
            $table->string('horarioIngles');
            $table->string('tienecertificadoIngles')->nullable();
            $table->string('realizoInglesBasico')->nullable();
            $table->string('realizoInglesIntermedio')->nullable();
            $table->string('nroComprobante');
            $table->date('fechaPago');
            $table->integer('montoPago');
            $table->string('medioPago');
            $table->string('imgComprobante')->nullable();
            $table->string('estado')->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formularios');
    }
};

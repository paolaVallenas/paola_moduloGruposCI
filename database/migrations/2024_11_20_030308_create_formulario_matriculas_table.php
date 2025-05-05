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
        Schema::create('formulario_matriculas', function (Blueprint $table) {
            $table->id();
            $table->string('estudiante_id');
            $table->date('fechaMatricula');
            $table->string('cicloIngles');
            $table->string('horarioIngles');
            $table->date('fechaPago');
            $table->string('nroComprobante');
            $table->integer('montoPago');
            $table->string('medioPago');
            $table->String('imgComprobante');
            $table->String('estado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulario_matriculas');
    }
};

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
        Schema::create('grupos', function (Blueprint $table) {
            $table->id();
            $table->string('modalidad');
            $table->string('periodo');
            $table->integer('nroEstudiantes');
            $table->integer('nroVacantes');
            $table->String('horario');
            $table->foreignId('docente_id')->constrained()->onDelete('cascade');
            $table->foreignId('ciclo_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
        
    }
};

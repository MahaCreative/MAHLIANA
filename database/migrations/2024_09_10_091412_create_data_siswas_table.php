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
        Schema::create('data_siswas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_kelas_id')->constrained('data_kelas')->onDelete('cascade');
            $table->string('nis', 16)->unique();
            $table->string('nama', 50);
            $table->string('jenis_kelamin');
            $table->string('tanggal_lahir');
            $table->string('foto_siswa')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_siswas');
    }
};

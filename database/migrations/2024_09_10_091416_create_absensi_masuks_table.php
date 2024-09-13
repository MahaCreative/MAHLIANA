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
        Schema::create('absensi_masuks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_jadwal_id')->constrained('data_jadwals')->onDelete('cascade');
            $table->foreignId('data_siswa_id')->constrained('data_siswas')->onDelete('cascade');
            $table->date('tanggal');
            $table->time('jam_absen')->nullable();
            $table->string('status_absen')->nullable();
            $table->string('status_kehadiaran')->default('alpha');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi_masuks');
    }
};

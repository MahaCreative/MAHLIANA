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
        Schema::create('data_jadwals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_kelas_id')->constrained('data_kelas')->onDelete('cascade');
            $table->foreignId('data_mapel_id')->constrained('data_mapels')->onDelete('cascade');
            $table->string('hari');
            $table->string('jam_masuk');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_jadwals');
    }
};

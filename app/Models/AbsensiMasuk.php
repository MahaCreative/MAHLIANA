<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsensiMasuk extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function jadwal()
    {
        return $this->belongsTo(DataJadwal::class, 'data_jadwal_id');
    }

    public function siswa()
    {
        return $this->belongsTo(DataSiswa::class, 'data_siswa_id');
    }
}

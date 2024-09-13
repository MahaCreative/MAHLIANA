<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataSiswa extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function kelas()
    {
        return $this->belongsTo(DataKelas::class, 'data_kelas_id');
    }

    public function koleksi()
    {
        return $this->hasMany(KoleksiFotoSiswa::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataJadwal extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function kelas()
    {
        return $this->belongsTo(DataKelas::class, 'data_kelas_id');
    }
    public function mapel()
    {
        return $this->belongsTo(DataMapel::class, 'data_mapel_id');
    }
}

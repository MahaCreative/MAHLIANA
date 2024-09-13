<?php

namespace App\Http\Controllers;

use App\Models\AbsensiMasuk;
use Illuminate\Http\Request;

class DataAbsenController extends Controller
{
    public function index(Request $request)
    {
        $load = $request->load ? $request->load : 10;
        $query = AbsensiMasuk::query()->with(['jadwal' => function ($q) {
            $q->with('kelas', 'mapel');
        }, 'siswa']);
        if ($request->nis) {
            $query->whereHas('siswa', function ($q) use ($request) {
                $q->where('nis', 'like', '%' . $request->nis . '%');
            });
        }
        if ($request->kelas) {
            $query->whereHas('jadwal.kelas', function ($q) use ($request) {
                $q->where('nama_kelas', '=', $request->kelas);
            });
        }
        if ($request->mapel) {
            $query->whereHas('jadwal.mapel', function ($q) use ($request) {
                $q->where('nama_mapel', '=', $request->mapel);
            });
        }
        if ($request->mapel) {
            $query->whereHas('jadwal.mapel', function ($q) use ($request) {
                $q->where('nama_mapel', '=', $request->mapel);
            });
        }
        if ($request->kehadiran) {
            $query->where('status_kehadiaran', '=', $request->kehadiran);
        }
        if ($request->absen) {
            $query->where('status_absen', '=', $request->absen);
        }
        if ($request->dari_tanggal) {
            $query->whereDate('tanggal', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('tanggal', '<=', $request->sampai_tanggal);
        }
        $dataAbsen = $query->paginate($load);
        return inertia('DataAbsen/Index', compact('dataAbsen'));
    }
}

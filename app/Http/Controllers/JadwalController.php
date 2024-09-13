<?php

namespace App\Http\Controllers;

use App\Models\DataJadwal;
use App\Models\DataKelas;
use App\Models\DataMapel;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        $query = DataJadwal::query()->with('kelas', 'mapel');
        $dataJadwal = $query->latest()->paginate(1);

        return inertia('DataJadwal/Index', compact('dataJadwal'));
    }

    public function store(Request $request)
    {
        $dataKelas = DataKelas::where('nama_kelas', $request->data_kelas_id)->first();
        $dataMapel = DataMapel::where('nama_mapel', $request->data_mapel_id)->first();

        $attr = $request->validate([
            'data_kelas_id' => 'required',
            'data_mapel_id' => 'required',
            'hari' => 'required|string|in:senin,selasa,rabu,kamis,jumat,sabtu',
            'jam_masuk' => 'required|date_format:H:i',

        ]);
        $cekJadwal = DataJadwal::where('data_kelas_id', $dataKelas->id)->where('data_mapel_id', $dataMapel->id)
            ->where('hari', $request->hari)->first();
        if ($cekJadwal) {
            return redirect()->back()->withErrors(['message' => 'Jadwal dengan data yang anda buat saat ini telah dibuat, cek kembali daftar mapelnya']);
        }
        $attr['data_kelas_id'] = $dataKelas->id;
        $attr['data_mapel_id'] = $dataMapel->id;
        $dataJadwal = DataJadwal::create($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $dataJadwal = DataJadwal::findOrFail($request->id);
        $dataJadwal->delete();
        return redirect()->back();
    }
}

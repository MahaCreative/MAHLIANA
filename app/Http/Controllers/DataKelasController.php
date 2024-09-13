<?php

namespace App\Http\Controllers;

use App\Models\DataKelas;
use Illuminate\Http\Request;

class DataKelasController extends Controller
{
    public function index(Request $request)
    {
        $dataKelas = DataKelas::latest()->get();
        return inertia('DataKelas/Index', compact('dataKelas'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'kd_kelas' => 'unique:data_kelas,kd_kelas|alpha_dash|min:3|max:5',
            'nama_kelas' => 'alpha_dash|min:3|max:4',
        ]);
        $dataKelas = DataKelas::create($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $dataKelas = DataKelas::findOrFail($request->id);
        $namaKelas = $dataKelas->nama_kelas;
        $dataKelas->delete();
        return redirect()->back()->with(['success', 'berhasil menghapus data kelas' . $namaKelas]);
    }
}

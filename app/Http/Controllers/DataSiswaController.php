<?php

namespace App\Http\Controllers;

use App\Models\DataKelas;
use App\Models\DataSiswa;
use App\Models\KoleksiFotoSiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class DataSiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = DataSiswa::query()->with('kelas', 'koleksi')->withCount('koleksi');

        $dataSiswa = $query->paginate();

        return inertia('DataSiswa/Index', compact('dataSiswa'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'data_kelas_id' => 'required',
            'nis' => 'required|numeric|min_digits:6|max_digits:16',
            'nama' => 'required|string|min:3',
            'jenis_kelamin' => 'required|in:laki-laki,perempuan',
            'tanggal_lahir' => 'required|date|before:now',
            'foto_siswa' => 'required|image|mimes:png.jpg,jpeg',
        ]);
        $dataKelas = DataKelas::where('nama_kelas', $request->data_kelas_id)->first();
        $attr['data_kelas_id'] = $dataKelas->id;
        if ($request->hasFile('foto_siswa')) {
            $attr['foto_siswa'] = $request->file('foto_siswa')->store('foto_siswa');
        }
        $dataSiswa = DataSiswa::create($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $dataSiswa = DataSiswa::findOrFail($request->id);
        $nis = $dataSiswa->nis;
        $files = storage_path('app/public/' . $nis);
        if (File::exists($files)) {
            // Hapus semua file di dalam folder


            // Hapus folder itu sendiri
            File::deleteDirectory($files);
        }
        $dataSiswa->delete();
        return redirect()->back();
    }


    public function submit_foto(Request $request)
    {

        $request->validate([
            'foto_siswa.*' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Validasi gambar
        ]);
        if (count($request->foto) < 3) {
            return redirect()->back()->withErrors('tambahkan foto minimal 15 Foto');
        }
        $dataSiswa = DataSiswa::findOrFail($request->id);

        $uploadedFiles = $request->file('foto');
        $filePaths = [];
        $no = 0;
        foreach ($uploadedFiles as $file) {
            // Convert image to JPEG
            $no++;
            $url = $file->storeAs($dataSiswa->nis . '/' . $no . '.jpeg');
            $foto = KoleksiFotoSiswa::create([
                'data_siswa_id' => $dataSiswa->id,
                'foto' => $url,
            ]);
        }
    }

    public function clear_foto(Request $request)
    {

        $dataSiswa = DataSiswa::findOrFail($request->id);
        $koleksi = KoleksiFotoSiswa::where('data_siswa_id', $dataSiswa->id)->get();
        foreach ($koleksi as $item) {

            $item->delete();
        }
        $files = storage_path('app/public/' . $dataSiswa->nis);
        if (File::exists($files)) {
            // Hapus semua file di dalam folder


            // Hapus folder itu sendiri
            File::deleteDirectory($files);
        }

        return redirect()->back();
    }
}

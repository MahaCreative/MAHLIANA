<?php

namespace App\Http\Controllers;

use App\Models\AbsensiMasuk;
use App\Models\DataJadwal;
use App\Models\DataKelas;
use App\Models\DataSiswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PhpMqtt\Client\Facades\MQTT;

class ProsesAbsensiController extends Controller
{
    public function index(Request $request)
    {
        return inertia('ProsesAbsen/Index');
    }

    public function kirim_absen(Request $request)
    {
        $getHari = Carbon::now()->locale('id');
        $hariSenin = $getHari->dayOfWeek === Carbon::MONDAY;
        $hariSelasa = $getHari->dayOfWeek === Carbon::TUESDAY;
        $hariRabu = $getHari->dayOfWeek === Carbon::WEDNESDAY;
        $hariKamis = $getHari->dayOfWeek === Carbon::THURSDAY;
        $hariJumat = $getHari->dayOfWeek === Carbon::FRIDAY;
        $hariSabtu = $getHari->dayOfWeek === Carbon::SATURDAY;
        $hariIni = '';
        if ($hariSenin) {
            $hariIni = 'senin';
        } else if ($hariSelasa) {
            $hariIni = 'selasa';
        } else if ($hariRabu) {
            $hariIni = 'rabu';
        } else if ($hariKamis) {
            $hariIni = 'kamis';
        } else if ($hariJumat) {
            $hariIni = 'jumat';
        } else if ($hariSabtu) {
            $hariIni = 'sabtu';
        }
        $statusMasuk = 'on time';
        $statusKehadiran = 'hadir';
        $dataSiswa = DataSiswa::where('nis', '=', $request->nis)->first();
        $dataJadwal = DataJadwal::with('mapel')->where('hari', $hariIni)->where('data_kelas_id', $dataSiswa->data_kelas_id)->first();
        $jamMasuk = Carbon::parse($dataJadwal->jam_masuk);
        $jamSekarang = Carbon::now();

        $selisih = $jamMasuk->diffInMinutes($jamSekarang);

        if ($selisih < 10) {
            $statusMasuk = 'on time';
        } else if ($selisih > 15) {
            $statusMasuk = 'terlambat';
        }
        if ($selisih > 60) {
            $statusMasuk = 'terlambat';
            $statusKehadiran = 'alpha';
        }
        $cekAbsen = AbsensiMasuk::where('data_jadwal_id', $dataJadwal->id,)->where('data_siswa_id', $dataSiswa->id)->first();
        if ($cekAbsen) {
            $response = [
                'type' => 'error',
                'message' => 'user sudah absen',
                'nama_siswa' => $dataSiswa->nama,
                'nama_mapel' => $dataJadwal->mapel->nama_mapel,
                'jam_absen' => $dataJadwal->jam,
                'status_absen' => $dataJadwal->status_absen,
                'status_kehadiaran' => $dataJadwal->status_kehadiaran,
            ];
            MQTT::publish('absensi', json_encode($response));
            return redirect()->back()->withErrors(["type" => "error", "message" => "anda sudah absen pada mapel " . $dataJadwal->mapel->nama_mapel . 'anda tidak bisa lagi absen']);
        }

        $absen = AbsensiMasuk::create([
            'data_jadwal_id' => $dataJadwal->id,
            'data_siswa_id' => $dataSiswa->id,
            'tanggal' => now(),
            'jam_absen' => now()->format('H:I'),
            'status_absen' => $statusMasuk,
            'status_kehadiaran' => $statusKehadiran,
        ]);
        $response = [
            'type' => 'success',
            'message' => 'Absen diterima',
            'nama_siswa' => $dataSiswa->nama,
            'nama_mapel' => $dataJadwal->mapel->nama_mapel,
            'jam_absen' => $absen->jam,
            'status_absen' => $statusMasuk,
            'status_kehadiaran' => $statusKehadiran,
        ];
        MQTT::publish('absensi', json_encode($response));
        if ($statusMasuk == 'terlambat') {
            return redirect()->back()->withErrors(["type" => "error", "message" => "anda terlambat $selisih menit masuk jam pelajaran " . $dataJadwal->mapel->nama_mapel]);
        } else {
            return redirect()->back()->withErrors(["type" => "success", "message" => "anda on time masuk jam pelajaran " . $dataJadwal->mapel->nama_mapel]);
        }
    }
}

<?php

use App\Events\GetPicture;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataAbsenController;
use App\Http\Controllers\DataKelasController;
use App\Http\Controllers\DataMapelController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProsesAbsensiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpMqtt\Client\Facades\MQTT;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('data-kelas', [DataKelasController::class, 'index'])->name('data-kelas');
Route::post('data-kelas', [DataKelasController::class, 'store']);
Route::delete('data-kelas', [DataKelasController::class, 'delete']);


Route::get('data-mata-pelajaran', [DataMapelController::class, 'index'])->name('data-mapel');
Route::post('data-mata-pelajaran', [DataMapelController::class, 'store']);
Route::delete('data-mata-pelajaran', [DataMapelController::class, 'delete']);

Route::get('data-jadwal', [JadwalController::class, 'index'])->name('data-jadwal');
Route::post('data-jadwal', [JadwalController::class, 'store']);
Route::delete('data-jadwal', [JadwalController::class, 'delete']);

Route::get('data-siswa', [DataSiswaController::class, 'index'])->name('data-siswa');
Route::post('data-siswa', [DataSiswaController::class, 'store']);
Route::delete('data-siswa', [DataSiswaController::class, 'delete']);
Route::post('submit-foto', [DataSiswaController::class, 'submit_foto'])->name('submit-foto');
Route::delete('clear-foto', [DataSiswaController::class, 'clear_foto'])->name('clear-foto');

Route::get('proses-absensi', [ProsesAbsensiController::class, 'index'])->name('proses-absen');
Route::get('kirim-absem', [ProsesAbsensiController::class, 'kirim_absen'])->name('kirim-absen');
Route::post('kirim-absem', [ProsesAbsensiController::class, 'kirim_absen'])->name('kirim-absen');

Route::get('data-absensi', [DataAbsenController::class, 'index'])->name('data-absen-siswa');

Route::get('', [LoginController::class, 'index'])->name('login');
Route::post('', [LoginController::class, 'store']);

Route::get('response-tidak-ada-wajah', function () {
    $response = [
        "type" => 'error',
        'message' => 'Wajah tidak terdeteksi',
        'nama_siswa' => '',
        'nama_mapel' => '',
        'jam_absen' => '',
        'status_absen' => '',
        'status_kehadiaran' => '',
    ];
    MQTT::publish('absensi', json_encode($response));
    return response()->json('abg');
});

Route::get('response-wajah-tidak-dikenal', function () {
    $response = [
        "type" => 'error',
        'message' => 'Wajah tidak dikenal',
        'nama_siswa' => '',
        'nama_mapel' => '',
        'jam_absen' => '',
        'status_absen' => '',
        'status_kehadiaran' => '',
    ];
    MQTT::publish('absensi', json_encode($response));
});

Route::get('get-jam', function () {
    $now = now()->format('H:i:s');
    return response()->json(['jam' => $now]);
});

Route::get('get-picture', function () {
    broadcast(new GetPicture('Halo'));
    return response()->json('success');
});

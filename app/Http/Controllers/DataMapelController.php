<?php

namespace App\Http\Controllers;

use App\Models\DataMapel;
use Illuminate\Http\Request;

class DataMapelController extends Controller
{
    public function index(Request $request)
    {
        $dataMapel = DataMapel::latest()->get();
        return inertia('DataMape/Index', compact('dataMapel'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'kd_mapel' => 'alpha_dash|min:3|max:4|unique:data_mapels,kd_mapel',
            'nama_mapel' => 'string|min:6|max:30'
        ]);
        $dataMapel = DataMapel::create($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $dataMapel = DataMapel::findORFail($request->id);
        $dataMapel->delete();
    }
}

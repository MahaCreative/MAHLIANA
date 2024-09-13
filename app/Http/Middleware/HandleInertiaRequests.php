<?php

namespace App\Http\Middleware;

use App\Models\DataKelas;
use App\Models\DataMapel;
use App\Models\DataSiswa;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            'countSiswa' => DataSiswa::count(),
            'countKelas' => DataKelas::count(),
            'count_mapel' => DataMapel::count(),
            'dataSiswa' => DataSiswa::latest()->get(),
            'dataMapel' => DataMapel::latest()->get(),
            'dataKelas' => DataKelas::latest()->get(),
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}

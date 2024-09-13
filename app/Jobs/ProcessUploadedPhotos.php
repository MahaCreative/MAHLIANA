<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessUploadedPhotos implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    protected $files;

    public function __construct($files)
    {
        $this->files = $files;
    }

    public function handle()
    {
        foreach ($this->files as $file) {
            $image = Image::make($file)->encode('jpg', 90);
            $path = 'public/fotos/' . uniqid() . '.jpg';
            $image->save(storage_path('app/' . $path));
        }
    }
}

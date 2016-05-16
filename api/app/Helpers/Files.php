<?php
namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App;

class Files
{

    /**
     * @param $path path to the file with subfolders
     * @param bool $download if you want to download or show in the browser if it's possible
     * @return file video
     */
    public static function download($path, $download = false, $fileName)
    {
        $path = base_path() . '/resources/assets/files/' . $path;
        if ($download) {
            $mime = "application/octet-stream";
        } else {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $path);
            finfo_close($finfo);
        }

        $headers = array(
            'Content-Type' => $mime,
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        );

        return response()->download($path, $fileName, $headers);
    }


    public static function save(Request $request, $formfield = 'file', $private = true, $subfolder = '', $filename = null)
    {

        $server_pubic_folder = App::Environment() === 'local' ? '/../public/front/assets/' : '/../public_html/front/assets/';
        $server_private_folder = '/../front/src/assets/';

        if (!$filename) {
            $file = $request->file($formfield);
            $filename = $file->getClientOriginalName();
        }

        $path_private = $private ? '/resources/files/' : $server_private_folder;

        if(!is_dir(base_path() .  $path_private . $subfolder)){
            mkdir(base_path() .  $path_private . $subfolder, 0777, true);
        }

        $file->move(base_path() . $path_private . $subfolder, $filename);
        chmod(base_path() . $path_private . $subfolder . $filename, 0777);

        $path_public = $private ? '/resources/files/' : $server_pubic_folder;

        Log::info(base_path() . $path_private . $subfolder . $filename);
        Log::info(base_path() . $path_public . $subfolder . $filename);

        if(!is_dir(base_path() .  $path_public . $subfolder)){
            mkdir(base_path() .  $path_public . $subfolder, 0777, true);
        }

        return File::copy(base_path() . $path_private . $subfolder . $filename, base_path() . $path_public . $subfolder . $filename);
    }

    public static function getMimeType($extension)
    {
        $mimetypes = [
            "flv" => "video/x-flv",
            "mp4" => "video/mp4",
            "m3u8" => "application/x-mpegURL",
            "3gp" => "video/3gpp",
            "mov" => "video/quicktime",
            "avi" => "video/x-msvideo",
            "wmv" => "video/x-ms-wmv",
            "ts" => "video/MP2T",
            "css" => "text/css",
            "png" => "image/png",
            "jpg" => "image/jpeg",
            "jpeg" => "image/jpeg",
            "css" => "text/css",
            "doc" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "docm" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "xlsm" => "application/vnd.ms-excel.sheet.macroEnabled.12",
            "xltx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            "xltm" => "application/vnd.ms-excel.template.macroEnabled.12",
            "xlsb" => "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            "xlam" => "application/vnd.ms-excel.addin.macroEnabled.12",
            "pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "pptm" => "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
            "pdf" => "application/pdf",
            "zip" => "application/x-compressed",
            "rar" => "application/x-compressed",
            "dwg" => "application/acad",
        ];

        return array_key_exists($extension, $mimetypes) ? $mimetypes[$extension] : "application/octet-stream";
    }
}
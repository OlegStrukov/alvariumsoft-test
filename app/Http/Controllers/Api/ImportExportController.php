<?php

namespace App\Http\Controllers\Api;

use App\Employee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImportExportController extends Controller {

    public function import(Request $request) {
       $request->all();
    }

    public function export(Request $request) {

    }

}

<?php

namespace App\Http\Controllers\Api;

use App\Department;
use App\Employee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportExportController extends Controller {

    public function import(Request $request) {
        $file = $request->file('file');
        if(isset($file)) {
            //$xml = simplexml_load_file(public_path('xml.xml'));
            $xml = simplexml_load_file($file);
            foreach ($xml->departments->department as $department) {
                Department::updateOrCreate(['title' => (string)$department->title, 'slug' => (string)$department->slug], (array)$department);
            }
            foreach ($xml->employees->employee as $employee) {
                Employee::create((array)$employee);
            }
        }
        return 'success';
    }

    public function export(Request $request) {
        $department_id = $request->get('department');
        if(!empty($department_id) && $department_id > 0) {
            $departments = Department::where('id',$department_id)->get();
            $employees = Employee::where('department_id',$department_id)->get();
        } else {
            $departments = Department::all();
            $employees = Employee::all();
        }
        Storage::disk('public')->put('xml.xml', view('xml', compact(['departments','employees'])));
        return 'success';
    }

}

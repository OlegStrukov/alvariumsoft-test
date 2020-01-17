<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if ($this->type == 1) {
            $type_text = 'Rate';
            $payment_m = $this->payment;
        } else {
            $type_text = 'hourly rate';
            $payment_m = $this->payment * $this->cur_m_hours;
        }
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'date_of_birth' => $this->date_of_birth, // ->format('Y-m-d')
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'position' => $this->position,
            'type_text' => $type_text,
            'payment_m' => $payment_m,
        ];
    }
}

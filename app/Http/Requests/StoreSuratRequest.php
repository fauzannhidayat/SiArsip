<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSuratRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tanggal_surat' => 'required|date',
            'nomor_surat' => 'required|regex:/^[0-9A-Za-z\-\/]+$/|max:255',
            'nomor_agenda' => 'nullable|regex:/^[0-9A-Za-z\-\/]+$/|max:255',
            'perihal' => 'required|string|max:255',
            'pengirim' => 'required|string|max:255',
            'jenis_surat' => 'required|in:masuk,keluar,keterangan,keputusan',
            'file_surat' => 'nullable|file|mimes:pdf,doc,docx',
        ];
    }
}

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
            'tanggal_surat' => 'nullable|date',
            'nomor_surat' => 'nullable|regex:/^[0-9A-Za-z\-\/\.]+$/|max:255',
            'nomor_agenda' => 'nullable|regex:/^[0-9A-Za-z\-\/\.]+$/|max:255',
            'perihal' => 'nullable|string|max:255',
            'pengirim' => 'nullable|string|max:255',
            'jenis_surat' => 'required|in:masuk,keluar,keterangan,keputusan',
            'file_surat' => 'nullable|file|mimes:pdf,doc,docx',
            'created_at' => 'nullable|date'
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            "name" => ['required', 'max:100'],
            "sell_price" => ['required', 'nullable', 'numeric'],
            "buy_price" => ['required', 'nullable', 'numeric'],
            "stock" => ['required', 'nullable', 'numeric']
        ];
    }
}

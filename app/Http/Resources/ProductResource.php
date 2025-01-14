<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => new PriceResource($this->price),
            'stock' => new StockResource($this->stock),
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}


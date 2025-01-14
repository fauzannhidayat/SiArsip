import { Link } from '@inertiajs/react';
import React from 'react';

export default function SellReport({ auth, sales }) {
    return (
        <div className="p-2 overflow-x-auto">
            {sales.map(sale => (
                <div key={sale.id}>
                    <h2>{sale.created_at}</h2>
                    <div className="mb-2 p-2 grid grid-cols-1 sm:grid-cols-2 bg-slate-400">
                        <div>
                            <h2>{sale.product_name}</h2>
                        </div>
                        <div className="text-right">
                            <h2>x {sale.quantity_sold}</h2>
                            <h2>Rp. {sale.total_price}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

import React from 'react';

export default function PurchaseReport({ auth, purchases }) {
    return (
        <div className="p-2 overflow-x-auto">
            {purchases.map(purchase => (
                <div key={purchase.id}>
                    <h2>{purchase.created_at}</h2>
                    <div className="mb-2 p-2 grid grid-cols-1 sm:grid-cols-2 bg-slate-400">
                        <div>
                            <h2>{purchase.product_name}</h2>
                        </div>
                        <div className="text-right">
                            <h2>x {purchase.quantity_purchased}</h2>
                            <h2>Rp. {purchase.total_buy_price}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

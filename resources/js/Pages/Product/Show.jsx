import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth ,product}) {
    const deleteProduct = (product) => {
        if (!window.confirm("Are you sure you want to delete the product?")) {
        return;
        }
        router.delete(route("product.destroy", product.id));
    };
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Detail Product
            </h2>
            
            </div>}
        >
            <Head title="Product Detail" />

            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8 ">
                
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="grid grid-cols-2">
                        <div>
                            <div>
                                <label className="font-bold text-lg">Product ID</label>
                                <p className="mt-1">{product.id}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Product Name</label>
                                <p className="mt-1">{product.name}</p>
                            </div>
                            

                            <div className="mt-4">
                                <label className="font-bold text-lg">Sell Price </label>
                                <p className="mt-1">{product.price.sell_price}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Buy Price </label>
                                <p className="mt-1">{product.price.buy_price}</p>
                            </div>
                            
                            
                            
                            <div className="mt-4">
                                <label className="font-bold text-lg">Sisa Stock : </label>
                                {product.stock.final_stock !== null ? product.stock.final_stock : "-"}
                            </div>
                        </div>

                        <div>
                            <div className='text-right '>
                                <Link
                                href={route("product.edit", product.id)}
                                className="bg-yellow-200 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-yellow-400 mr-2"
                                >
                                Edit
                                </Link>
                            </div>
                            
                        </div>

                    </div>

                    <div className='text-right'>
                
                        <div>
                            <Link
                                href={route("product.addStockForm", product.id)}
                                className="font-medium text-yellow-500 transition-all hover:underline mx-1"
                            >
                                Tambah Stock
                            </Link>

                            <button
                                onClick={(e) => deleteProduct(product)}
                                className="p-1 font-medium bg-red-500 rounded shadow transition-all hover:underline mx-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                
                </div>
                    
                </div>
                <div>
                <Link
                                href={route("product.index")}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                                Kembali
                            </Link>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

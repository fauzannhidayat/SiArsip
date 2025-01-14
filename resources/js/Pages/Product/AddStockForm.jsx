import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AddStockForm({auth,product}) {
    console.log(product)
    const { data, setData, post, errors, reset } = useForm({
        name: product.name||"",
        price: product.price.price || "",
        final_stock: product.stock.final_stock || 0,
        added_stock: "",
        
    });
    
    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("product.addStock", product.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Add Stock
            </h2>

            </div>}
        >
            <Head title="Product" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lgsm:px-6 lg:px-8 ">
                <div className="overflow-x-auto ">
                <form
            onSubmit={onSubmit}
            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
            <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />

                <TextInput
                id="project_name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused={true}
                disabled = {true}
                onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            
            <div className="mt-4">
                <InputLabel
                htmlFor="product_stock"
                value="Final Stock"
                />
                <TextInput
                id="product_stock"
                type="number"
                name="final_stock"
                value={data.final_stock}
                className="mt-1 block w-full"
                onChange={(e) => setData("final_stock", e.target.value)}
                />
                <InputError message={errors.stock} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel
                htmlFor="product_stock"
                value="Add Stock"
                />
                <TextInput
                id="product_stock"
                type="number" 
                name="added_stock"
                value={data.added_stock}
                className="mt-1 block w-full"
                onChange={(e) => setData("added_stock", e.target.value)}
                />
                <InputError message={errors.stock} className="mt-2" />
            </div>

            <div className="mt-4 text-right">
                <Link
                href={route("product.index")}
                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                Kembali
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                Add
                </button>
            </div>
            </form>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

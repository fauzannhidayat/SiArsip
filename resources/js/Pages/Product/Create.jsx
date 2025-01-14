    import InputError from '@/Components/InputError';
    import InputLabel from '@/Components/InputLabel';
    import TextInput from '@/Components/TextInput';
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
    import { Head, Link, useForm } from '@inertiajs/react';

    export default function Create({auth}) {
        const { data, setData, post, errors, reset } = useForm({
            name: "",
            sell_price: "",
            buy_price: "",
            stock: "",
        });
        
        const onSubmit = (e) => {
            e.preventDefault();
        
            post(route("product.store"));
        };
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Product
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
                    onChange={(e) => setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                    htmlFor="product_price"
                    value="Buy Price"
                    />
                    <TextInput
                    id="product_price"
                    type="number"
                    name="buy_price"
                    value={data.buy_price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("buy_price", e.target.value)}
                    />
                    <InputError message={errors.buy_price} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                    htmlFor="product_price"
                    value="Sell Price"
                    />
                    <TextInput
                    id="product_price"
                    type="number"
                    name="sell_price"
                    value={data.sell_price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("sell_price", e.target.value)}
                    />
                    <InputError message={errors.sell_price} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                    htmlFor="product_stock"
                    value="Product Stock"
                    />
                    <TextInput
                    id="product_stock"
                    type="number"
                    name="stock"
                    value={data.stock}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("stock", e.target.value)}
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
                    Tambah
                    </button>
                </div>
                </form>
                    </div>
                </div>

            </AuthenticatedLayout>
        );
    }

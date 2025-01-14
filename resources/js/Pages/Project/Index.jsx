import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project</h2>}
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    {projects.data.map((project) => (
                        <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                    >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                        <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                        <Link href={route("project.show", project.id)}>
                            {project.name}
                        </Link>
                        </th>
                        
                        <td className="px-3 py-2 text-nowrap">
                        {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                        {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                        <Link
                            href={route("project.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={(e) => deleteProject(project)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                        ))}
                        <div className="p-6 text-gray-900 dark:text-gray-100">Project</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDesignations, deleteDesignation, createDesignation } from "../../features/designationSlice";
import Swal from "sweetalert2";

export const AllDesignationPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const designations = useSelector((state) => state.designation.designations);

    const safeDesignations = Array.isArray(designations) ? designations : [];

    const filteredDesignations = safeDesignations.filter((desg) =>
        desg.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        dispatch(getAllDesignations());
    }, [dispatch]);

    const handleDelete = (desgId) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteDesignation(desgId));
            Swal.fire("Deleted!", "Designation has been deleted.", "success");
          }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDesignation({ name }));
        setIsModalOpen(false);
    };

    return (
        <Layout>
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                All Designation
                </h2>
                <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Designation
                </button>
                <Link
                    to={"/add/designation"}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    ⬅ Back
                </Link>
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                type="text"
                placeholder="Search designations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                <thead className="bg-teal-600 text-white">
                    <tr>
                    <th className="py-3 px-6 text-left">SL</th>
                    <th className="py-3 px-6 text-left">Designation Name</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDesignations.length > 0 ? (
                    filteredDesignations.map((desg, index) => (
                        <tr
                        key={desg.id}
                        className="border-b hover:bg-gray-50 transition"
                        >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{desg.name}</td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex justify-center gap-3">
                            {/* Edit Button */}
                            <Link
                                to={`/edit/designation/${desg.id}`}
                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                            >
                                <Pencil className="w-5 h-5" />
                            </Link>
                            {/* Delete Button */}
                            <button
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                                onClick={() => handleDelete(desg.id)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td
                        colSpan="3"
                        className="py-4 px-6 text-center text-gray-500"
                        >
                        No departments found
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>

            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                {/* Close button */}
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Modal content */}
                <h2 className="text-xl font-bold mb-4">Add Designation</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Designation Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                    <br />
                    <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                    Save
                    </button>
                </form>
                </div>
            </div>
            )}
        </div>
        </Layout>
    );
};

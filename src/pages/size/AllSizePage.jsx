import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import sizesApi from "../../api/resources/size";
import { Layout } from "../../components/layout/Layout";

export const AllSizePage = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState({ id: null, name: "", code: ""});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Fetch all sizes
  useEffect(() => {
    setLoading(true);
    sizesApi
      .list()
      .then((data) => setSizes(data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setSelectedSize({ id: null, name: "", code: "" });
    setIsNew(true);
    setIsModalOpen(true);
  };

  const handleEdit = (size) => {
    setSelectedSize(size);
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedSize.name.trim()) return;

    try {
      if (isNew) {
        const newSize = await sizesApi.create(selectedSize);
        setSizes((prev) => [...prev, newSize]);
        toast.success("Size created successfully!");
      } else {
        const updated = await sizesApi.update(selectedSize.id, selectedSize);
        setSizes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        toast.success("Size updated successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to save size.");
    }
  };

  const handleDelete = (id) => {
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
        sizesApi
          .remove(id)
          .then(() => {
            setSizes((prev) => prev.filter((s) => s.id !== id));
            Swal.fire("Deleted!", "Size has been deleted.", "success");
          })
          .catch(() => {
            toast.error("Failed to delete size.");
          });
      }
    });
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header + Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Sizes</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} />
            Add Size
          </button>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}

        {!loading && sizes.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">
                    Code
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                      {size.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium border border-gray-300">
                      {size.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium border border-gray-300">
                      {size.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center border border-gray-300">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(size)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(size.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-600">No brands found.</div>
          )
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {isNew ? "Add Size" : "Edit Size"}
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="mb-2">
                  <input
                    type="text"
                    value={selectedSize.name}
                    onChange={(e) =>
                      setSelectedSize({
                        ...selectedSize,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="Enter size name"
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    value={selectedSize.code}
                    onChange={(e) =>
                      setSelectedSize({
                        ...selectedSize,
                        code: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="Enter size code"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  {isNew ? "Add Size" : "Update Size"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
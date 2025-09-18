import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Layout } from "../../components/layout/Layout";

export const AllBrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brands);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState({ id: null, name: "" });
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleEdit = (brand) => {
    setSelectedBrand({ id: brand.id, name: brand.name });
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedBrand({ id: null, name: "" });
    setIsNew(true);
    setIsModalOpen(true);
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
        dispatch(deleteBrand(id));
        Swal.fire("Deleted!", "Brand has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedBrand.name.trim()) return;

    if (isNew) {
      dispatch(createBrand(selectedBrand))
        .unwrap()
        .then(() => {
          toast.success("Brand created successfully!");
        })
        .catch(() => {
          toast.error("Failed to create brand.");
        });
    } else {
      dispatch(updateBrand(selectedBrand))
        .unwrap()
        .then(() => {
          toast.success("Brand updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update brand.");
        });
    }
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header + Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Brands</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} />
            Add Brand
          </button>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && brands.length > 0 ? (
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
                  <th className="px-6 py-3 text-center text-sm font-semibold border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                      {brand.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium border border-gray-300">
                      {brand.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center border border-gray-300">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
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
          !loading &&
          !error && (
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
                {isNew ? "Add Brand" : "Edit Brand"}
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={selectedBrand.name}
                  onChange={(e) =>
                    setSelectedBrand({
                      ...selectedBrand,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter brand name"
                />

                <button
                  type="submit"
                  className="w-full mt-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  {isNew ? "Add Brand" : "Update Brand"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

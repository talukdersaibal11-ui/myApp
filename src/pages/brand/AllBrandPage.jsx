import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/layout/Layout";
import { fetchBrands, updateBrand, deleteBrand } from "../../features/brandSlice.js";
import { Pencil, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";

export const AllBrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brands);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState({ id: null, name: "" });

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleEdit = (brand) => {
    setSelectedBrand({ id: brand.id, name: brand.name });
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
    dispatch(updateBrand(selectedBrand));
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Brands</h1>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && brands.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{brand.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {brand.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">
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
          !loading && !error && <div className="text-center text-gray-600">No brands found.</div>
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
              <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={selectedBrand.name}
                  onChange={(e) =>
                    setSelectedBrand({ ...selectedBrand, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
                
                <button
                  type="submit"
                  className="w-full mt-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  Update Brand
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

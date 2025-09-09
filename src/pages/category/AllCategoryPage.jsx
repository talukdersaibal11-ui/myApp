import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { Layout } from "../../components/layout/Layout";
import { toast } from "react-toastify";
import api from "../../api/api";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export const AllCategoryPage = () => {
  const dispatch = useDispatch();
  const { data: categories, loading, error } = useSelector(
    (state) => state.category
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, name: "" });
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/admin/category/${id}`);
        toast.success("Category deleted successfully!");
        dispatch(fetchCategories());
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleEdit = (cat) => {
    setSelectedCategory({ id: cat.id, name: cat.name });
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory({ id: null, name: "" });
    setIsNew(true);
    setIsModalOpen(true);
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await api.post(`/admin/category`, { name: selectedCategory.name });
        toast.success("Category added successfully!");
      } else {
        await api.put(`/admin/category/${selectedCategory.id}`, {
          name: selectedCategory.name,
        });
        toast.success("Category updated successfully!");
      }
      setIsModalOpen(false);
      dispatch(fetchCategories());
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Categories</h1>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} className="mr-2" />
            Add Category
          </button>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && categories.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold border">
                    SL
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold border">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold border">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700 border">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium border">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center border">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
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
          !loading && !error && (
            <div className="text-center text-gray-600">No categories found.</div>
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
                {isNew ? "Add Category" : "Edit Category"}
              </h2>
              <form onSubmit={handleModalSave} className="space-y-4">
                <input
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter category name"
                />

                <button
                  type="submit"
                  className="w-full mt-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  {isNew ? "Add Category" : "Update Category"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

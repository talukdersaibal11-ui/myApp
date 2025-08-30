import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { Layout } from "../../components/layout/Layout";
import { toast } from "react-toastify";
import api from "../../api/api";

export const AllCategoryPage = () => {
  const dispatch = useDispatch();
  const { data: categories, loading, error } = useSelector((state) => state.category);

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState({ id: null, name: "" });

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
    setEditCategory({ id: cat.id, name: cat.name });
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setEditCategory({ ...editCategory, name: e.target.value });
  };

  const handleModalSave = async () => {
    try {
      await api.put(`/admin/category/${editCategory.id}`, { name: editCategory.name });
      toast.success("Category updated successfully!");
      setShowModal(false);
      dispatch(fetchCategories());
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>

        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-96 p-6 relative">
              <h3 className="text-xl font-bold mb-4">Edit Category</h3>
              <input
                type="text"
                value={editCategory.name}
                onChange={handleModalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

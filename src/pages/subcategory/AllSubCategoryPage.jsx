import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { fetchCategoryList } from "../../features/categorySlice";
import { fetchSubcategory, createSubCategory, updateSubCategory, deleteSubCategory } from "../../features/subCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, X, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const AllSubCategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState({id: null, category_id: null, name:""});
  const [isNew, setIsNew] = useState(false);

  const dispatch = useDispatch();

  const { list: categories, error, loading } = useSelector((state) => state.category);
  const { data: subcategories } = useSelector((state) => state.subcategory);

  const openModal = () => {
    setIsModalOpen(true);
    setIsNew(true);
    setSelectedSubcategory({id:null, category_id: null, name: ""});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsNew(false);
    setSelectedSubcategory({id:null, category_id: null, name: ""});
  };

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSubcategory());
  }, [dispatch])

  const handleEdit = (item) => {
    console.log(item);
    setSelectedSubcategory({id: item.id, category_id: item.category.id, name: item.name});
    setIsNew(false);
    setIsModalOpen(true);
  }

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if(isNew){
        dispatch(createSubCategory(selectedSubcategory))
        .unwrap()
        .then(() => {
            toast.success("SubCategory created successfully!");
            setSelectedSubcategory({ id: null, category_id: null, name: "" });
            closeModal();
            window.location.reload();
        })
        .catch(() => {
            toast.error("Failed to create SubCategory.");
        });
    }else{
        dispatch(updateSubCategory(selectedSubcategory))
        .unwrap()
        .then(() => {
            toast.success("SubCategory update successfully!");
            closeModal();
            window.location.reload();
        })
        .catch(() => {
            toast.error("Failed to update SubCategory.");
        });
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
            dispatch(deleteSubCategory(id));
            Swal.fire("Deleted!", "SubCategory has been deleted.", "success");
        }
    });
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header + Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            All Sub Categories
          </h1>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && subcategories.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full border border-gray-300">
                <thead className="bg-teal-600 text-white">
                    <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">
                        Category
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
                    {subcategories.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                        {item.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium border border-gray-300">
                        {item.category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium border border-gray-300">
                        {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 text-center border border-gray-300">
                        <div className="flex justify-center gap-3">
                            <button
                            onClick={() => handleEdit(item)}
                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                            >
                            <Pencil size={18} />
                            </button>
                            <button
                            onClick={() => handleDelete(item.id)}
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
                <div className="text-center text-gray-600">No sub category found.</div>
            )
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">
                {isNew ? "Add Sub Category" : "Update Sub Category"}
              </h2>

              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                {/* Select Category */}
                <div>
                    <label className="block text-gray-700">Category</label>
                    <select name="category_id" 
                    className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSubcategory.category_id}
                    onChange={(e) => setSelectedSubcategory({
                        ...selectedSubcategory,
                        category_id: e.target.value
                    })}
                    >
                        <option value="" selected disabled>Select Category</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                {/* Name Input */}
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={selectedSubcategory.name}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSelectedSubcategory({
                        ...selectedSubcategory,
                        name: e.target.value
                    })}
                    required
                  />
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {isNew ? "Add Sub category" : "Update Sub Category"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

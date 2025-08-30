import { Layout } from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubCategory } from "../../features/subCategorySlice";
import { fetchCategories } from "../../features/categorySlice";
import { toast } from "react-toastify";


export const AddSubCategoryPage = () => {
  const dispatch = useDispatch();

  // form state
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
  });

  // load categories from store
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createSubCategory(formData))
      .unwrap()
      .then(() => {
        toast.success("Subcategory created successfully!");
        setFormData({ category_id: "", name: "" });
      })
      .catch((err) => {
        toast.error(err || "Something went wrong!");
      });
  };

  return (
    <Layout>
      <div className="bg-gray-100 flex px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Subcategory
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category dropdown */}
            <div>
              <label
                htmlFor="category_id"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Category
              </label>
              <select
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Category --</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Subcategory Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter subcategory name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Add Subcategory
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

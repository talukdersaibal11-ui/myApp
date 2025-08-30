import { Layout } from "../../components/layout/Layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../features/categorySlice"
import { toast } from "react-toastify";

export const AddCategoryPage = () => {
  const [name, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({name}))
    .unwrap()
    .then((res) => {
      toast.success(res.message || "Category Created Successfully");
      setCategoryName("");
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
            Add New Category
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

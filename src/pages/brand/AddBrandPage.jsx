import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { createBrand } from "../../features/brandSlice.js";
import { toast } from "react-toastify";

export const AddBrandPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Brand name is required!");
      return;
    }

    dispatch(createBrand({ name }))
      .unwrap()
      .then(() => {
        toast.success("Brand added successfully!");
        setName("");
      })
      .catch((err) => toast.error(err || "Something went wrong!"));
  };

  return (
    <Layout>
      <div className="flex justify-center items-start mt-10">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-t-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Add Brand</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter brand name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-teal-700 hover:to-emerald-600 transition duration-300"
            >
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

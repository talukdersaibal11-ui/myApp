import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { createDepartment } from "../../features/departmentSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const AddDepartmentPage = () => {
  const [name, setDepartmentName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDepartment({ name }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Department Created Successfully");
        setDepartmentName("");
      })
      .catch((err) => {
        toast.error(err || "Something went wrong!");
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-start mt-20">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg border border-gray-200">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-t-2xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Add Department</h1>
            <Link
              to="/all/department"
              className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg shadow hover:bg-teal-700 transition transform hover:scale-105"
            >
              All Departments
            </Link>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter department name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-emerald-600 transition duration-300"
            >
              Add Department
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

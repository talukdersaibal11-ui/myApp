import { Layout } from "../../components/layout/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchSingleDepartment, updateDepartment } from "../../features/departmentSlice";

export const EditDepartmentPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const { department, loading, error } = useSelector((state) => state.department);


    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateDepartment({ id, data: { name } }))
        .unwrap()
        .then((res) => {
            toast.success(res.message || "Department Update Successfully");
            navigate("/all/department");
        })
        .catch((err) => {
            toast.error(err || "Something went wrong!");
        });
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleDepartment(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (department) {
            setName(department.name);
        }
    }, [department]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="flex justify-center items-start mt-20">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg border border-gray-200">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-t-2xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Edit Department</h1>
            <Link
              to="/all/department"
              className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg shadow hover:bg-teal-700 transition transform hover:scale-105"
            >
              All Departments
            </Link>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleUpdate}>
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter department name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-emerald-600 transition duration-300"
            >
              Update Department
            </button>
          </form>
        </div>
      </div>
        </Layout>
    );
}
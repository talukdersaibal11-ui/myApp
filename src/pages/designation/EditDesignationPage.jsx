import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDesignationById,
  updateDesignation,
} from "../../features/designationSlice";
import Swal from "sweetalert2";

export const EditDesignationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { designation } = useSelector((state) => state.designation);

  const [name, setName] = useState("");

  useEffect(() => {
    if (designation) {
      setName(designation.name);
    } else {
      dispatch(getDesignationById(id));
    }
  }, [designation, dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDesignation({ id, name }));
    Swal.fire("Success", "Designation updated successfully", "success");
    navigate("/all/designation");
  };

  return (
    <Layout>
      <div className="flex justify-center items-start mt-10">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-t-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Designation
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Input Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Designation Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter designation name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-teal-700 hover:to-emerald-600 transition duration-300"
            >
              Update Designation
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

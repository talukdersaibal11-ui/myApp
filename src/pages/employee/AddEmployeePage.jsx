import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegEye } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../features/departmentSlice";
import { getAllDesignations } from "../../features/designationSlice";
import { createEmployee } from "../../features/employeeSlice";
import { fetchGodowns } from "../../features/godownSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AddEmployeePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {departments} = useSelector((state) => state.department); 
    const {designations} = useSelector((state) => state.designation); 
    const {godowns} = useSelector((state) => state.godown); 

    const handleAdd = () => {
        navigate("/employees");
    };

    const handleBack = () => {
        navigate("/home");
    };

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllDesignations());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGodowns());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const employeeData = Object.fromEntries(formData.entries());

        dispatch(createEmployee(employeeData))
        .unwrap()
        .then(() => {
            toast.success('Employee create successfully');
            navigate("/employees");
        })
        .catch((error) => {
            toast.error(error.message || "Employee create failed");
        });
    };

    return (
        <Layout>
            <div style={{ backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", borderRadius: "6px", padding: "25px"}}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px"}}>
                    <h2 className="fw-bold text-primary">Add Employee</h2>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button onClick={handleAdd} className="btn btn-sm btn-primary d-flex align-items-center me-2">
                            <FaRegEye className="me-1" />
                            View All
                        </button>
                        <button className="btn btn-sm btn-secondary d-flex align-items-center" onClick={handleBack}>
                            <FaArrowLeft className="me-1" />
                            Back
                        </button>
                    </div>
                </div>

                {/* Employee Form */}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Left Side - Personal Information */}
                        <div className="col-md-6">
                            <h5 className="fw-semibold text-success border-bottom pb-2 mb-3">
                                Personal Information
                            </h5>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Full Name</label>
                                <input type="text" name="name" className="form-control" placeholder="Enter full name"  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter email"  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Phone</label>
                                <input type="tel" name="phone_number" className="form-control" placeholder="Enter phone number"  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">NID</label>
                                <input type="text" name="nid" className="form-control" placeholder="Enter nid number"  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Address</label>
                                <textarea name="address" className="form-control" rows="3" placeholder="Enter address"></textarea>
                            </div>
                        </div>

                        {/* Right Side - Job Information */}
                        <div className="col-md-6">
                            <h5 className="fw-semibold text-info border-bottom pb-2 mb-3">
                                Job Information
                            </h5>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Godown</label>
                                <select name="godown_code" className="form-select" >
                                    <option value="" selected disabled>Select Godown</option>
                                    {godowns.map((item) => (
                                        <option value={item.code}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Designation</label>
                                <select name="designation" className="form-select" >
                                    <option value="" selected disabled>Select Designation</option>
                                    {designations.map((item) => (
                                        <option value={item.slug}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Department</label>
                                <select name="department" className="form-select" >
                                    <option value="" selected disabled>Select Department</option>
                                    {departments.map((item) => (
                                        <option value={item.slug}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Joining Date</label>
                                <input type="date" name="join_date" className="form-control"  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Salary</label>
                                <input type="number" name="basic_salary" className="form-control" placeholder="Enter salary"  />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 text-end">
                        <button type="submit" className="btn btn-success px-4 fw-semibold">
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

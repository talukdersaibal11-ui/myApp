import { Eye, Pencil, Trash2 } from "lucide-react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/layout/Layout";

export const AllEmployeePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {employees, loading, error} = useSelector((state) => state.employee);

    const handleBack = () => {
        navigate("/home");
    }

    const handleAdd = () => {
        navigate("/add/employee");
    }

    const handleView = (id) => {
        alert(id);
    }

    const handleEdit = (id) => {
        navigate("/edit/employee/" + id);
    }

    const handleDelete = (id) => {
        alert(id);
    }

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    return (
        <>
            <Layout>
                <div style={{backgroundColor:"#fff", boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px;;", borderRadius:"4px", padding:"10px"}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <div>
                            <h2>All Employee</h2>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <button onClick={handleAdd} className="btn btn-sm btn-primary" style={{marginRight:"10px", display:"flex", alignItems:"center"}}>
                                <FaPlus/>
                                Add New
                            </button>
                            <button className="btn btn-sm btn-info text-white" style={{display:"flex", alignItems:"center"}} onClick={handleBack}>
                                <FaArrowLeft /> Back
                            </button>
                        </div>
                    </div>

                    {loading && <div className="text-center text-gray-600">Loading...</div>}
                    {error && <div className="text-center text-red-600">{error}</div>}

                    {/* Table with fixed header */}
                    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                        <table className="table table-bordered table-striped">
                            <thead
                                className="table-primary"
                                style={{ position: "sticky", top: 0, zIndex: 1 }}
                            >
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">NID</th>
                                    <th scope="col">Basic Salary</th>
                                    <th scope="col">Joining Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.user.name}</td>
                                        <td>{item.user.email}</td>
                                        <td>{item.user.phone_number}</td>
                                        <td>{item.user.address}</td>
                                        <td>{item.department}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.nid}</td>
                                        <td>{item.basic_salary}</td>
                                        <td>{item.join_date}</td>

                                        <td>
                                            <button className="btn btn-sm btn-info me-2" onClick={() => handleView(item.id)}>
                                                <Eye size={18}/>
                                            </button>
                                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item.id)}>
                                                <Pencil size={18}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                                <Trash2 size={18}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    );
}
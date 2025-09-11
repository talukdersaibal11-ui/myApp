import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getAllDesignations, createDesignation,updateDesignation, deleteDesignation } from "../../features/designationSlice";
import { Layout } from "../../components/layout/Layout";

export const DesignationPage = () => {
    const navigate                                      = useNavigate();
    const dispatch                                      = useDispatch();
    const [isModalOpen, setIsModalOpen]                 = useState(false);
    const [isNew, setIsNew]                             = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState({id:null, name:""});
    const {designations, loading, error}                = useSelector((state) => state.designation);

    const handleBack = () => {
        navigate("/home");
    }

    const handleAdd = () => {
        setIsModalOpen(true);
        setIsNew(true);
        setSelectedDesignation({id:null, name:""});
    }

    const handleEdit = (item) => {
        setIsModalOpen(true);
        setIsNew(false);
        setSelectedDesignation({id: item.id, name: item.name});
    }

    useEffect(() => {
        dispatch(getAllDesignations());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isNew){
            dispatch(createDesignation(selectedDesignation))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setIsNew(false);
                setSelectedDesignation({id:null, name:""});
                toast.success("Designation created successfully!");
            })
            .catch(() => {
                toast.error("Designation created failed!");
            });
        }else{
            dispatch(updateDesignation(selectedDesignation))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setIsNew(false);
                setSelectedDesignation({id:null, name:""});
                toast.success("Designation updated successfully!");
            })
            .catch((error) => {
                toast.error(error.message || "Designation updated failed!");
            });
        }
    }

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
            dispatch(deleteDesignation(id));
                Swal.fire("Deleted!", "Designation has been deleted.", "success");
            }
        });
    }

    return (
        <>
            <Layout>
                <div style={{backgroundColor:"#fff", boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px;;", borderRadius:"4px", padding:"10px"}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <div>
                            <h2>Designations</h2>
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
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table className="table table-bordered table-striped">
                            <thead
                                className="table-primary"
                                style={{ position: "sticky", top: 0, zIndex: 1 }}
                            >
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Designation Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designations.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>

                                        <td>
                                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>
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

                    {/* For Modal */}
                    {isModalOpen && (
                        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {isNew ? "Add Designation" : "Update Designation"}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Designation Name</label>
                                                <input type="text" className="form-control" name="name" value={selectedDesignation.name} onChange={(e) => setSelectedDesignation({...selectedDesignation, name: e.target.value})} required/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {isNew ? "Save Designation" : "Update Designation"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}
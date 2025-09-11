import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors, createColor, deleteColor, updateColor } from "../../features/colorSlice";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const ColorPage = () => {
    const dispatch                          = useDispatch();
    const navigate                          = useNavigate();
    const { colors, loading, error }        = useSelector((state) => state.color);
    const [isModalOpen, setIsModalOpen]     = useState(false);
    const [isNew, setIsNew]                 = useState(false);
    const [selectedColor, setSelectedColor] = useState({id:null, name:"", hex_code:null});

    useEffect(() => {
        dispatch(fetchColors());
    }, [dispatch]);

    const handleAdd = () => {
        setIsModalOpen(true);
        setIsNew(true);
        setSelectedColor({id:null, name:"", hex_code:null});
    }

    const handleEdit = (item) => {
        setIsModalOpen(true);
        setIsNew(false);
        setSelectedColor({id:item.id, name:item.name, hex_code:item.hex_code});
    }

    const handleBack = () => {
        navigate("/home");
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
            dispatch(deleteColor(id));
            Swal.fire("Deleted!", "Color has been deleted.", "success");
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isNew){
            dispatch(createColor(selectedColor))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setIsNew(false);
                setSelectedColor({id:null, name:"", hex_code:null});
                toast.success("Color created successfully!");
            })
            .catch((error) => {
                toast.error(error.message || "Color created failed!");
            })
        }else{
            dispatch(updateColor(selectedColor))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setIsNew(false);
                setSelectedColor({id:null, name:"", hex_code:null});
                toast.success("Color updated successfully!");
            })
            .catch((error) => {
                toast.error(error.message || "Color updated failed!");
            });
        }
    }

    return (
        <>
            <Layout>
                <div style={{backgroundColor:"#fff", boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px;;", borderRadius:"4px", padding:"10px"}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <div>
                            <h2>Colors</h2>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <button onClick={handleAdd} className="btn btn-sm btn-primary" style={{marginRight:"10px", display:"flex", alignItems:"center"}}>
                                <FaPlus/>
                                Add Color
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
                                    <th scope="col">Color Name</th>
                                    <th scope="col">Hex Code</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colors.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{width: "20px",height: "20px",borderRadius: "4px",backgroundColor: item.hex_code,border: "1px solid #ccc"}}></span>
                                                {item.hex_code}
                                            </div>
                                        </td>

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
                                            {isNew ? "Add Color" : "Update Color"}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Color Name</label>
                                                <input type="text" className="form-control" name="name" value={selectedColor.name} onChange={(e) => setSelectedColor({...selectedColor, name: e.target.value})} required/>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Hex Code</label>
                                                <input type="color" className="form-control form-control-color" name="hex_code" value={selectedColor.hex_code} onChange={(e) => setSelectedColor({...selectedColor, hex_code: e.target.value})} required/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {isNew ? "Save Color" : "Update Color"}
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
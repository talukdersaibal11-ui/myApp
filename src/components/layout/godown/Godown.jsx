import { useState } from "react";
import { useDispatch } from "react-redux";


export const Godown = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        manager: "",
        mobile: "",
        address: "",
        initial_balance: "",
        type: "godown",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchGodowns({formData}));
    };

    return (
        <form
            className="bg-white p-6 rounded-lg shadow-md space-y-4 mx-auto"
            onSubmit={handleSubmit}
            >
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter godown name"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Manager</label>
                <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter manager name"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter mobile number"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter address"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Initial Balance</label>
                <input
                type="number"
                name="initial_balance"
                value={formData.initial_balance}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter initial balance"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                >
                <option value="godown">Godown</option>
                <option value="showroom">Showroom</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
                Save
            </button>
            </form>
    );
}
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AssignStoreHistory() {
    const { postData } = useService();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [input, setInput] = useState({
        storeId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        getStore();
    }, [postData]);

    const getStore = async () => {
        const req = apiEnd.getStoreSelect();
        const res = await postData(req);
        if (res?.success) {
            setData(res?.data?.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storeId = input?.storeId;
        if (storeId) {
            toast.success("Store selected successfully!");
            navigate(`/store-inventory-history/${storeId}`);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{"Store"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/manage-store" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-4" onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <label htmlFor="state" className="col-sm-2 col-form-label">
                                    Select Store to Assign
                                </label>

                                <div className="col-sm-5">
                                    <select
                                        name="storeId"
                                        value={input.storeId}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">----Select Store Name----</option>
                                        {data?.map((record, i) => (
                                            <option value={record?._id} key={i}>
                                                {record?.storeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-5 mt-5">
                                <div className="col-sm-5 offset-sm-2">
                                    <button type="submit" className="btn btn-primary me-3">
                                        View Inventory
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

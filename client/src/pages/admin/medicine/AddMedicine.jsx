import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddMedicine() {
    const { postData } = useService();
    const [genericName, setGeneric] = useState("");
    const [categoryName, setCategory] = useState("");
    const [brandName, setBrand] = useState("");
    const [strengthName, setStrength] = useState("");
    const [usageName, setUsage] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getMedicineProduct = useCallback(async () => {
        try {
            const req = apiEnd.getMedicineById(id);
            const res = await postData(req);
            if (res?.success) {
                setGeneric(res?.data?.genericName || "");
                setCategory(res?.data?.categoryName || "");
                setBrand(res?.data?.brandName || "");
                setStrength(res?.data?.strengthName || "");
                setUsage(res?.data?.usageName || "");
                setQuantity(res?.data?.quantity || "");
                setPrice(res?.data?.price || "");
                setExpireDate(res?.data?.expireDate || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch medicine details.");
        }
    }, [id, postData]);

    useEffect(() => {
        if (id) {
            getMedicineProduct();
        }
    }, [id, getMedicineProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                genericName,
                categoryName,
                brandName,
                strengthName,
                usageName,
                quantity,
                price,
                expireDate,
                status,
            };
            const req = id ? apiEnd.updateMedicine(id, data) : apiEnd.adMedicine(data);
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-medicine");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Medicine" : "Add Medicine"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add Medicine"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-medicine"
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-4" onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-sm-5">
                                    <label htmlFor="generic" className="col-form-label">
                                        Generic Name
                                    </label>
                                    <select
                                        name="genericName"
                                        onChange={(e) => setGeneric(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Generic----</option>
                                        <option value="a">A</option>
                                        <option value="b">B</option>
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="col-form-label">
                                        Category
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="col-form-label">
                                        Brand
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="col-form-label">
                                        Medicine Strength
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStrength(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="col-form-label">
                                        Medicine Usage
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setUsage(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="expireDate" className="col-form-label">
                                        Medicine Expire Date
                                    </label>
                                    <input
                                        type="date"
                                        name="expireDate"
                                        onChange={(e) => setExpireDate(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="quantity" className="col-form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="text"
                                        name="quantity"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter medicine Quantity"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="price" className="col-form-label">
                                        Medicine Price
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter medicine price"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="col-form-label">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-5 mt-5">
                                <div className="col-sm-3">
                                    <button type="submit" className="btn btn-primary me-3">
                                        {id ? "Update" : "Submit"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/manage-medicine")}
                                    >
                                        Cancel
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

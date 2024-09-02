import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import { indianDateFormat } from "../../../utils/helper";

export default function AddMedicine() {
    const { postData } = useService();
    const [genericName, setGenericName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [strengthName, setStrengthName] = useState("");
    const [usageName, setUsageName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [status, setStatus] = useState("");

    //fetch select data state
    const [generic, setGeneric] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [strength, setStrength] = useState("");
    const [usage, setUsage] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getMedicineProduct = useCallback(async () => {
        try {
            const req = apiEnd.getMedicineById(id);
            const res = await postData(req);
            console.log(res);
            if (res?.success) {
                setGenericName(res?.data?.genericName || "");
                setCategoryName(res?.data?.categoryName || "");
                setBrandName(res?.data?.brandName || "");
                setStrengthName(res?.data?.strengthName || "");
                setUsageName(res?.data?.usageName || "");
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
        fetchGeneric();
        fetchCategory();
        fetchBrand();
        fetchStrength();
        fetchUsage();
        if (id) {
            getMedicineProduct();
        }
    }, [id, getMedicineProduct]);

    const fetchGeneric = async () => {
        const req = apiEnd.getGenericSelect();
        const res = await postData(req);
        setGeneric(res?.data);
    };

    const fetchCategory = async () => {
        const req = apiEnd.getCategorySelect();
        const res = await postData(req);
        setCategory(res?.data);
    };

    const fetchBrand = async () => {
        const req = apiEnd.getBrandSelect();
        const res = await postData(req);
        setBrand(res?.data);
    };

    const fetchStrength = async () => {
        const req = apiEnd.getStrengthSelect();
        const res = await postData(req);
        setStrength(res?.data);
    };

    const fetchUsage = async () => {
        const req = apiEnd.getUsageSelect();
        const res = await postData(req);
        setUsage(res?.data);
    };

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
                                    <label htmlFor="generic" className="form-label">
                                        Generic Name
                                    </label>
                                    <select
                                        name="genericName"
                                        value={genericName}
                                        onChange={(e) => setGenericName(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Generic----</option>
                                        {generic?.data?.map((line, i) => (
                                            <option value={line?._id} key={i}>
                                                {line?.genericName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="category" className="form-label">
                                        Category
                                    </label>
                                    <select
                                        name="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Category----</option>
                                        {category?.data?.map((line, i) => (
                                            <option value={line?._id} key={i}>
                                                {line?.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="brand" className="form-label">
                                        Brand
                                    </label>
                                    <select
                                        name="brandName"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Brand----</option>
                                        {brand?.data?.map((line, i) => (
                                            <option value={line?._id} key={i}>
                                                {line?.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="strength" className="form-label">
                                        Medicine Strength
                                    </label>
                                    <select
                                        name="strengthName"
                                        value={strengthName}
                                        onChange={(e) => setStrengthName(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Strength----</option>
                                        {strength?.data?.map((line, i) => (
                                            <option value={line?._id} key={i}>
                                                {line?.strengthName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="usage" className="form-label">
                                        Medicine Usage
                                    </label>
                                    <select
                                        name="usageName"
                                        value={usageName}
                                        onChange={(e) => setUsageName(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select Usage----</option>
                                        {usage?.data?.map((line, i) => (
                                            <option value={line?._id} key={i}>
                                                {line?.usageName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="expireDate" className="form-label">
                                        Medicine Expire Date
                                    </label>
                                    <input
                                        type="date"
                                        name="expireDate"
                                        value={expireDate.split("T")[0]}
                                        onChange={(e) => setExpireDate(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="quantity" className="form-label">
                                        Medicine Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="form-control"
                                        placeholder="Medicine Quantity"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="price" className="form-label">
                                        Medicine Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="form-control"
                                        placeholder="Medicine price"
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label htmlFor="status" className="form-label">
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

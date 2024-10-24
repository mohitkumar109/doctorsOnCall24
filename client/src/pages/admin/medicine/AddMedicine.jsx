import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import SelectField from "../../../components/SelectField";
import InputField from "../../../components/InputField";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddMedicine() {
    const { postData } = useService();
    const navigate = useNavigate();
    const { id } = useParams();

    const [input, setInput] = useState({
        name: "",
        genericId: "",
        categoryId: "",
        brandId: "",
        strengthId: "",
        unitType: "",
        usageId: "",
        stock: "",
        price: "",
        expireDate: "",
        status: "",
    });

    //fetch select data state
    const [selectOptions, setSelectOptions] = useState({
        generic: [],
        category: [],
        brand: [],
        strength: [],
        usage: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const getMedicine = useCallback(async () => {
        if (!id) return;
        try {
            const req = apiEnd.getMedicineById(id);
            const res = await postData(req);
            if (res?.success) {
                setInput({
                    name: res.data.name || "",
                    genericId: res.data.genericId || "",
                    categoryId: res.data.categoryId || "",
                    brandId: res.data.brandId || "",
                    strengthId: res.data.strengthId || "",
                    unitType: res.data.unitType || "",
                    usageId: res.data.usageId || "",
                    stock: res.data.stock || "",
                    price: res.data.price || "",
                    expireDate: res.data.expireDate?.split("T")[0] || "",
                    status: res.data.status || "",
                });
            } else {
                toast.error(res.message);
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
        getMedicine();
    }, [id, getMedicine]);

    const fetchGeneric = async () => {
        const req = apiEnd.getGenericSelect();
        const res = await postData(req);
        setSelectOptions((prev) => ({ ...prev, generic: res?.data?.data }));
    };

    const fetchCategory = async () => {
        const req = apiEnd.getCategorySelect();
        const res = await postData(req);
        setSelectOptions((prev) => ({ ...prev, category: res?.data?.data }));
    };

    const fetchBrand = async () => {
        const req = apiEnd.getBrandSelect();
        const res = await postData(req);
        setSelectOptions((prev) => ({ ...prev, brand: res?.data?.data }));
    };

    const fetchStrength = async () => {
        const req = apiEnd.getStrengthSelect();
        const res = await postData(req);
        setSelectOptions((prev) => ({ ...prev, strength: res?.data?.data }));
    };

    const fetchUsage = async () => {
        const req = apiEnd.getUsageSelect();
        const res = await postData(req);
        setSelectOptions((prev) => ({ ...prev, usage: res?.data?.data }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = id ? apiEnd.updateMedicine(id, input) : apiEnd.adMedicine(input);
            const res = await postData(req);
            if (res?.success) {
                toast.success(res.message);
                navigate("/manage-medicine");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Submission failed.");
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Medicine" : "Add Medicine"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add"}</span>
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
                                <InputField
                                    name="name"
                                    value={input?.name}
                                    onChange={handleChange}
                                    label="Medicine Name"
                                    placeholder="Enter Medicine Name...."
                                />
                                <SelectField
                                    label="Generic Name"
                                    name="genericId"
                                    value={input.genericId}
                                    options={selectOptions.generic}
                                    onChange={handleChange}
                                    valueKey="_id"
                                    labelKey="genericName"
                                />

                                <SelectField
                                    label="Category"
                                    name="categoryId"
                                    value={input.categoryId}
                                    options={selectOptions.category}
                                    onChange={handleChange}
                                    valueKey="_id"
                                    labelKey="categoryName"
                                />

                                <SelectField
                                    label="Brand"
                                    name="brandId"
                                    value={input.brandId}
                                    options={selectOptions.brand}
                                    onChange={handleChange}
                                    valueKey="_id"
                                    labelKey="brandName"
                                />

                                <SelectField
                                    label="Medicine Strength"
                                    name="strengthId"
                                    value={input.strengthId}
                                    options={selectOptions.strength}
                                    onChange={handleChange}
                                    valueKey="_id"
                                    labelKey="strengthName"
                                />

                                <SelectField
                                    label="Medicine Units"
                                    name="unitType"
                                    value={input.unitType}
                                    options={[{ unit: "mg" }, { unit: "ml" }, { unit: "kg" }]}
                                    onChange={handleChange}
                                    labelKey="unit"
                                />

                                <SelectField
                                    label="Medicine Usage"
                                    name="usageId"
                                    value={input.usageId}
                                    options={selectOptions.usage}
                                    onChange={handleChange}
                                    valueKey="_id"
                                    labelKey="usageName"
                                />

                                <InputField
                                    type="number"
                                    name="stock"
                                    value={input.stock}
                                    onChange={handleChange}
                                    label="Medicine Quantity"
                                    placeholder="Quantity in stock"
                                />

                                <InputField
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={handleChange}
                                    label="Medicine Price"
                                    placeholder="Price per unit"
                                />

                                <InputField
                                    type="date"
                                    name="expireDate"
                                    value={input.expireDate}
                                    onChange={handleChange}
                                    label="Medicine Expire Date"
                                />

                                <SelectField
                                    label="Status"
                                    name="status"
                                    value={input.status}
                                    options={[{ status: "active" }, { status: "inactive" }]}
                                    onChange={handleChange}
                                    labelKey="status"
                                />
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

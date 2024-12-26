import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddStore() {
    const { postData } = useService();
    const navigate = useNavigate();
    const { id } = useParams();
    const [storeData, setStoreData] = useState({
        storeName: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        pin: "",
        personName: "",
        email: "",
        mobile: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData((prev) => ({ ...prev, [name]: value }));
    };

    const getStore = useCallback(async () => {
        if (!id) return;
        try {
            const req = apiEnd.getStoreById(id);
            const res = await postData(req);
            if (res?.success) {
                setStoreData({
                    storeName: res?.data?.storeName || "",
                    phone: res?.data?.location?.phone || "",
                    address: res?.data?.location?.address || "",
                    state: res?.data?.location?.state || "",
                    city: res?.data?.location?.city || "",
                    pin: res?.data?.location?.pin || "",
                    personName: res?.data?.contactPerson?.personName || "",
                    email: res?.data?.contactPerson?.email || "",
                    mobile: res?.data?.contactPerson?.mobile || "",
                    status: res?.data?.status || "",
                });
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch store details.");
        }
    }, [id, postData]);

    useEffect(() => {
        getStore();
    }, [id, getStore]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = id ? apiEnd.updateStore(id, storeData) : apiEnd.adStore(storeData);
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-store");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Store" : "Add Store"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add Store"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-store"
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-4" onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <label htmlFor="storeName" className="col-sm-2 col-form-label">
                                    Store Name
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="storeName"
                                        value={storeData.storeName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter medicine store name"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="phone" className="col-sm-2 col-form-label">
                                    Phone Number
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={storeData.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter store phone number"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="address" className="col-sm-2 col-form-label">
                                    Address
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="address"
                                        value={storeData.address}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter address"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="state" className="col-sm-2 col-form-label">
                                    State
                                </label>
                                <div className="col-sm-5">
                                    <select
                                        name="state"
                                        value={storeData.state}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">----Select State----</option>
                                        <option value="TP">Tripura</option>
                                        <option value="TN">Tamil</option>
                                        <option value="RJ">Rajasthan</option>
                                        <option value="PN">Punjab</option>
                                        <option value="MH">Maharashtra</option>
                                        <option value="UK">Utt khand</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="city" className="col-sm-2 col-form-label">
                                    City
                                </label>
                                <div className="col-sm-5">
                                    <select
                                        name="city"
                                        value={storeData.city}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">----Select City----</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="noida">Noida</option>
                                        <option value="lucknow">Lucknow</option>
                                        <option value="dehradun">Dehradun</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="pin" className="col-sm-2 col-form-label">
                                    Pin
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="pin"
                                        value={storeData.pin}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter city"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="person" className="col-sm-2 col-form-label">
                                    Contact Person
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="personName"
                                        value={storeData.personName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter contact person name"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="email" className="col-sm-2 col-form-label">
                                    Contact Email
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="email"
                                        value={storeData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter contact person email address"
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label htmlFor="mobile" className="col-sm-2 col-form-label">
                                    Contact Mobile
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={storeData.mobile}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter contact person mobile number"
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label htmlFor="status" className="col-sm-2 col-form-label">
                                    Status
                                </label>
                                <div className="col-sm-5">
                                    <select
                                        name="status"
                                        value={storeData.status}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">----Select Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-5 mt-5">
                                <div className="col-sm-5 offset-sm-2">
                                    <button type="submit" className="btn btn-primary me-3">
                                        {id ? "Update" : "Submit"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/manage-store")}
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

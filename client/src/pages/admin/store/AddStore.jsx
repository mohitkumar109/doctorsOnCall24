import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddStore() {
    const { postData } = useService();
    const [storeName, setStoreName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");
    const [personName, setPersonName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getStore = useCallback(async () => {
        try {
            const req = apiEnd.getStoreById(id);
            const res = await postData(req);

            if (res?.success) {
                setStoreName(res?.data?.storeName || "");
                setPhone(res?.data?.location?.phone || "");
                setAddress(res?.data?.location?.address || "");
                setState(res?.data?.location?.state || "");
                setCity(res?.data?.location?.city || "");
                setPin(res?.data?.location?.pin || "");
                setPersonName(res?.data?.contactPerson?.personName || "");
                setEmail(res?.data?.contactPerson?.email || "");
                setMobile(res?.data?.contactPerson?.mobile || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch store details.");
        }
    }, [id, postData]);

    useEffect(() => {
        if (id) {
            getStore();
        }
    }, [id, getStore]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                storeName,
                phone,
                address,
                state,
                city,
                pin,
                personName,
                email,
                mobile,
                status,
            };
            const req = id ? apiEnd.updateStore(id, data) : apiEnd.adStore(data);
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
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
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
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
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
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">----Select State----</option>
                                        <option value="TP">Tripura</option>
                                        <option value="TN">Tamil Nadu</option>
                                        <option value="RJ">Rajasthan</option>
                                        <option value="PN">Punjab</option>
                                        <option value="MH">Maharashtra</option>
                                        <option value="UK">Uttara khand</option>
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
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
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
                                        name="city"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
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
                                        value={personName}
                                        onChange={(e) => setPersonName(e.target.value)}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
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

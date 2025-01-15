import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import BrandApi from "../../../services/BrandApi";

export default function AddBrand() {
    const navigate = useNavigate();
    const [brand, setBrand] = useState("");
    const [status, setStatus] = useState("");
    const { id } = useParams();
    const apiInstance = useMemo(() => new BrandApi(), []);

    const getBrand = useCallback(async () => {
        try {
            const res = await apiInstance.getBrandByIdAPI(id);
            if (res?.success) {
                setBrand(res?.data?.brandName || "");
                setStatus(res?.data?.status || "");
            }
        } catch (error) {
            toast.error("Failed to fetch brand details.");
        }
    }, [apiInstance, id]);

    useEffect(() => {
        if (id) {
            getBrand();
        }
    }, [id, getBrand]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!brand) {
            toast.error("Brand name is required !");
            return;
        }

        try {
            const res = id
                ? await apiInstance.updateBrandAPI(id, { brandName: brand, status })
                : await apiInstance.addBrandAPI({ brandName: brand, status });

            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-brand");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Brand" : "Add Brand"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add Brand"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-brand"
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-4" onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <label htmlFor="brand" className="col-sm-2 col-form-label">
                                    Brand
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Brand"
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
                                        <option value="">----Choose Status----</option>
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
                                        onClick={() => navigate("/manage-brand")}
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

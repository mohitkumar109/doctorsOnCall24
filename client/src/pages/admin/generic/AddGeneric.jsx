import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddGeneric() {
    const { postData } = useService();
    const [generic, setGeneric] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getGeneric = useCallback(async () => {
        try {
            const req = apiEnd.getGenericById(id);
            const res = await postData(req);
            if (res?.success) {
                setGeneric(res?.data?.genericName || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch generic details.");
        }
    }, [id, postData]);

    useEffect(() => {
        if (id) {
            getGeneric();
        }
    }, [id, getGeneric]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = id
                ? apiEnd.updateGeneric(id, { genericName: generic, status })
                : apiEnd.adGeneric({ genericName: generic, status });
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-generic");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Generic" : "Add Generic"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add Generic"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-generic"
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
                                    Generic Name
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="generic"
                                        value={generic}
                                        onChange={(e) => setGeneric(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter generic name.."
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
                                        onClick={() => navigate("/manage-generic")}
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

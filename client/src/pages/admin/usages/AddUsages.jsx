import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddUsages() {
    const { postData } = useService();
    const [usage, setUsage] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getUsage = useCallback(async () => {
        try {
            const req = apiEnd.getUsageById(id);
            const res = await postData(req);
            if (res?.success) {
                setUsage(res?.data?.usageName || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message, { duration: 2000 });
            }
        } catch (error) {
            toast.error("Failed to fetch usage details.");
        }
    }, [id, postData]);

    useEffect(() => {
        if (id) {
            getUsage();
        }
    }, [id, getUsage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usage) {
            toast.error("Usage name is required!");
            return;
        }

        try {
            const req = id
                ? apiEnd.updateUsage(id, { usageName: usage, status })
                : apiEnd.adUsage({ usageName: usage, status });
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-usage");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Usage" : "Add Usage"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add Usage"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-usage"
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
                                    Usage Name
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="usage"
                                        value={usage}
                                        onChange={(e) => setUsage(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter usage name.."
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
                                        onClick={() => navigate("/manage-usage")}
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

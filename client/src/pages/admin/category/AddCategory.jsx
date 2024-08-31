import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import Breadcrumb from "../../../components/Breadcrumb";
import useServices from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddCategory() {
    const { postData } = useServices();
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getCategory();
        }
    }, [id]);

    const getCategory = async () => {
        try {
            const req = apiEnd.getCategoryById(id);
            const res = await postData(req);
            if (res?.success) {
                setCategory(res?.data?.categoryName || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch user details.");
        }
    };

    const debouncedCategory = useCallback(
        debounce(async (data) => {
            try {
                const req = id ? apiEnd.updateCategory(id, data) : apiEnd.adCategory(data);
                const res = await postData(req);
                if (res.success === true) {
                    toast.success(res?.message);
                    navigate("/manage-category");
                } else {
                    toast.error(res?.message);
                }
            } catch (error) {
                toast.error(error.res?.data?.message);
            } finally {
                setLoading(false);
            }
        }, 1000), // 300ms debounce delay
        []
    );

    useEffect(() => {
        return () => {
            debouncedCategory.cancel(); // Cleanup the debounced function on component unmount
        };
        if (id) {
            getCategory();
        }
    }, [debouncedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { categoryName: category, status };
        debouncedCategory(data);
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update Category" : "Add Category"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add"}</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to="/manage-category"
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-4" onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <label htmlFor="category" className="col-sm-2 col-form-label">
                                    Category
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter category name"
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
                                        <option>----Choose Status----</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-5 mt-5">
                                <div className="col-sm-5 offset-sm-2">
                                    <button
                                        type={loading ? "button" : "submit"}
                                        className={`btn btn-primary ${
                                            loading ? "disabled" : ""
                                        } me-3`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                <span role="status">Loading...</span>
                                            </>
                                        ) : (
                                            <>{id ? "Update" : "Submit"}</>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/manage-category")}
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

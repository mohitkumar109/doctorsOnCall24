import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import { useGetGenericByIdQuery, useUpdateGenericMutation } from "../../../redux/api/generic";

export default function EditGeneric() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [generic, setGeneric] = useState("");
    const [status, setStatus] = useState("");

    // Query to fetch data when editing an existing record
    const { data, error, refetch } = useGetGenericByIdQuery(id, {
        skip: !id, // Don't run if id is undefined (add mode)
    });

    const [updateGeneric, { isLoading: isUpdating }] = useUpdateGenericMutation();

    useEffect(() => {
        if (data) {
            setGeneric(data?.genericName || "");
            setStatus(data?.status || "");
        }
        refetch();
    }, [data, refetch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!generic) {
            toast.error("Generic name is required !");
            return;
        }
        try {
            const res = await updateGeneric({
                genericId: id,
                updateData: { genericName: generic, status },
            }).unwrap();

            if (res?.success) {
                toast.success(res?.message);
                navigate("/manage-generic");
            } else {
                toast.error(res?.error?.data?.message);
            }
        } catch (error) {
            console.error("Error during submit:", error);
            toast.error(error?.data?.message || "Failed to save generic.");
        }
    };

    if (error) {
        return <p>Error loading generic data for editing.</p>;
    }

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Update Generic"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Update</span>
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
                                        {isUpdating ? "Please wait..." : "Edit"}
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

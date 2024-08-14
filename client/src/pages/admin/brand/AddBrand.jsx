import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";

export default function AddBrand() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Add Brand"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Add Brand</span>
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
                        <form className="offset-2 mt-4">
                            <div className="row mb-4">
                                <label htmlFor="brand" className="col-sm-2 col-form-label">
                                    Brand
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
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
                                    <select className="form-select">
                                        <option>Choose...</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-5 mt-5">
                                <div className="col-sm-5 offset-sm-2">
                                    <button type="submit" className="btn btn-primary me-3">
                                        Submit
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

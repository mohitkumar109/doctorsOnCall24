import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import useServices from "../../../hooks/useService";
import { apiPoint } from "../../../services/adminApi";
import { toast } from "react-hot-toast";

export default function AddUser() {
    const { loading, postData } = useServices();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleUser = async (e) => {
        e.preventDefault();
        try {
            const req = apiPoint.userRegister({ fullName, email, password, mobile, role, status });
            const res = await postData(req);
            if (res.success === true) {
                toast.success(res?.message, { duration: 3000 });
                navigate("/manage-user");
            } else {
                toast.error(res?.message, { duration: 3000 });
            }
        } catch (error) {
            //console.log(error);
            toast.error(error.res.data.message, { duration: 3000 });
        }
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Add User"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Add User</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link to="/manage-user" className="btn btn-primary btn-sm waves-effect">
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-2 mt-5" onSubmit={handleUser}>
                            <div className="row mb-5">
                                <label htmlFor="fullName" className="col-sm-2 col-form-label">
                                    Full Name
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="fullName"
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="row mb-5">
                                <label htmlFor="email" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="row mb-5">
                                <label htmlFor="password" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <div className="row mb-5">
                                <label htmlFor="mobile" className="col-sm-2 col-form-label">
                                    Mobile
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="mobile"
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your mobile"
                                    />
                                </div>
                            </div>

                            <div className="row mb-5">
                                <label htmlFor="role" className="col-sm-2 col-form-label">
                                    User Role
                                </label>
                                <div className="col-sm-6">
                                    <select
                                        className="form-select"
                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option>----Choose role----</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <label htmlFor="status" className="col-sm-2 col-form-label">
                                    Status
                                </label>
                                <div className="col-sm-6">
                                    <select
                                        className="form-select"
                                        name="status"
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option>----Choose status----</option>
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
                                            "Submit"
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

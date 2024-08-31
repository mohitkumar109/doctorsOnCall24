import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import Breadcrumb from "../../../components/Breadcrumb";
import useServices from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function AddUser() {
    const { postData } = useServices();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUser();
        }
    }, [id]);

    const getUser = async () => {
        try {
            const req = apiEnd.getUserById(id);
            const res = await postData(req);
            if (res?.success) {
                setFullName(res?.data?.fullName || "");
                setEmail(res?.data?.email || "");
                //setPassword(res?.data?.password || "");
                setMobile(res?.data?.mobile || "");
                setRole(res?.data?.role || "");
                setStatus(res?.data?.status || "");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch user details.");
        }
    };

    const debouncedUser = useCallback(
        debounce(async (data) => {
            try {
                const req = id ? apiEnd.updateProfile(id, data) : apiEnd.userRegister(data);
                const res = await postData(req);
                if (res.success === true) {
                    toast.success(res?.message, { duration: 2000 });
                    navigate("/manage-user");
                } else {
                    toast.error(res?.message, { duration: 2000 });
                }
            } catch (error) {
                toast.error(error.res.data.message, { duration: 2000 });
            } finally {
                setLoading(false);
            }
        }, 1000), // 300ms debounce delay
        [navigate]
    );

    useEffect(() => {
        return () => {
            debouncedUser.cancel(); // Cleanup the debounced function on component unmount
        };
    }, [debouncedUser]);

    const handleUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            fullName,
            email,
            password,
            mobile,
            role,
            status,
        };
        debouncedUser(data);
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={id ? "Update User" : "Add User"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">{id ? "Update" : "Add"}</span>
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
                                        value={fullName}
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
                                        value={email}
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
                                        value={password}
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
                                        value={mobile}
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
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option>---- Choose Role ----</option>
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
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-select"
                                    >
                                        <option>---- Choose Status ----</option>
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
                                            <>{id ? "Update User" : "Submit"}</>
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

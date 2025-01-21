import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import axios from "axios";
import { BASE_URL } from "../services/apiConfig";
import LoginHeader from "../components/LoginHeader";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const debouncedLogin = useCallback(
        debounce(async (data) => {
            try {
                const response = await axios.post(`${BASE_URL}/admin/register`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (response && response.data.success) {
                    toast.success(response?.data.message, { duration: 3000 });
                    navigate("/");
                }
            } catch (error) {
                console.log("Something went wrong with the login:", error);
                toast.error(error?.response?.data?.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        }, 1000), // 300ms debounce delay
        [navigate]
    );

    const registerHandle = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { fullName, email, password, mobile, role };
        debouncedLogin(data);
    };

    useEffect(() => {
        return () => {
            debouncedLogin.cancel(); // Cleanup the debounced function on component unmount
        };
    }, [debouncedLogin]);

    return (
        <>
            <LoginHeader />
            <div className="container-fluid col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-12 mx-auto col-lg-8">
                        <h4 className="display-8 fw-bold lh-1 text-body-emphasis mb-3 text-center">
                            User Register
                        </h4>
                        <form onSubmit={registerHandle}>
                            <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="form-control"
                                        id="floatingFullName"
                                        placeholder="Full Name"
                                    />
                                    <label htmlFor="floatingFullName">Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="floatingEmail"
                                        placeholder="Email"
                                    />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="form-control"
                                        id="floatingMobile"
                                        placeholder="Mobile"
                                    />
                                    <label htmlFor="floatingMobile">Mobile</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="role"
                                            defaultValue="admin"
                                            onChange={(e) => setRole(e.target.value)}
                                            id="floatingAdmin"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="floatingAdmin">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="role"
                                            defaultValue="user"
                                            onChange={(e) => setRole(e.target.value)}
                                            id="floatingUser"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="floatingUser">
                                            User
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`btn ${loading ? "btn-dark" : "btn-dark"}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            <span role="status">Loading...</span>
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;

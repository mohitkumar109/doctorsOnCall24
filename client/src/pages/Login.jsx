import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../context/AppContext";
import LoginHeader from "../components/LoginHeader";
import AuthApi from "../services/AuthApi";

const Login = () => {
    const { setAuth } = useGlobalContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const apiInstance = useMemo(() => new AuthApi(), []);

    const loginHandle = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await apiInstance.loginAPI({ email, password });
            if (res?.success) {
                localStorage.setItem("token", JSON.stringify(res.data?.accessToken));
                setAuth(res?.data?.data?.role);
                toast.success(res?.message);
                setTimeout(() => {
                    navigate("/");
                }, 2000); // 2 seconds delay
            }
        } catch (error) {
            console.log("Something went wrong with the login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoginHeader />
            <div className="container-fluid col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-12 mx-auto col-lg-8">
                        <h4 className="display-8 fw-bold lh-1 text-body-emphasis mb-3 text-center">
                            User Login
                        </h4>
                        <form onSubmit={loginHandle}>
                            <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                        id="floatingEmail"
                                    />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                        id="floatingPassword"
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                {/* <div className="form-floating mb-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            onChange={(e) => setRole(e.target.value)}
                                            className="form-check-input"
                                            id="floatingAdmin"
                                        />
                                        <label className="form-check-label" htmlFor="floatingAdmin">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="user"
                                            onChange={(e) => setRole(e.target.value)}
                                            className="form-check-input"
                                            id="floatingUser"
                                        />
                                        <label className="form-check-label" htmlFor="floatingUser">
                                            User
                                        </label>
                                    </div>
                                </div> */}

                                <button
                                    type={loading ? "button" : "submit"}
                                    className={`btn btn-primary ${loading ? "disabled" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            <span role="status">Loading...</span>
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-md btn-primary m-3"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Forgot Password
                                </button>
                                <p>
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

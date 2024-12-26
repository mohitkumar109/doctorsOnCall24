import { Link } from "react-router-dom";

const LoginHeader = () => {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand">Medicine Store</span>
                <div className="d-flex gap-3">
                    <Link to="/" className="btn btn-secondary">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default LoginHeader;

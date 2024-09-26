import { Link } from "react-router-dom";

const Breadcrumb = ({ destination = "/", pageName }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-1 mb-3">
            <h4 className="h4">{pageName}</h4>
            <nav>
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item">
                        <Link to={destination}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;

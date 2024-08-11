import { Link } from "react-router-dom";

const Pagination = () => {
    return (
        <ul className="pagination my-2 overflow-auto pagination-sm justify-content-end">
            <li className="page-item disabled">
                <Link className="page-link">Previous</Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#">
                    1
                </Link>
            </li>
            <li className="page-item active">
                <Link className="page-link" to="#">
                    2
                </Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#">
                    Next
                </Link>
            </li>
        </ul>
    );
};

export default Pagination;

import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import GroupButton from "../../../components/GroupButton";

export default function ManageBrand() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Brand"} />
            <div className="content-area">
                <Filter />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Brand List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <GroupButton buttonLink="/add-brand" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                name="checked"
                                                className="form-check-input"
                                            />
                                        </th>
                                        <th className="col-9">Brand</th>
                                        <th className="col-2">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="checked"
                                                className="form-check-input"
                                            />
                                        </td>
                                        <td>
                                            <span className="text-default">Electronic</span>
                                        </td>
                                        <td>
                                            <span className="text-default"> 15/05/2024 </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-danger">Active</span>
                                        </td>
                                        <td className="text-default">
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-primary btn-sm">
                                                    <BsPencil />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <BsTrash3Fill />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}

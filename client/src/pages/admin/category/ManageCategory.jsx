import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import GroupButton from "../../../components/GroupButton";

export default function ManageCategory() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Category"} />
            <div className="content-area">
                <Filter />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Category List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <GroupButton />
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
                                        <th className="col-9">Category</th>
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
                                            <span className="text-default">materials</span>
                                        </td>
                                        <td>
                                            <span className="text-default">05-06-2024</span>
                                        </td>

                                        <td>
                                            <span class="badge bg-success">Active</span>
                                        </td>
                                        <td className="text-default">
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-primary btn-sm">
                                                    <i className="bi bi-pencil" />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <i className="bi bi-trash" />
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

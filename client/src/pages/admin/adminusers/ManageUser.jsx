import React, { useState, useEffect } from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import useServices from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function ManageUser() {
    const { postData } = useServices();
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const req = apiEnd.userFetch();
        const res = await postData(req);
        setData(res?.data);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionUserOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchUser(); // Ensure fetchUser is defined
        } else {
            toast.error(res?.message || "Failed to delete User", { duration: 1000 });
        }
    };

    const filteredData = data?.filter(
        (result) => result.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"All User"} />
            <div className="content-area">
                <div className="card my-3">
                    <div className="card-body">
                        <h6>Filter</h6>
                        <div className="row">
                            <div className="col-sm-6 my-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="form-control form-control-sm"
                                        placeholder="Search here...."
                                    />
                                    <span className="input-group-text bg-info">Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">User List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="btn-group mb-3">
                            <Link to="/add-user" className="btn btn-primary btn-sm waves-effect">
                                Add User
                            </Link>
                        </div>
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
                                        <th className="col-3">Full Name</th>
                                        <th className="col-3">Email</th>
                                        <th className="col-2">Selected Store</th>
                                        <th className="col-1">Role Type</th>
                                        <th className="col-1">CreatedBy</th>
                                        <th className="col-1">UpdatedBy</th>
                                        <th className="col-1">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        <>
                                            {filteredData?.map((user, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            name="checked"
                                                            className="form-check-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.fullName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.email}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.storeId?.storeName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.role}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {user?.createdBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.updatedBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.createdAt?.split("T")[0]}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`flexSwitchCheckChecked-${user._id}`}
                                                                checked={user.status === "active"}
                                                                className="form-check-input mt-2"
                                                                onChange={() =>
                                                                    changeStatus(
                                                                        user._id,
                                                                        user.status === "active"
                                                                            ? "inactive"
                                                                            : "active"
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                className={`badge ${
                                                                    user.status === "active"
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                }`}
                                                            >
                                                                {user.status === "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-default">
                                                        <div className="d-flex gap-3">
                                                            <Link
                                                                to={`/edit-user/${user._id}`}
                                                                className="text-primary"
                                                            >
                                                                <BsPencil />
                                                            </Link>

                                                            <Link className="text-danger">
                                                                <BsTrash3Fill
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            user._id,
                                                                            "delete"
                                                                        )
                                                                    }
                                                                />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <tr>
                                                <td colSpan="12" className="p-4 text-center">
                                                    No Data Found!
                                                </td>
                                            </tr>
                                        </>
                                    )}
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

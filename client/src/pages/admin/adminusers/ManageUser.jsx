import React, { useState, useEffect } from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import GroupButton from "../../../components/GroupButton";
import useServices from "../../../hooks/useService";
import { apiPoint } from "../../../services/adminApi";

export default function ManageUser() {
    const { postData } = useServices();
    const [data, setData] = useState("");

    const fetchUser = async () => {
        const req = apiPoint.userFetch();
        const res = await postData(req);
        setData(res?.data);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"User"} />
            <div className="content-area">
                <Filter />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">User List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <GroupButton buttonLink="/add-user" />
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
                                        <th className="col-3">Role</th>
                                        <th className="col-2">Mobile</th>
                                        <th className="col-3">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        <>
                                            {data?.map((user, index) => (
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
                                                            {user?.role}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {user?.mobile}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {user.createdAt.split("T")[0]}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                user?.status === "active"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                            }`}
                                                        >
                                                            {user?.status}
                                                        </span>
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

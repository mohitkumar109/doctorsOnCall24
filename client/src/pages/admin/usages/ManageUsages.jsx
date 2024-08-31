import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function ManageUsages() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchUsage = async () => {
        const req = apiEnd.getUsage(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionUsageOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchUsage(); // Ensure fetchUsage is defined
        } else {
            toast.error(res?.message || "Failed to delete usage", { duration: 1000 });
        }
    };

    useEffect(() => {
        fetchUsage();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result?.usageName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Usage"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Usage List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-usage" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-6">Usage Name</th>
                                        <th className="col-2">CreatedBy</th>
                                        <th className="col-2">UpdatedBy</th>
                                        <th className="col-2">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        <>
                                            {filteredData?.map((usage, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <span className="text-default">
                                                            {usage?.usageName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {usage?.createdBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {usage?.updatedBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {usage.createdAt.split("T")[0]}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`flexSwitchCheckChecked-${usage._id}`}
                                                                checked={usage.status === "active"}
                                                                className="form-check-input mt-2"
                                                                onChange={() =>
                                                                    changeStatus(
                                                                        usage._id,
                                                                        usage.status === "active"
                                                                            ? "inactive"
                                                                            : "active"
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                className={`badge ${
                                                                    usage.status === "active"
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                }`}
                                                            >
                                                                {usage.status === "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-default">
                                                        <div className="d-flex gap-3">
                                                            <Link
                                                                to={`/edit-usage/${usage._id}`}
                                                                className="text-primary"
                                                            >
                                                                <BsPencil />
                                                            </Link>

                                                            <Link to="#" className="text-danger">
                                                                <BsTrash3Fill
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            usage._id,
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
                        <Pagination
                            totalResult={pagination.totalResult}
                            pages={pagination.totalPages}
                            page={pagination.currentPage}
                            changePage={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default function ManageStore() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchStore = async () => {
        const req = apiEnd.getStore(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionStoreOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message);
            fetchStore(); // Ensure fetchStore is defined
        } else {
            toast.error(res?.message || "Failed to delete Store");
        }
    };

    useEffect(() => {
        fetchStore();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result?.storeName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-store" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-3">Store Name</th>
                                        <th className="col-3">Address</th>
                                        <th className="col-1">Store Phone</th>
                                        <th className="col-2">Person Email</th>
                                        <th className="col-1">CreatedBy</th>
                                        <th className="col-1">UpdatedBy</th>
                                        <th className="col-2">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        <>
                                            {filteredData?.map((line, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.storeName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.location?.address}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.location?.phone}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.contactPerson?.email}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.createdBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.updatedBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line.createdAt.split("T")[0]}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`flexSwitchCheckChecked-${line._id}`}
                                                                checked={line.status === "active"}
                                                                className="form-check-input mt-2"
                                                                onChange={() =>
                                                                    changeStatus(
                                                                        line._id,
                                                                        line.status === "active"
                                                                            ? "inactive"
                                                                            : "active"
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                className={`badge ${
                                                                    line.status === "active"
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                }`}
                                                            >
                                                                {line.status === "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-default">
                                                        <div className="d-flex gap-3">
                                                            <Link
                                                                to={`/edit-store/${line._id}`}
                                                                className="text-primary"
                                                            >
                                                                <BsPencil />
                                                            </Link>

                                                            <Link to="#" className="text-danger">
                                                                <BsTrash3Fill
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            line._id,
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

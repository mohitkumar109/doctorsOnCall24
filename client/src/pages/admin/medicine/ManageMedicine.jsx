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
import { indianDateFormat } from "../../../utils/helper";

export default function ManageMedicine() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchMedicine = async () => {
        const req = apiEnd.getMedicine(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionMedicineOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message);
            fetchMedicine(); // Ensure fetchMedicine is defined
        } else {
            toast.error(res?.message || "Failed to delete medicine");
        }
    };

    useEffect(() => {
        fetchMedicine();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result?.genericName?.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Medicine"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-medicine" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th className="col-2">Generic Name</th>
                                        <th className="col-1">Category</th>
                                        <th className="col-1">Brand</th>
                                        <th className="col-1">Strength</th>
                                        <th className="col-1">Usage</th>
                                        <th className="col-1">Quantity</th>
                                        <th className="col-1">Price</th>
                                        <th className="col-1">Expire Date</th>
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
                                            {filteredData?.map((line, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.genericName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.categoryName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.brandName}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.strengthName}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.usageName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.quantity}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.price}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {indianDateFormat(line?.expireDate)}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.createdByUser?.fullName ||
                                                                "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {line?.updatedByUser?.fullName ||
                                                                "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {indianDateFormat(line?.createdAt)}
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

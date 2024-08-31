import React, { useState, useEffect } from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import GroupButton from "../../../components/GroupButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import { Action } from "./CategoryAction";

export default function ManageCategory() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCategory();
    }, [search, sorting, status, page]);

    const fetchCategory = async () => {
        const req = apiEnd.getCategory(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionCategoryOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message);
            fetchCategory(); // Ensure fetchCategory is defined
        } else {
            toast.error(res?.message || "Failed to delete category");
        }
    };

    const handleSelectAllChange = () => {
        const updatedCheckboxes = data.map((checkbox) => ({
            ...checkbox,
            checked: !selectAll,
        }));
        setData(updatedCheckboxes);
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = data.map((checkbox) =>
            checkbox._id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setData(updatedCheckboxes);
        setSelectAll(updatedCheckboxes.every((checkbox) => checkbox.checked));
    };

    const filteredData = data.filter(
        (result) => result.categoryName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Category"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Category List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <GroupButton
                            buttonLink="/add-category"
                            data={data}
                            fetchCategory={fetchCategory}
                            Action={Action}
                        />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                name="checked"
                                                onChange={handleSelectAllChange}
                                                checked={selectAll}
                                                className="form-check-input"
                                            />
                                        </th>
                                        <th className="col-6">Category</th>
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
                                            {filteredData.map((cat, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            name="checked"
                                                            checked={cat.checked}
                                                            onChange={() => {
                                                                handleCheckboxChange(cat._id);
                                                            }}
                                                            className="form-check-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {cat.categoryName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {cat?.createdBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {cat?.updatedBy?.fullName || "None"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-default">
                                                            {cat.createdAt.split("T")[0]}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                type="checkbox"
                                                                role="switch"
                                                                id={`flexSwitchCheckChecked-${cat._id}`}
                                                                checked={cat.status === "active"}
                                                                className="form-check-input mt-2"
                                                                onChange={() =>
                                                                    changeStatus(
                                                                        cat._id,
                                                                        cat.status === "active"
                                                                            ? "inactive"
                                                                            : "active"
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                className={`badge ${
                                                                    cat.status === "active"
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                }`}
                                                            >
                                                                {cat.status === "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-default">
                                                        <div className="d-flex gap-3">
                                                            <Link
                                                                to={`/edit-category/${cat._id}`}
                                                                className="text-primary"
                                                            >
                                                                <BsPencil />
                                                            </Link>

                                                            <Link to="#" className="text-danger">
                                                                <BsTrash3Fill
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            cat._id,
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
                                        <tr>
                                            <td colSpan="12" className="p-4 text-center">
                                                No Data Found!
                                            </td>
                                        </tr>
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

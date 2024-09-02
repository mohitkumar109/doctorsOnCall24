import React from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import AddButton from "../AddButton";
import Pagination from "../Pagination";
import { capitalizeFirstLetter } from "../../utils/helper";

const GenericTable = ({ filteredData, pagination, changeStatus, page, setPage }) => {
    return (
        <>
            <AddButton buttonLink="/add-generic" />
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">SN</th>
                            <th className="col-6">Generic Name</th>
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
                                {filteredData?.map((generic, index) => (
                                    <tr key={index}>
                                        <td>{(page - 1) * 20 + index + 1}</td>
                                        <td>
                                            <span className="text-default">
                                                {capitalizeFirstLetter(generic?.genericName)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-default">
                                                {generic?.createdBy?.fullName || "None"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-default">
                                                {generic?.updatedBy?.fullName || "None"}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="text-default">
                                                {generic.createdAt.split("T")[0]}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    role="switch"
                                                    id={`flexSwitchCheckChecked-${generic._id}`}
                                                    checked={generic.status === "active"}
                                                    className="form-check-input mt-2"
                                                    onChange={() =>
                                                        changeStatus(
                                                            generic._id,
                                                            generic.status === "active"
                                                                ? "inactive"
                                                                : "active"
                                                        )
                                                    }
                                                />
                                                <span
                                                    className={`badge ${
                                                        generic.status === "active"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {generic.status === "active"
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-default">
                                            <div className="d-flex gap-3">
                                                <Link
                                                    to={`/edit-generic/${generic._id}`}
                                                    className="text-primary"
                                                >
                                                    <BsPencil />
                                                </Link>

                                                <Link to="#" className="text-danger">
                                                    <BsTrash3Fill
                                                        onClick={() =>
                                                            changeStatus(generic._id, "delete")
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
                <Pagination
                    totalResult={pagination.totalResult}
                    pages={pagination.totalPages}
                    page={pagination.currentPage}
                    changePage={setPage}
                />
            </div>
        </>
    );
};

export default GenericTable;

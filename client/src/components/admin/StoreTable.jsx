import React from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";

const StoreTable = ({ record, sn, changeStatus }) => {
    return (
        <tr>
            <td>{sn + 1}</td>
            <td>{record?.storeName}</td>
            <td>{record?.location?.address}</td>
            <td>{record?.location?.phone}</td>
            <td>{record?.contactPerson?.email}</td>
            <td>{record?.createdByUser?.fullName || "None"}</td>
            <td>{record?.updatedByUser?.fullName || "None"}</td>
            <td>{record.createdAt.split("T")[0]}</td>
            <td>
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheckChecked-${record._id}`}
                        checked={record.status === "active"}
                        className="form-check-input mt-2"
                        onChange={() =>
                            changeStatus(
                                record._id,
                                record.status === "active" ? "inactive" : "active"
                            )
                        }
                    />
                    <span
                        className={`badge ${
                            record.status === "active" ? "bg-success" : "bg-danger"
                        }`}
                    />
                    {record.status === "active" ? "Active" : "Inactive"}
                </div>
            </td>
            <td className="text-default">
                <div className="d-flex gap-3">
                    <Link to={`/edit-store/${record._id}`} className="text-primary">
                        <BsPencil />
                    </Link>

                    <Link to="#" className="text-danger">
                        <BsTrash3Fill onClick={() => changeStatus(record._id, "delete")} />
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default StoreTable;

import React from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { indianDateFormat } from "../../utils/helper";
import moment from "moment";

const MedicineTable = ({ record, sn, changeStatus }) => {
    return (
        <tr>
            <td>{sn + 1}</td>
            <td>{record?.name}</td>
            <td>{record?.generic?.genericName}</td>
            <td>{record?.category?.categoryName}</td>
            <td>{record?.brand?.brandName}</td>
            <td>
                {record?.strength?.strengthName} {record?.unitType}
            </td>
            <td>{record?.usage?.usageName}</td>
            <td>{moment(record?.expireDate).format("DD-MM-YYYY")}</td>
            <td>{record?.stock}</td>
            <td>{record?.price}</td>
            <td>{moment(record?.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
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
                    >
                        {record.status === "active" ? "Active" : "Inactive"}
                    </span>
                </div>
            </td>
            <td className="text-default">
                <div className="d-flex gap-3">
                    <Link to={`/edit-medicine/${record._id}`} className="text-primary">
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

export default MedicineTable;

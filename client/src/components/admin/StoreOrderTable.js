import React from "react";
import { Link } from "react-router-dom";
import { BsEye, BsTrash3Fill } from "react-icons/bs";
import moment from "moment-timezone";

const StoreOrderTable = ({ sn, record }) => {
    return (
        <tr>
            <td>{sn + 1}</td>
            <td>{record?.store}</td>
            <td>{record?.orderId}</td>
            <td>{record?.orderPrice?.toFixed(2)}</td>
            <td>{moment(record?.orderDt).format("DD-MM-YYYY , hh:mm a")}</td>
            <td>{record?.status}</td>
            <td className="text-default">
                <div className="d-flex gap-3">
                    <Link to={`/store-orders/${record?.orderId}`} className="text-primary">
                        <BsEye />
                    </Link>

                    <Link to="#" className="text-danger">
                        <BsTrash3Fill />
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default StoreOrderTable;

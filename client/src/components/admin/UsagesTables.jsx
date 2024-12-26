import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import TableHOC from "./TableHOC";

const columns = [
    {
        Header: "SN",
        accessor: "sn",
    },
    {
        Header: "Usage Name",
        accessor: "usageName",
    },
    {
        Header: "CreatedBy",
        accessor: "createdBy",
    },
    {
        Header: "UpdatedBy",
        accessor: "updatedBy",
    },
    {
        Header: "CreatedAt",
        accessor: "createdAt",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const UsagesTables = ({ data = [], changeStatus }) => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (data)
            setRows(
                data.map((i, index) => ({
                    sn: index + 1,
                    usageName: i.usageName,
                    createdBy: i.createdBy || "None",
                    updatedBy: i.updatedBy || "None",
                    createdAt: i.createdAt.split("T")[0],
                    status: (
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                role="switch"
                                id={`flexSwitchCheckChecked-${i._id}`}
                                checked={i.status === "active"}
                                className="form-check-input mt-2"
                                onChange={() =>
                                    changeStatus(
                                        i._id,
                                        i.status === "active" ? "inactive" : "active"
                                    )
                                }
                            />
                            <span
                                className={`badge ${
                                    i.status === "active" ? "bg-success" : "bg-danger"
                                }`}
                            >
                                {i.status === "active" ? "Active" : "Inactive"}
                            </span>
                        </div>
                    ),
                    action: (
                        <div className="d-flex gap-3">
                            <Link to={`/edit-usage/${i._id}`} className="text-primary">
                                <BsPencil />
                            </Link>

                            <Link to="#" className="text-danger">
                                <BsTrash3Fill onClick={() => changeStatus(i._id, "delete")} />
                            </Link>
                        </div>
                    ),
                }))
            );
    }, [data]);

    return TableHOC(columns, rows, "table-responsive", true)();
};

export default UsagesTables;

import React, { useState, useEffect, useMemo } from "react";
import useService from "../../hooks/useService";
import { apiEnd } from "../../services/adminApi";
import TableHOC from "./TableHOC";

const columns = [
    { Header: "S.N", accessor: "sn" },
    { Header: "Medicine Name", accessor: "name" },
    { Header: "Generic", accessor: "generic" },
    { Header: "Category", accessor: "category" },
    { Header: "Brand", accessor: "brand" },
    { Header: "Strength", accessor: "strength" },
    { Header: "Usage", accessor: "usage" },
    { Header: "Expire Date", accessor: "expireDate" },
    { Header: "Quantity", accessor: "stock" },
    { Header: "Price", accessor: "price" },
    { Header: "CreatedAt", accessor: "createdAt" },
];

const LowStockReportsTable = () => {
    return <div>LowStockReportsTable</div>;
};

export default LowStockReportsTable;

import React, { useState, useEffect, useMemo } from "react";
import useService from "../../hooks/useService";
import { apiEnd } from "../../services/adminApi";
import TableHOC from "./TableHOC";

const columns = [
    { Header: "S.N", accessor: "sn" },
    { Header: "Medicine Name", accessor: "medicineName" },
    { Header: "Total Added", accessor: "totalAdditions" },
    { Header: "Total Removed", accessor: "totalSubtraction" },
    { Header: "Total Sale", accessor: "totalSales" },
    { Header: "Current Stock", accessor: "currentStock" },
];

const MedicineInventoryTable = () => {
    const { postData } = useService();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMedicineInventory = async () => {
            try {
                const req = apiEnd.getMedicineInventory();
                const res = await postData(req);
                if (res?.success) {
                    setData(res?.data?.results || []);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchMedicineInventory();
    }, [postData]);

    const rows = useMemo(
        () =>
            data.map((item, index) => ({
                sn: index + 1,
                medicineName: item.medicineName,
                totalAdditions: item.totalAdditions || "None",
                totalSubtraction: item.totalSubtraction || "None",
                totalSales: item.totalSales || "None",
                currentStock: item.currentStock || "None",
            })),
        [data]
    );

    return TableHOC(columns, rows, "table-responsive", true)();
};

export default MedicineInventoryTable;

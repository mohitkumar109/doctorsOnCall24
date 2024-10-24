import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function MedicineInventory() {
    const { postData } = useService();
    const [data, setData] = useState([]);

    const fetchMedicineInventory = async () => {
        try {
            const req = apiEnd.getMedicineInventory();
            const res = await postData(req);
            if (res?.success) {
                setData(res?.data?.results);
            }
        } catch (error) {
            console.log("Failed to fetch Medicine Inventory Logs.");
        }
    };

    useEffect(() => {
        fetchMedicineInventory();
    }, []);

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Inventory Statistics"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine Inventory</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="" level={"Medicine Inventory"} />
                        <div className="table-responsive">
                            <table className="table table-responsive table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-5">Medicine Name</th>
                                        <th scope="col">Total Added</th>
                                        <th scope="col">Total Removed</th>
                                        <th scope="col">Total Sale</th>
                                        <th scope="col">Current Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((line, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{line?.medicineName}</td>
                                                    <td>{line?.totalAdditions}</td>
                                                    <td>{line?.totalSubtraction}</td>
                                                    <td>{line?.totalSales}</td>
                                                    <td>{line?.currentStock}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="14" className="p-4 text-center">
                                                No Data Found!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function StoreInventory() {
    const { postData } = useService();
    const { id } = useParams();
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchStoreInventory = async () => {
        try {
            const req = apiEnd.getStoreInventory(page, id);
            const res = await postData(req);
            if (res?.success) {
                setData(res?.data?.results);
                setPagination(res?.data?.pagination);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch brand details.");
        }
    };

    useEffect(() => {
        fetchStoreInventory();
    }, [page]);

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Medicine"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/select-store-assign" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/select-store" level={"Add Medicine to Store"} />
                        <div className="table-responsive">
                            <table className="table table-responsive table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-3">Medicine Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((store, index) => (
                                            <React.Fragment key={store._id}>
                                                {store.items.map((item, idx) => (
                                                    <tr key={idx}>
                                                        {idx === 0 && (
                                                            <td rowSpan={store.items.length}>
                                                                {index + 1}
                                                            </td>
                                                        )}
                                                        <td>{item.medicineId?.name}</td>
                                                        <td>{item.medicineId?.price.toFixed(2)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            {parseFloat(
                                                                item.quantity *
                                                                    item.medicineId?.price
                                                            ).toFixed(2)}
                                                        </td>
                                                        {idx === 0 && (
                                                            <>
                                                                <td rowSpan={store.items.length}>
                                                                    {parseFloat(
                                                                        store.orderPrice.toFixed(2)
                                                                    )}
                                                                </td>
                                                                <td rowSpan={store.items.length}>
                                                                    {store.status}
                                                                </td>
                                                                <td rowSpan={store.items.length}>
                                                                    {new Date(
                                                                        store.orderDate
                                                                    ).toLocaleDateString()}
                                                                </td>
                                                                <td rowSpan={store.items.length}>
                                                                    {store.createdBy?.fullName}
                                                                </td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
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
                        <Pagination
                            totalResult={pagination?.totalResult}
                            pages={pagination?.totalPages}
                            page={pagination?.currentPage}
                            changePage={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

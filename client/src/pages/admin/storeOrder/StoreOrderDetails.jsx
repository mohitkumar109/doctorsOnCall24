import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function StoreOrderDetails() {
    const { postData } = useService();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const fetchStoreOrderItems = async () => {
        try {
            const req = apiEnd.getStoreOrderItemsByOrderId(id, page);
            const res = await postData(req);
            if (res?.success) {
                setData(res?.data?.results);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch Medicine details.");
        }
    };

    useEffect(() => {
        fetchStoreOrderItems();
    }, []);

    const totalAmount = data?.reduce((acc, item) => acc + item.grandTotal, 0);

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store Order Items"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Order Items List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/store-orders/" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-responsive table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-2">Medicine Name</th>
                                        <th scope="col">Generic</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Usage</th>
                                        <th scope="col">Strength</th>
                                        <th scope="col">Order Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((rs, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{rs?.medicineName}</td>
                                                <td>{rs?.generic}</td>
                                                <td>{rs?.category}</td>
                                                <td>{rs?.brand}</td>
                                                <td>{rs?.usage}</td>
                                                <td>{rs?.strength}</td>
                                                <td>{rs?.quantity}</td>
                                                <td>{rs?.price}</td>
                                                <td>
                                                    {parseFloat(rs?.quantity * rs?.price).toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
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
                    </div>
                    <div className="card-footer">
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <h5 className="text-right me-5 mt-2">
                                Subtotal: ₹{parseFloat(totalAmount.toFixed(2))}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

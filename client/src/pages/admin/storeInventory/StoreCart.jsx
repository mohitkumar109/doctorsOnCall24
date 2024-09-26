import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import StoreCartTable from "../../../components/admin/StoreCartTable";
import TableHead from "../../../components/admin/TableHead";
import useService from "../../../hooks/useService";
import { storeCartTable } from "../../../utils/tableHelper";
import { apiEnd } from "../../../services/adminApi";

export default function StoreCart() {
    const { postData } = useService();
    const { id } = useParams();
    const [data, setData] = useState([]);

    const fetchStoreCart = async () => {
        try {
            const req = apiEnd.getStoreCart(id);
            const res = await postData(req);
            if (res?.success) {
                setData(res?.data);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch brand details.");
        }
    };

    useEffect(() => {
        fetchStoreCart();
    }, [id]);

    const submitCart = async () => {
        try {
            const req = apiEnd.adStoreAssignMedicine();
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                //setCart([]); // Clear cart after submission
                //localStorage.removeItem("cartItems"); // Clear the cart in localStorage
                //window.location = "/select-store";
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    const renderStoreCartRows = (line) => {
        return line?.items?.map((record, idx) => (
            <StoreCartTable record={record} sn={idx} key={idx} />
        ));
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store Cart"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store Cart List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to={`/add-store-cart/${id}`}
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <TableHead headers={storeCartTable} />
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((line) => renderStoreCartRows(line))
                                    ) : (
                                        <tr>
                                            <td colSpan="14" className="p-4 text-center">
                                                Cart is empty
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Subtotal Section */}
                    {data?.length > 0 && (
                        <div className="card-footer">
                            <div className="d-flex gap-2" style={{ float: "right" }}>
                                <h5 className="text-right me-5 mt-2">
                                    Subtotal: ₹{data.map((total) => total.cartTotal)}
                                </h5>
                                <div className="text-right me-5">
                                    <button className="btn btn-success" onClick={submitCart}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

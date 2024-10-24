import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import TableHead from "../../../components/admin/TableHead";
import useService from "../../../hooks/useService";
import { storeCartTable } from "../../../utils/tableHelper";
import { apiEnd } from "../../../services/adminApi";
import { useGlobalContext } from "../../../context/AppContext";

export default function StoreCart() {
    const { cart, setCart, increaseQty, decreaseQty, removeItemCart } = useGlobalContext();
    const { postData } = useService();
    const { id } = useParams();
    const [subtotal, setSubtotal] = useState(0);

    // Load cart from localStorage when initializing the cart state
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Calculate subtotal whenever the cart changes
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const roundedTotal = parseFloat(total.toFixed(2)); // Round to 2 decimal places
        setSubtotal(roundedTotal);
    }, [cart]);

    const submitCart = async () => {
        try {
            const req = apiEnd.adStoreAssignMedicine(id, cart);
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                setCart([]); // Clear cart after submission
                localStorage.removeItem("cartItems"); // Clear the cart in localStorage
                window.location = "/select-store";
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    function handleIncreaseQty(id) {
        return () => {
            increaseQty(id);
        };
    }

    function handleDecreaseQty(id) {
        return () => {
            decreaseQty(id);
        };
    }

    function handleRemove(id) {
        return () => {
            removeItemCart(id);
        };
    }

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
                                    {cart?.length > 0 ? (
                                        cart?.map((line, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{line?.medicineId}</td>
                                                <td>{line?.price}</td>
                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto">
                                                        <div className="input-group-btn">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-primary"
                                                                onClick={handleDecreaseQty(
                                                                    line?.medicine
                                                                )}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="qty"
                                                            value={line?.quantity}
                                                            className="form-control-sm bg-secondary border-0 text-center"
                                                            readOnly
                                                        />
                                                        <div className="input-group-btn">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-primary"
                                                                onClick={handleIncreaseQty(
                                                                    line?.medicine
                                                                )}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="align-middle">
                                                    {(line?.quantity * line?.price).toFixed(2)}
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={handleRemove(line?.medicine)}
                                                        style={{ marginLeft: "10px" }}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
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
                    {cart?.length > 0 && (
                        <div className="card-footer">
                            <div className="d-flex gap-2" style={{ float: "right" }}>
                                <h5 className="text-right me-5 mt-2">Subtotal: ₹{subtotal}</h5>
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

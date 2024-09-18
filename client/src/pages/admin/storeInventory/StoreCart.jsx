import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import { apiEnd } from "../../../services/adminApi";
import useService from "../../../hooks/useService";
import { useGlobalContext } from "../../../context/AppContext";

export default function StoreCart() {
    const { cart, setCart, increaseQuantity, decreaseQuantity, removeItemCart } =
        useGlobalContext();
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
        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        setSubtotal(total);
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

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store Cart"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store Cart List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link
                                to={`/add-store-inventory/${id}`}
                                className="btn btn-primary btn-sm waves-effect"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th className="col-3">Medicine</th>
                                        <th scope="col">Price</th>
                                        <th className="col-2">Quantity</th>
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.length > 0 ? (
                                        <>
                                            {cart?.map((line, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.medicineId}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className="text-default">
                                                            {line?.price}
                                                        </span>
                                                    </td>

                                                    <td className="align-middle">
                                                        <div className="input-group quantity mx-auto">
                                                            <div className="input-group-btn">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-primary"
                                                                    onClick={() =>
                                                                        decreaseQuantity(
                                                                            line.medicineId
                                                                        )
                                                                    }
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
                                                                    onClick={() =>
                                                                        increaseQuantity(
                                                                            line.medicineId
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="align-middle">
                                                        {line?.totalPrice}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                removeItemCart(line?.medicineId)
                                                            }
                                                            style={{ marginLeft: "10px" }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
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

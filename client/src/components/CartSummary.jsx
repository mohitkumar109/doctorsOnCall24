import React from "react";
import { toast } from "react-hot-toast";

const CartSummary = ({ cartItems, setCart }) => {
    // Function to handle removing a product from the cart
    const removeFromCart = (medicineId) => {
        setCart((prevCart) => prevCart.filter((item) => item.medicineId !== medicineId));
        toast.success("Medicine removed from cart!");
    };

    return (
        <div className="cart-summary">
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.medicineId} className="cart-item">
                        <div>
                            <h3>{item.medicineName}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total Price: ${item.totalPrice}</p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.medicineId)}
                            className="btn btn-danger"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartSummary;

import React, { useState, useEffect } from "react";

// Sample data object
export const data = {
    results: [
        {
            _id: "66ebca5d5908800c89f2d4e3",
            storeId: "66d2edd7086cda0999990fac",
            totalAmount: 220,
            status: "active",
            createdBy: "66cf62669945dac6c8dc1573",
            orderDate: "2024-09-19T06:53:17.742Z",
            createdAt: "2024-09-19T06:53:17.743Z",
            items: [
                {
                    medicineId: "66e2d5511bb29da13587dac2",
                    quantity: 30,
                    totalPrice: 120,
                },
                {
                    medicineId: "66e44b04456d5f18499192ae",
                    quantity: 20,
                    totalPrice: 100,
                },
            ],
        },
    ],
};

export default function Test({ data }) {
    const [filteredResults, setFilteredResults] = useState([]);
    const storeIdToFilter = "66d2edd7086cda0999990fac"; // Replace with the storeId you want to filter by

    useEffect(() => {
        // Filter the results based on storeId
        const filtered = data?.results?.filter((result) => result.storeId === storeIdToFilter);
        setFilteredResults(filtered);
    }, [data?.results]);

    return (
        <div>
            {filteredResults?.map((result) => (
                <div key={result._id}>
                    <h3>Order ID: {result._id}</h3>
                    <p>Status: {result.status}</p>
                    <p>Order Date: {new Date(result.orderDate).toLocaleDateString()}</p>

                    {/* Display items in a table */}
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Medicine ID</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.medicineId}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Display total amount */}
                    <h4>Total Amount: ${result.totalAmount}</h4>
                </div>
            ))}
        </div>
    );
}

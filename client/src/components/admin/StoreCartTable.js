import React from "react";

const StoreCartTable = ({ record, sn, increaseQty, decreaseQty, removeItemCart }) => {
    return (
        <tr>
            <td>{sn + 1}</td>
            <td>{record?.medicine?.name}</td>
            <td>{record?.medicine?.price}</td>
            <td className="align-middle">
                <div className="input-group quantity mx-auto">
                    <div className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => decreaseQty(record?.medicineId)}
                        >
                            -
                        </button>
                    </div>
                    <input
                        type="text"
                        name="qty"
                        value={record?.quantity}
                        className="form-control-sm bg-secondary border-0 text-center"
                        readOnly
                    />
                    <div className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => increaseQty(record?.medicineId)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </td>

            <td className="align-middle">{record?.medicine?.price * record?.quantity}</td>

            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItemCart(record?.medicineId)}
                    style={{ marginLeft: "10px" }}
                >
                    Remove
                </button>
            </td>
        </tr>
    );
};

export default StoreCartTable;

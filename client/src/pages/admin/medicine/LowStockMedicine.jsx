import React from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";

export default function LowStockMedicine() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Low Stock Reports"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine Low Stock</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/manage-medicine" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-medicine" level={"Add Medicine"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

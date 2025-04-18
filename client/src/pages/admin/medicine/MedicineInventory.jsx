import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import MedicineInventoryTable from "../../../components/admin/MedicineInventoryTable";

export default function MedicineInventory() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Inventory Statistics"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine Inventory</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/manage-medicine" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/manage-medicine" level={"Manage Medicine"} />
                        <MedicineInventoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}

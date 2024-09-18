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
    const [store, setStore] = useState([]);
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [input, setInput] = useState({
        sorting: "",
        status: "",
        storeId: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fetchStoreInventory = async () => {
        try {
            const req = apiEnd.getStoreInventory(input.sorting, input.status, page, id);
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
        fetchStore();
    }, [input.sorting, input.status, page]);

    const fetchStore = async () => {
        const req = apiEnd.getStoreSelect();
        const res = await postData(req);
        setStore(res?.data?.data);
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Medicine"} />
            <div className="content-area">
                <div className="card my-3">
                    <div className="card-body">
                        <h6>Filter</h6>
                        <div className="row">
                            <div className="col-sm-4 my-2">
                                <select
                                    name="storeId"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value="">--Select Store--</option>
                                    {store?.map((record, i) => (
                                        <option value={record?._id} key={i}>
                                            {record?.storeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/select-store" />
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-2">Medicine Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Status</th>
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
                                                        {/* Only display store details on the first item row */}
                                                        {idx === 0 && (
                                                            <td rowSpan={store.items.length}>
                                                                {store.storeId.storeName}
                                                            </td>
                                                        )}

                                                        <td>
                                                            <span className="text-default">
                                                                {item.medicineId.name}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className="text-default">
                                                                {item.quantity}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className="text-default">
                                                                {item.price}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className="text-default">
                                                                {item.totalPrice}
                                                            </span>
                                                        </td>

                                                        {idx === 0 && (
                                                            <>
                                                                <td rowSpan={store.items.length}>
                                                                    {store.totalAmount}
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
                                                                    {store.createdBy.fullName}
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

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import StoreOrderTable from "../../../components/admin/StoreOrderTable";

export default function StoreOrder() {
    const { postData } = useService();
    const [data, setData] = useState([]);
    const [store, setStore] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState("");
    const [input, setInput] = useState({
        storeId: "",
        fromDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const fetchStoreOrder = async () => {
        try {
            const req = apiEnd.getStoreOrderByStoreId(input.fromDate, page, input.storeId);
            const res = await postData(req);
            if (res?.success) {
                setData(res?.data?.results);
                setPagination(res?.data?.pagination);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch Order details.");
        }
    };

    useEffect(() => {
        const getStore = async () => {
            const req = apiEnd.getStoreSelect();
            const res = await postData(req);
            if (res?.success) {
                setStore(res?.data?.data);
            }
        };
        getStore();
        fetchStoreOrder();
    }, [page]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the page from reloading
        fetchStoreOrder(); // Call the function to fetch data
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Order Medicine"} />
            <div className="content-area">
                <div className="card my-3">
                    <div className="card-body">
                        <h6>Filter</h6>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-4 my-2">
                                    <select
                                        name="storeId"
                                        value={input.storeId}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">----Select Store----</option>
                                        {store?.map((record, i) => (
                                            <option value={record?._id} key={i}>
                                                {record?.storeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-4 my-2">
                                    <div className="input-group mb-2">
                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={input.fromDate}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="From Date"
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-2 my-2">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Order List</span>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-responsive table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-2">Store Name</th>
                                        <th className="col-5">Order ID</th>
                                        <th scope="col">Order Amount</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((order, index) => (
                                            <StoreOrderTable
                                                key={index}
                                                sn={index}
                                                record={order}
                                            />
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
                            page={pagination?.currentPage}
                            pages={pagination?.totalPages}
                            changePage={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

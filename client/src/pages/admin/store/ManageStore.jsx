import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import StoreTable from "../../../components/admin/StoreTable";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function ManageStore() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchStore = async () => {
        const req = apiEnd.getStore(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionStoreOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message);
            fetchStore(); // Ensure fetchStore is defined
        } else {
            toast.error(res?.message || "Failed to delete Store");
        }
    };

    useEffect(() => {
        fetchStore();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result?.storeName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-store" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-3">Store Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Store Phone</th>
                                        <th scope="col">Person Email</th>
                                        <th scope="col">CreatedBy</th>
                                        <th scope="col">UpdatedBy</th>
                                        <th scope="col">CreatedAt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        filteredData?.map((line, index) => (
                                            <StoreTable
                                                key={index}
                                                record={line}
                                                sn={index}
                                                changeStatus={changeStatus}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="p-4 text-center">
                                                No Data Found!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            totalResult={pagination.totalResult}
                            pages={pagination.totalPages}
                            page={pagination.currentPage}
                            changePage={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

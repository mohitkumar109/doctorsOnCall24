import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import Spinner from "../../../components/Spinner";
import GenericTable from "../../../components/admin/GenericTable";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function ManageGeneric() {
    const { loading, error, postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchGeneric = async () => {
        const req = apiEnd.getGeneric(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionGenericOne(id, status);
        const res = await postData(req, {});

        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchGeneric(); // Ensure fetchGeneric is defined
        } else {
            toast.error(res?.message || "Failed to delete generic", { duration: 1000 });
        }
    };

    useEffect(() => {
        fetchGeneric();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result.genericName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Generic"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Generic List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <GenericTable
                            filteredData={filteredData}
                            pagination={pagination}
                            changeStatus={changeStatus}
                            setPage={setPage}
                            page={page}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

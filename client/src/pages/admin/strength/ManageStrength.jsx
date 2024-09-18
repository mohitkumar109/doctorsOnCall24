import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import StrengthTable from "../../../components/admin/StrengthTable";

export default function ManageStrength() {
    const { postData } = useService();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchStrength = async () => {
        const req = apiEnd.getStrength(search, sorting, status, page);
        const res = await postData(req);
        setData(res?.data?.results);
        setPagination(res?.data?.pagination);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionStrengthOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchStrength(); // Ensure fetchStrength is defined
        } else {
            toast.error(res?.message || "Failed to delete strength", { duration: 1000 });
        }
    };

    useEffect(() => {
        fetchStrength();
    }, [search, sorting, status, page]);

    const filteredData = data.filter(
        (result) => result?.strengthName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Strength"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Strength List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-strength" />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-6">Strength Name</th>
                                        <th scope="col">CreatedBy</th>
                                        <th scope="col">UpdatedBy</th>
                                        <th scope="col">CreatedAt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        filteredData?.map((strength, index) => (
                                            <StrengthTable
                                                key={index}
                                                record={strength}
                                                sn={index}
                                                changeStatus={changeStatus}
                                            />
                                        ))
                                    ) : (
                                        <>
                                            <tr>
                                                <td colSpan="12" className="p-4 text-center">
                                                    No Data Found!
                                                </td>
                                            </tr>
                                        </>
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

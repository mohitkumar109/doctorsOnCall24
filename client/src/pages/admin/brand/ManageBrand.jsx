import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import BrandTable from "../../../components/admin/BrandTable";
import BrandApi from "../../../services/BrandApi";
import Spinner from "../../../components/Spinner";

export default function ManageBrand() {
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiInstance = useMemo(() => new BrandApi(), []);

    const fetchAPI = async () => {
        try {
            const res = await apiInstance.getBrandAPI(search, sorting, status, page);
            setData(res?.data?.results);
            setPagination(res?.data?.pagination);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (id, status) => {
        const res = await apiInstance.actionBrandOneAPI(id, status);
        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchAPI(); // Ensure fetchBrand is defined
        } else {
            toast.error(res?.message || "Failed to delete brand", { duration: 1000 });
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [apiInstance, search, sorting, status, page]);

    const filteredData = data?.filter(
        (result) => result?.brandName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Brand"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Brand List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-brand" level={"Add Brand"} />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-6">Brand</th>
                                        <th scope="col">CreatedBy</th>
                                        <th scope="col">UpdatedBy</th>
                                        <th scope="col">CreatedAt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        filteredData.map((brand, index) => (
                                            <BrandTable
                                                key={index}
                                                sn={index}
                                                record={brand}
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

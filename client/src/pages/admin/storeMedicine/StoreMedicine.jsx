import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import Filter from "../../../components/Filter";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import { indianDateFormat } from "../../../utils/helper";

export default function StoreMedicine() {
    const { postData } = useService();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState("");

    // Fetch data based on filters and pagination
    const fetchMedicine = async function () {
        try {
            const req = apiEnd.getStoreMedicine(id, page);
            const res = await postData(req);
            setData(res?.data?.results || []);
            setPagination(res?.data?.pagination || {});
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    useEffect(() => {
        fetchMedicine();
    }, [id, page]);

    // Helper to render medicine rows
    const renderMedicineRows = function () {
        return data?.map((line, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{line?.medicine}</td>
                <td>{line?.generic}</td>
                <td>{line?.category}</td>
                <td>{line?.brand}</td>
                <td>
                    {line?.strength} {line?.unitType}
                </td>
                <td>{line?.usage}</td>
                <td>{indianDateFormat(line?.expireDate)}</td>
                <td>{line?.quantity}</td>
                <td>{line?.price}</td>
            </tr>
        ));
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Store Medicine"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Store Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <AddButton buttonLink="/select-store-medicine/" level={"Back"} />
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col"> S.N</th>
                                        <th className="col-3">Medicine</th>
                                        <th scope="col">Generic</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Strength</th>
                                        <th scope="col">Usage</th>
                                        <th scope="col">Expire Date</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        renderMedicineRows()
                                    ) : (
                                        <tr>
                                            <td colSpan="11" className="p-4 text-center">
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

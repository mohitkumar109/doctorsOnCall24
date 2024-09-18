import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import MedicineTable from "../../../components/admin/MedicineTable";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";

export default function ManageMedicine() {
    const { postData } = useService();
    const [generic, setGeneric] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [input, setInput] = useState({
        search: "",
        sorting: "",
        status: "",
        categoryId: "",
        genericId: "",
        brandId: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fetchMedicine = async () => {
        try {
            const req = apiEnd.getMedicine(
                input.search,
                input.sorting,
                input.status,
                page,
                input.categoryId,
                input.genericId,
                input.brandId
            );
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

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionMedicineOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message);
            fetchMedicine(); // Ensure fetchMedicine is defined
        } else {
            toast.error(res?.message || "Failed to delete medicine");
        }
    };

    useEffect(() => {
        const fetchCategory = async () => {
            const req = apiEnd.getCategorySelect();
            const res = await postData(req);
            setCategory(res?.data?.data);
        };

        const fetchGeneric = async () => {
            const req = apiEnd.getGenericSelect();
            const res = await postData(req);
            setGeneric(res?.data?.data);
        };

        const fetchBrand = async () => {
            const req = apiEnd.getBrandSelect();
            const res = await postData(req);
            setBrand(res?.data?.data);
        };
        fetchMedicine();
        fetchBrand();
        fetchCategory();
        fetchGeneric();
    }, [
        input.search,
        input.sorting,
        input.status,
        page,
        input.categoryId,
        input.genericId,
        input.brandId,
        postData,
    ]);

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
                                    name="sorting"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value>--Sorting--</option>
                                    <option value={2}>A-Z</option>
                                    <option value={1}>Z-A</option>
                                </select>
                            </div>
                            <div className="col-sm-4 my-2">
                                <select
                                    name="status"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value="">--Select--</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="col-sm-4 my-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name="search"
                                        onChange={changeEventHandler}
                                        className="form-control form-control-sm"
                                        placeholder="Search here...."
                                    />
                                    <span className="input-group-text bg-info">Search</span>
                                </div>
                            </div>
                            <div className="col-sm-4 my-2">
                                <select
                                    name="categoryId"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value="">--Select Category--</option>
                                    {category?.map((record, i) => (
                                        <option value={record?._id} key={i}>
                                            {record?.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4 my-2">
                                <select
                                    name="genericId"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value="">--Select Generic--</option>
                                    {generic?.map((record, i) => (
                                        <option value={record?._id} key={i}>
                                            {record?.genericName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4 my-2">
                                <select
                                    name="brandId"
                                    className="form-select"
                                    onChange={changeEventHandler}
                                >
                                    <option value="">--Select Brand--</option>
                                    {brand?.map((record, i) => (
                                        <option value={record?._id} key={i}>
                                            {record?.brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-medicine" />
                        <div className="table-responsive">
                            <table className="table table-striped table-responsive table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th className="col-3">Medicine</th>
                                        <th scope="col">Generic</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Strength</th>
                                        <th scope="col">Usage</th>
                                        <th scope="col">Expire Date</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">CreatedAt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data?.map((line, index) => (
                                            <MedicineTable
                                                key={index}
                                                record={line}
                                                sn={index}
                                                changeStatus={changeStatus}
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

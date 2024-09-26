import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import AddButton from "../../../components/AddButton";
import Filter from "../../../components/Filter";
import useService from "../../../hooks/useService";
import { apiEnd } from "../../../services/adminApi";
import { indianDateFormat } from "../../../utils/helper";

export default function AddToStore() {
    //const { cart, addToCart } = useGlobalContext();
    const { postData } = useService();
    const { id } = useParams();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [qty, setQty] = useState({});
    const [errors, setErrors] = useState({}); // Track quantity errors
    const [count, setCount] = useState([]);
    const [cartUpdated, setCartUpdated] = useState(false); // Track cart updates

    // Fetch data based on filters and pagination
    const fetchMedicine = async () => {
        try {
            const req = apiEnd.getMedicineAll(search, sorting, status, page);
            const res = await postData(req);
            setData(res?.data?.results || []);
            setPagination(res?.data?.pagination || {});
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    useEffect(() => {
        fetchMedicine();
        fetchStoreCart();
    }, [search, sorting, status, page, cartUpdated]);

    const fetchStoreCart = async () => {
        const req = apiEnd.getStoreCart(id);
        const res = await postData(req);
        //console.log("Cart response:----", res.data);
        if (res?.data) {
            setCount(res.data); // Assuming the items array is inside res.data
        }
    };
    const totalCartItems = count.reduce((acc, item) => acc + item.totalItems, 0) || 0;

    // Handle input change with validation
    const handleInputChange = (medicineId, value, stock) => {
        const parsedValue = parseInt(value, 10);
        let error = "";

        if (isNaN(parsedValue) || parsedValue <= 0) {
            error = "Invalid quantity";
        } else if (parsedValue > stock) {
            error = "Quantity exceeds available stock";
        }

        setQty((prevQty) => ({ ...prevQty, [medicineId]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [medicineId]: error }));
    };

    const addToCart = async (medicineId, quantity) => {
        try {
            const req = apiEnd.adToStoreCart({
                storeId: id,
                medicineId,
                quantity: parseInt(quantity, 10),
            });
            const res = await postData(req);
            if (res?.success) {
                toast.success(res?.message);
                setCartUpdated((prev) => !prev); // Toggle to trigger the effect
                //window.location = "/select-store";
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message);
        }
    };

    // Helper to render medicine rows
    const renderMedicineRows = () => {
        return data?.map((line, index) => (
            <tr key={line._id}>
                <td>{index + 1}</td>
                <td>{line?.name}</td>
                <td>{line?.generic?.genericName}</td>
                <td>{line?.category?.categoryName}</td>
                <td>{line?.brand?.brandName}</td>
                <td>{line?.strength?.strengthName}</td>
                <td>{indianDateFormat(line?.expireDate)}</td>
                <td>{line?.stock}</td>
                <td>{line?.price}</td>
                <td>
                    <input
                        type="text"
                        name="qty"
                        value={qty[line._id] || ""}
                        onChange={(e) => handleInputChange(line._id, e.target.value, line.stock)}
                        className="form-control"
                        placeholder="Enter quantity"
                    />
                    {errors[line._id] && <small className="text-danger">{errors[line._id]}</small>}
                </td>

                <td>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(line._id, qty[line._id], line.price)}
                        disabled={!!errors[line._id] || !qty[line._id]} // Disable if there's an error or no quantity
                    >
                        Add to Cart
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Medicine"} />
            <div className="content-area">
                <Filter setSearch={setSearch} setSorting={setSorting} setStatus={setStatus} />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Medicine List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <Link to={`/store-cart/${id}`} className="btn btn-success">
                                Cart
                                <span className="badge text-bg-danger">
                                    {totalCartItems ? totalCartItems : 0}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/select-store" />
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
                                        <th scope="col">Expire Date</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Price</th>
                                        <th className="col-1">Quantity to Add</th>
                                        <th className="col-1">Actions</th>
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

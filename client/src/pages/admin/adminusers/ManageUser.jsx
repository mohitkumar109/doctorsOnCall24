import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { apiEnd } from "../../../services/adminApi";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import useServices from "../../../hooks/useService";
import UserTable from "../../../components/admin/UserTable";
import AddButton from "../../../components/AddButton";

export default function ManageUser() {
    const { postData } = useServices();
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const req = apiEnd.userFetch();
        const res = await postData(req);
        setData(res?.data);
    };

    const changeStatus = async (id, status) => {
        const req = apiEnd.actionUserOne(id, status);
        const res = await postData(req, {});
        if (res?.success) {
            toast.success(res.message, { duration: 1000 });
            fetchUser(); // Ensure fetchUser is defined
        } else {
            toast.error(res?.message || "Failed to delete User", { duration: 1000 });
        }
    };

    const filteredData = data?.filter(
        (result) => result?.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"All User"} />
            <div className="content-area">
                <div className="card my-3">
                    <div className="card-body">
                        <h6>Filter</h6>
                        <div className="row">
                            <div className="col-sm-6 my-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="form-control form-control-sm"
                                        placeholder="Search here...."
                                    />
                                    <span className="input-group-text bg-info">Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">User List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-user" level={"Add User"} />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">SN</th>
                                        <th className="col-3">Full Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Selected Store</th>
                                        <th scope="col">Role Type</th>
                                        <th scope="col">CreatedBy</th>
                                        <th scope="col">UpdatedBy</th>
                                        <th scope="col">CreatedAt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.length > 0 ? (
                                        filteredData?.map((user, index) => (
                                            <UserTable
                                                key={index}
                                                sn={index}
                                                record={user}
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
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}

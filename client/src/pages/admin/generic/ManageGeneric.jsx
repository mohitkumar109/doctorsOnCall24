import React, { useEffect } from "react";
import FilterTop from "../../../components/FilterTop";
import AddButton from "../../../components/AddButton";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import Spinner from "../../../components/Spinner";
import GenericTable from "../../../components/admin/GenericTable";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setPagination, setRecords } from "../../../redux/features/generic/genericSlice";
import { useGetAllGenericQuery } from "../../../redux/api/generic";

export default function ManageGeneric() {
    const dispatch = useDispatch();
    const { search, sorting, status, page, pagination, records } = useSelector(
        (state) => state.generic
    );

    const queryParams = new URLSearchParams({
        search,
        sorting,
        status,
        page,
    }).toString();

    const { data, isLoading, error } = useGetAllGenericQuery(queryParams);

    useEffect(() => {
        if (data) {
            dispatch(setRecords(data?.results || []));
            dispatch(setPagination(data?.pagination));
        }
    }, [data, dispatch]);

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error loading records.</p>;
    }

    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Generic"} />
            <div className="content-area">
                <FilterTop />
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Generic List</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-success btn-sm waves-effect">Table</button>
                            <button className="btn btn-primary btn-sm waves-effect">Card</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <AddButton buttonLink="/add-generic" level={"Add Generic"} />
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th className="col-6">Generic Name</th>
                                        <th className="col-2">CreatedBy</th>
                                        <th className="col-2">UpdatedBy</th>
                                        <th className="col-2">CreatedAt</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records?.length > 0 ? (
                                        records?.map((generic, index) => (
                                            <GenericTable sn={index} key={index} record={generic} />
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
                            <Pagination
                                totalResult={pagination.totalResult}
                                pages={pagination.totalPages}
                                page={pagination.currentPage}
                                changePage={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

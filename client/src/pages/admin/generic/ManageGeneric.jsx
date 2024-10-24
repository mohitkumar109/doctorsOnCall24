import React, { useEffect } from "react";
import { BsSortAlphaDown, BsSortAlphaUpAlt, BsArrowUp, BsArrowDown } from "react-icons/bs";
import FilterTop from "../../../components/FilterTop";
import AddButton from "../../../components/AddButton";
import Pagination from "../../../components/Pagination";
import Breadcrumb from "../../../components/Breadcrumb";
import Spinner from "../../../components/Spinner";
import GenericTable from "../../../components/admin/GenericTable";
import { useDispatch, useSelector } from "react-redux";
import {
    setPage,
    setPagination,
    setRecords,
    setSorting,
    setStatus,
} from "../../../redux/features/generic/genericSlice";
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

    const { data, isLoading } = useGetAllGenericQuery(queryParams);

    useEffect(() => {
        if (data) {
            dispatch(setRecords(data?.results || []));
            dispatch(setPagination(data?.pagination));
        }
    }, [data, dispatch]);

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    function handleSort(sortKey) {
        dispatch(setSorting(sortKey)); // Update sorting criteria
    }

    function handleStatus(statusKey) {
        dispatch(setStatus(statusKey));
    }

    if (isLoading) {
        return <Spinner />;
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
                                        <th className="col-6">
                                            Generic Name
                                            <BsSortAlphaDown
                                                onClick={() => handleSort("4")}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <BsSortAlphaUpAlt
                                                onClick={() => handleSort("3")}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </th>
                                        <th className="col-2">CreatedBy</th>
                                        <th className="col-2">UpdatedBy</th>
                                        <th className="col-2">
                                            CreatedAt
                                            <BsArrowDown
                                                onClick={() => handleSort("2")}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <BsArrowUp
                                                onClick={() => handleSort("1")}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </th>
                                        <th className="col-1">
                                            Status
                                            <BsArrowDown
                                                onClick={() => handleStatus("active")}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <BsArrowUp
                                                onClick={() => handleStatus("inactive")}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </th>
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

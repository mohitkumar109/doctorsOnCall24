import React from "react";

const MedicineFilter = ({ setSearch, setSorting, setStatus }) => {
    return (
        <div className="card my-3">
            <div className="card-body">
                <h6>Filter</h6>
                <div className="row">
                    <div className="col-sm-4 my-2">
                        <select
                            name="sorting"
                            className="form-select"
                            onChange={(e) => setSorting(e.target.value)}
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
                            onChange={(e) => setStatus(e.target.value)}
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
    );
};

export default MedicineFilter;

import { useSelector, useDispatch } from "react-redux";
import { setSearch, setSorting, setStatus } from "../redux/features/generic/genericSlice";

const FilterTop = () => {
    const dispatch = useDispatch();
    const { search, sorting, status } = useSelector((state) => state.generic);
    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };
    const handleSortingChange = (e) => {
        dispatch(setSorting(e.target.value));
    };

    const handleStatusChange = (e) => {
        dispatch(setStatus(e.target.value));
    };

    return (
        <div className="card my-3">
            <div className="card-body">
                <h6>Filter</h6>
                <div className="row">
                    <div className="col-sm-4 my-2">
                        <select
                            name="sorting"
                            value={sorting}
                            onChange={handleSortingChange}
                            className="form-select"
                        >
                            <option value>--Sorting--</option>
                            <option value={2}>A-Z</option>
                            <option value={1}>Z-A</option>
                        </select>
                    </div>
                    <div className="col-sm-4 my-2">
                        <select
                            name="status"
                            value={status}
                            className="form-select"
                            onChange={handleStatusChange}
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
                                value={search}
                                onChange={handleSearchChange}
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

export default FilterTop;

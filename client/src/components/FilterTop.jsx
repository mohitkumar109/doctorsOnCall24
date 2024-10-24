import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/features/generic/genericSlice";

const FilterTop = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.generic);
    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <div className="card my-3">
            <div className="card-body">
                <h6>Search Filter</h6>
                <div className="row">
                    <div className="col-sm-12 my-2">
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

import { NavLink } from "react-router-dom";

const AddButton = ({ buttonLink }) => {
    return (
        <div className="btn-group mb-3">
            <NavLink to={buttonLink} className="btn btn-primary btn-sm waves-effect">
                Add
            </NavLink>
        </div>
    );
};

export default AddButton;

import React from "react";
import { NavLink } from "react-router-dom";

const GroupButton = ({ buttonLink }) => {
    return (
        <div className="btn-group mb-3">
            <NavLink to={buttonLink} className="btn btn-primary btn-sm waves-effect">
                Add
            </NavLink>
            <button className="btn btn-success btn-sm waves-effect">Active</button>
            <button className="btn btn-info btn-sm waves-effect">Inactive</button>
            <button className="btn btn-danger btn-sm waves-effect">Delete</button>
        </div>
    );
};

export default GroupButton;

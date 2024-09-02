import React from "react";

const InputSelect = ({ label, name, value, onChange }) => {
    return (
        <div className="col-sm-5">
            <label htmlFor="generic" className="col-form-label">
                {label}
            </label>
            <select name={name} value={value} onChange={onChange} className="form-select">
                <option value="">----Select Generic----</option>
                <option value="a">A</option>
                <option value="b">B</option>
            </select>
        </div>
    );
};

export default InputSelect;

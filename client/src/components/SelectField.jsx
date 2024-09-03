import React from "react";

// Reusable Select component
const SelectField = ({ label, name, value, options, onChange, valueKey, labelKey }) => {
    return (
        <div className="col-sm-5">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select name={name} value={value} onChange={onChange} id={name} className="form-select">
                <option value="">----Select {label}----</option>
                {options?.map((option, i) => (
                    <option value={option[valueKey]} key={i}>
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;

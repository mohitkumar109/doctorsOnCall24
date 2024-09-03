import React from "react";

const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => {
    return (
        <div className="col-sm-5">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;

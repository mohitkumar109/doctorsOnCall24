import React, { useState } from "react";

// Custom hook for handling form state and changes
const useFormState = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return [formData, handleChange, setFormData];
};

export default useFormState;

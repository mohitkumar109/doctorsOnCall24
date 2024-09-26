import React from "react";

const TableHead = ({ headers }) => {
    return (
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} scope="col">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;

import React from "react";
import { Link } from "react-router-dom";
import { BsSortAlphaUpAlt, BsSortAlphaDown } from "react-icons/bs";
import { useTable, useSortBy, usePagination } from "react-table";

function TableHOC(columns, data, containerClassname, showPagination = false) {
    const options = {
        columns,
        data,
        initialState: {
            pageSize: 10,
        },
    };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        pageCount,
        state: { pageIndex },
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable(options, useSortBy, usePagination);
    return function HOC() {
        return (
            <div className={containerClassname}>
                <table
                    className="table table-striped table-bordered table-hover"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroups) => (
                            <tr key={headerGroups.id} {...headerGroups.getHeaderGroupProps()}>
                                {headerGroups.headers.map((column) => (
                                    <th
                                        key={column.id}
                                        scope="col"
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render("Header")}
                                        {column.isSorted && (
                                            <span>
                                                {" "}
                                                {column.isSortedDesc ? (
                                                    <BsSortAlphaUpAlt />
                                                ) : (
                                                    <BsSortAlphaDown />
                                                )}
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {showPagination && (
                    <ul className="pagination my-4 overflow-auto pagination-sm justify-content-end">
                        <li className="page-item">
                            <Link
                                className={`page-link ${
                                    !canPreviousPage === false ? "active" : "disabled"
                                }`}
                                onClick={previousPage}
                            >
                                Previous
                            </Link>
                        </li>
                        <li className="page-item">
                            <a className="page-link">{`${pageIndex + 1} of ${pageCount}`}</a>
                        </li>
                        <li className="page-item">
                            <Link
                                className={`page-link ${
                                    !canNextPage === false ? "active" : "disabled"
                                }`}
                                onClick={nextPage}
                            >
                                Next
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        );
    };
}

export default TableHOC;

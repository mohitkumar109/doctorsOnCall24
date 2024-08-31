import "./Pagination.css";

const Pagination = ({ totalResult, page, pages, changePage }) => {
    let middlePagination;
    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((_, index) => (
            <li className="page-item" key={index}>
                <button
                    className="page-link"
                    key={index + 1}
                    onClick={() => changePage(index + 1)}
                    disabled={page === index + 1}
                >
                    {index + 1}
                </button>
            </li>
        ));
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5;
        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <button
                        key={startValue + idx + 1}
                        disabled={page === startValue + idx + 1}
                        onClick={() => changePage(startValue + idx + 1)}
                    >
                        {startValue + idx + 1}
                    </button>
                ))}

                <button>...</button>
                <button onClick={() => changePage(pages)}>{pages}</button>
            </>
        );
    }
    return (
        totalResult > 1 && (
            <ul className="pagination my-4 overflow-auto pagination-sm justify-content-end">
                <li className="page-item">
                    <button
                        className="page-link"
                        disabled={page === 1}
                        onClick={() => changePage((page) => page - 1)}
                    >
                        Previous
                    </button>
                </li>

                {middlePagination}

                <li className="page-item">
                    <button
                        className="page-link"
                        disabled={page === pages}
                        onClick={() => changePage((page) => page + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        )
    );
};

export default Pagination;

import "./Pagination.css";
import classNames from "classnames";
import React from "react";

const range = (start: number, end: number) => {
    return [...Array(end - start).keys()].map((el) => el + start);
};

const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }: { pagesCount: number, pagesCutCount: number, currentPage: number }) => {
    const ceiling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);

    if (pagesCount < pagesCutCount) {
        return { start: 1, end: pagesCount + 1 };
    } else if (currentPage <= ceiling) {
        return { start: 1, end: pagesCutCount + 1 };
    } else if (currentPage + ceiling >= pagesCount) {
        return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
    } else {
        return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
    }
};

const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }: { page: number | string, currentPage: number, onPageChange: (page: number) => void, isDisabled: boolean }) => {
    const liClasses = classNames({
        "page-item": true,
        active: page === currentPage,
        disabled: isDisabled,
    });
    return (
        <li className={liClasses} onClick={() => onPageChange(page as number)}>
            <span className="page-link">{page}</span>
        </li>
    );
};

const Pagination = ({ currentPage, total, onPageChange }: { currentPage: number, total: number, onPageChange: (page: number) => void }) => {
    const pagesCount = total;
    const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
    const pages = range(pagesCut.start, pagesCut.end);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pagesCount;
    return (
        <ul className="pagination">
            <PaginationItem
                page="First"
                currentPage={currentPage}
                onPageChange={() => onPageChange(1)}
                isDisabled={isFirstPage}
            />
            <PaginationItem
                page="Prev"
                currentPage={currentPage}
                onPageChange={() => onPageChange(currentPage - 1)}
                isDisabled={isFirstPage}
            />
            {pages.map((page) => (
                <PaginationItem
                    page={page}
                    key={page}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    isDisabled={false}
                />
            ))}
            <PaginationItem
                page="Next"
                currentPage={currentPage}
                onPageChange={() => onPageChange(currentPage + 1)}
                isDisabled={isLastPage}
            />
            <PaginationItem
                page="Last"
                currentPage={currentPage}
                onPageChange={() => onPageChange(total)}
                isDisabled={isLastPage}
            />
        </ul>
    );
};

export default Pagination;

import Table from 'react-bootstrap/Table';
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../constants";
import { PortfoliosCountStocks } from "../models/PortfoliosCountStocks";
import {CircularProgress, Container} from "@mui/material";
import Pagination from './pagination/Pagination';
import authHeader from "../services/auth-header";

export const StocksPortfoliosCount = () => {
    const [loading, setLoading] = useState(false);
    const [stocks, setStocks] = useState<PortfoliosCountStocks[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/count_portfolios_stocks/page/${currentPage}`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                setStocks(data.raport);
                setTotalInstances(data.total)
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All stocks and their portfolios count</h1>
            {loading && <CircularProgress />}
            {!loading && stocks.length === 0 && <p>No stocks found</p>}
            {!loading && stocks.length > 0 && (
                <div>
                <Table striped bordered hover responsive>
                    <thead>
                            <tr>
                                <th>Stock Ticker</th>
                                <th>Portfolios Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock) => (
                                <tr key={stock.stock_id}>
                                    <td>
                                        {stock.stock_ticker}
                                    </td>
                                    <td>{stock.portfolio_count}</td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    total={totalInstances}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                </div>
            )}
        </Container>
    );
};

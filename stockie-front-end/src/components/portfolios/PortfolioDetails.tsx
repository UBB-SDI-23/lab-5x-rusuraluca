import {Container, CardContent} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {Button, Table} from "react-bootstrap";
import {Stock} from "../../models/Stock";
import {Portfolio} from "../../models/Portfolio";
import authHeader from "../../services/auth-header";


export const PortfolioDetails = () => {
    const {portfolioId} = useParams();
    const [portfolio, setPortfolio] = useState<Portfolio>();
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/portfolios/${portfolioId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setPortfolio(data);
                setStocks(data.stocks);
            });
    }, []);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>About the portfolio:</h1>
            <CardContent>
                <p><b>Portfolio Name:</b> {portfolio?.name}</p>
                <p><b>Added by: </b><a href={`/users/${portfolio?.user?.id}/details`}>{portfolio?.user?.username}</a></p>
                <p><b>Portfolio Industry:</b> {portfolio?.industry}</p>
                <p><b>Portfolio Public:</b> {portfolio?.public ? "Yes" : "No"}</p>
                <p><b>Portfolio Active:</b> {portfolio?.active ? "Yes" : "No"}</p>
                <p><b>Portfolio Stocks:</b> {stocks?.length} </p>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Current Price</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stocks?.map((stock) => (
                        <tr key={stock?.id}>
                            <td align="left">{stock?.ticker}</td>
                            <td align="left">{stock?.current_price}</td>
                            <td align="left">{stock?.min_price}</td>
                            <td align="left">{stock?.max_price}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Button style={{margin: "10px 10px 0 0px"}} variant="dark" href={`/portfolios`}>
                    <ArrowBackIcon style={{color: "white"}}/>
                    Go Back
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" href={`/portfolios/${portfolioId}/edit`}>
                    <EditIcon style={{color: "white"}}/>
                    Edit portfolio details
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" href={`/portfolios/${portfolioId}/delete`}>
                    <DeleteForeverIcon style={{color: "white"}}/>
                    Delete portfolio
                </Button>
            </CardContent>
        </Container>
    );
};

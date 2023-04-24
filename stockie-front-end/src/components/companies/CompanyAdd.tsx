import {Container, CardContent, TextField, Typography, Box} from "@mui/material";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import {Company, CompanyError, TouchedFields} from "../../models/Company";

export const CompanyAdd = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState<Company>({
        name: "",
        size: 0,
        country: "",
        industry: "",
    });

    const [companyError, setCompanyError] = useState<CompanyError>({
        generic: "",
        name: "",
        country: "",
    });

    const [touchedFields, setTouchedFields] = useState<TouchedFields>({
        name: false,
        size: false,
        country: false,
        industry: false,
    });

    const validateCompanyData = () => {
        setCompanyError((prevError) => ({
            ...prevError,
            name: "",
            country: "",
        }));

        if (company.name === "") {
            setCompanyError((prevError) => ({
                ...prevError,
                name: "Name is required",
            }));
        }
        if (company.country === "") {
            setCompanyError((prevError) => ({
                ...prevError,
                country: "Country is required",
            }));
        };
    }

    useEffect(() => {
        validateCompanyData();
    }, [company]);

    const addCompany = async () => {
        setTouchedFields((prevTouched) => ({
            ...prevTouched,
            name: true,
            size: true,
            country: true,
            industry: true,
        }));

        validateCompanyData();

        if (companyError.name !== "" || companyError.country !== "" ) return;

        const addedCompany = {
            name: company.name,
            size: Number(company.size),
            country: company.country,
            industry: company.industry,
        };

        try {
            const response = await axios.post(`${BACKEND_API_URL}/companies/`, addedCompany);
            if (response.status === 200) {
                navigate("/companies");
                return;
            }
            setCompanyError((prevError) => ({
                ...prevError,
                generic: "Something went wrong! Make sure you filled all the fields correctly.",
            }));
        } catch (error: any) {
            if (error.response.data) {
                if (error.response.data.name) {
                    setCompanyError((prevError) => ({
                        ...prevError,
                        name: error.response.data.name,
                    }));
                    setCompany((prevCompany) => ({...prevCompany, name: ""}));
                }
                if (error.response.data.country) {
                    setCompanyError((prevError) => ({
                        ...prevError,
                        country: error.response.data.country,
                    }));
                    setCompany((prevCompany) => ({...prevCompany, country: ""}));
                }
            } else {
                setCompanyError((prevError) => ({
                    ...prevError,
                    generic: "Something went wrong! Make sure you filled all the fields correctly.",
                }));
            }
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/companies");
    };


    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Add a new company:</h1>
            {companyError.generic && (
                <Typography variant="body2" sx={{ color: "#e64545", mb: 4}}>
                    {companyError.generic}
                </Typography>
            )}
            <Box>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) => setCompany((prevCompany) => ({ ...prevCompany, name: event.target.value }))}
                        error={!!companyError.name && !!touchedFields.name}
                        helperText={companyError.name}
                        onBlur={(event) =>
                            setTouchedFields((prevTouched) => ({
                                ...prevTouched,
                                name: true,
                            }))
                        }
                    />
                    <TextField
                        id="size"
                        label="Company Size"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) => setCompany((prevCompany) => ({ ...prevCompany, size: Number(event.target.value) }))}
                    />
                    <TextField
                        id="country"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) => setCompany((prevCompany) => ({ ...prevCompany, country: event.target.value }))}
                        error={!!companyError.country && !!touchedFields.country}
                        helperText={companyError.country}
                        onBlur={(event) =>
                            setTouchedFields((prevTouched) => ({
                                ...prevTouched,
                                country: true,
                            }))
                        }
                    />
                    <TextField
                        id="industry"
                        label="Industry"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) => setCompany((prevCompany) => ({ ...prevCompany, industry: event.target.value }))}
                    />
                    <Button style={{ margin:"24px 24px 0 0" }} variant="primary" onClick={() => addCompany()}>Add Company</Button>{' '}
                    <Button style={{ margin:"24px 24px 0 0" }} variant="danger"  onClick={handleCancel}>Cancel</Button>{' '}
            </Box>
        </Container>
    );
};

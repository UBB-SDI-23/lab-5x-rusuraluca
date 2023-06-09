import {CircularProgress, Container} from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {User} from "../../models/User";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";

export const UserShowAll = () => {
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [totalInstances, setTotalInstances] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/users/page/${currentPage}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.users);
                setTotalInstances(data.totalUsers);
                setCurrentPage(currentPage);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All users</h1>
            <div>
                <Button style={{margin: "24px 0"}} variant="primary" href={`/users/add`}>Add a new user</Button>
            </div>
            {loading && <CircularProgress/>}
            {!loading && users.length === 0 && <p>No users found</p>}
            {!loading && users.length > 0 && (
                <div>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Username</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td align="left">{user.username}</td>
                                <td align="left">
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="dark" href={`/users/${user.id}/details`}>
                                        <ReadMoreIcon style={{color: "white"}}/>
                                        View user details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="success" href={`/users/${user.id}/edit`}>
                                        <EditIcon style={{color: "white"}}/>
                                        Edit user details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="danger" href={`/users/${user.id}/delete`}>
                                        <DeleteForeverIcon style={{color: "white"}}/>
                                        Delete user
                                    </Button>
                                </td>
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

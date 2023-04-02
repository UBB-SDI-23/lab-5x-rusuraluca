import {Portfolio} from "./Portfolio";

export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address?: string;
    birthday?: string;
    portfolios?: Portfolio[];
}

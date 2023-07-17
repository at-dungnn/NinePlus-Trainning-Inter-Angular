export interface Employee {
    id?: number;
    name?: string;
    gender?: boolean;
    birthday?: Date;
    phone?: string;
    address?: string;
    email?: string;
    image?: string;
    workshiftId?: number;
}

export interface EmployeeTest {
    id?: number;
    name?: string;
    gender?: boolean;
    createdOn?: Date;
    lastModifiedOn?: Date;
    phoneNumber?: string;
    email?: string;
    workshiftId?: number;
}

export interface EmployeeUpdate {
    id?: number;
    name?: string;
    gender?: boolean;
    birthday?: Date;
    phoneNumber?: string;
    email?: string;
    address?: string;
    image?: string;
    workShiftId?: number;
}

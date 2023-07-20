export interface Employee {
    id?: number;
    name?: string;
    gender?: boolean;
    createdOn?: Date;
    lastModifiedOn?: Date;
    phoneNumber?: string;
    email?: string;
    workshiftId?: number;
}

export interface DataReponse {
    data: any;
    messages: [];
    succeeded: boolean;
}

export interface EmployeeCreateAndUpdate {
    name?: string;
    address?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    gender?: boolean;
    imageFile?: any;
    password?: string;
    username?: string;
    workShiftId?: number;
}

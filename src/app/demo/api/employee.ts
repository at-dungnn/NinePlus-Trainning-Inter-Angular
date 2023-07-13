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

export interface EmployeeCreate {
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

export interface EmployeeUpdate {
    id?: number;
    name?: string;
    address?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    gender?: boolean;
    imageFile?: any;
    workShiftId?: number;
}
export interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

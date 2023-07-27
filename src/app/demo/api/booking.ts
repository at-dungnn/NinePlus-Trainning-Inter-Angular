export interface Booking {
    id?: number;
    customerName?: string;
    phoneNumber?: string;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    status?: number;
    note?: string;
    services?: Service;
}


export interface Service {
    id?: number;
    name?: string;
    price: number;
}
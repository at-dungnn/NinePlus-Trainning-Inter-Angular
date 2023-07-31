export interface BookingDetail {
    id?: number;
    cutomerName?: string;
    phoneNumber?: string;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    status?: number;
    note?: string;
    services?: Services[];
}

export interface Services {
    id?: number;
    name?: string;
    price?: number;
    serviceTime?: number;
}
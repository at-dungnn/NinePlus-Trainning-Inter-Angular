export interface BookingDetail {
    customerId?: number;
    bookingId?: number;
    bookingDate?: string;
    formTime: string;
    toTime: string;
    status: number;
    serviceId?: number;
    serviceName?: string;
    price?: number;
}

import { Services } from "./booking-detail";

export interface BookingCreate{
    customerId?: number;
    bookingDate?: string;
    fromTime?: string;
    totime?: string;
    note?: string;
    servicesId?: number[];
}

export interface Service {
    id: number,
    name: string,
    time: number,
    price: number,
    description: number,
    image: string,
    createdOn: string,
    review: number,
}

export interface ServiceCreateAndEdit {
    id: number,
    name: string,
    serviceTime: number,
    price: number,
    description: number,
    servicesImageRequests: [{}];
}

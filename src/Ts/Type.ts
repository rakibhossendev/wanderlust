export interface CommonDataType {
    _id: string
    destinationName: string
    country: string
    category?: string
    price: string
    duration: string
    departureDate: string
    imageUrl: string
    description: string
}

export interface BookingDataType {
    _id: string
    username: string
    email: string
    destinationName: string
    country: string
    price: string
    duration: string
    departureDate: string
    imageUrl: string
    description: string
    category: string
    bookingDate: string
    status?: string
    destinationId?: string
}
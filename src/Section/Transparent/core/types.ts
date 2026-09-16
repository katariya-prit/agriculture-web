export type TransportListing = {
    id: string;
    providerName: string;
    vehicleType: string;
    capacityTon: number;
    area: string;
    contactNumber: string;
    ratePerKm: number;
    availability: "available" | "busy" | "offline";
    rating: number;
    imageUrl?: string;
};
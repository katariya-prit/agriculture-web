import { httpClient } from "./httpClient";

export const sellingAccountService = {
    create: (payload: {
        sellingAccountName: string;
        mobileNumber: string;
        shortAddress: string;
        aadhaarNumber: string;
    }) => httpClient.post("/api/selling-account", payload),

    get: <T = unknown>() => httpClient.get<T>("/api/selling-account"),

    updateBasicIdentity: (payload: {
        photoUrl?: string;
        dateOfBirth?: string;
        gender?: "Male" | "Female" | "Other";
    }) => httpClient.patch("/api/selling-account/basic-identity", payload),

    updateFarmAndLandDetails: (payload: {
        village?: string;
        taluka?: string;
        district?: string;
        state?: string;
        pincode?: string;
        surveyNumber?: string;
    }) => httpClient.patch("/api/selling-account/farm-details", payload),

    updateCropAndProductionInfo: (payload: {
        primaryCrops?: string[];
        cropSeason?: "Kharif" | "Rabi" | "Zaid";
        expectedYieldValue?: number;
        expectedYieldUnit?: string;
        farmingType?: "Organic" | "Conventional";
        soilType?: string;
    }) => httpClient.patch("/api/selling-account/crop-info", payload),
};  
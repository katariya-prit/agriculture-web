// services/profileAnalysisService.ts

export interface ChecklistEntry {
    key: string;
    label: string;
    desc: string;
    done: boolean;
}

export interface ProfileAnalysis {
    percent: number;
    checklist: ChecklistEntry[];
    missingFields: string[];
    tip: string | null;
}

interface AnalyzableUser {
    fullName?: string | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
}

interface AnalyzableSellingAccount {
    sellingAccountName?: string | null;
    mobileNumber?: string | null;
    mobileVerified?: boolean | null;
    shortAddress?: string | null;
    aadhaarNumber?: string | null;
    aadhaarVerified?: boolean | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    village?: string | null;
    taluka?: string | null;
    district?: string | null;
    primaryCrops?: string[] | null;
    cropSeason?: string | null;
    farmingType?: string | null;
    soilType?: string | null;
}

/**
 * Profile (user) + selling account na actual data ne analyze kari ne
 * completion percentage, checklist ane ek short "next step" tip return kare chhe.
 *
 * Backend na `profileCompletion` field par depend nathi karto — etle
 * backend serialization ma koi issue hoy to pan frontend potej barabar
 * result batavi shake.
 */
export function analyzeProfile(
    user: AnalyzableUser | null | undefined,
    account: AnalyzableSellingAccount | null | undefined
): ProfileAnalysis {
    const checklist: ChecklistEntry[] = [
        {
            key: "quickInfo",
            label: "Selling account basic info",
            desc: "Naam, mobile, address, aadhaar",
            done: Boolean(
                account?.sellingAccountName &&
                    account?.mobileNumber &&
                    account?.shortAddress &&
                    account?.aadhaarNumber
            ),
        },
        {
            key: "identity",
            label: "Basic identity",
            desc: "Janm tarikh ane gender",
            done: Boolean(account?.dateOfBirth && account?.gender),
        },
        {
            key: "farm",
            label: "Farm & land details",
            desc: "Village, taluka, district",
            done: Boolean(account?.village && account?.taluka && account?.district),
        },
        {
            key: "crop",
            label: "Crop & production info",
            desc: "Pak, season, farming type",
            done: Boolean(account?.primaryCrops && account.primaryCrops.length > 0),
        },
    ];

    const done = checklist.filter((c) => c.done).length;
    const percent = account ? Math.round((done / checklist.length) * 100) : 0;

    const missingFields: string[] = [];
    if (!user?.isEmailVerified) missingFields.push("Email verify karo");
    if (!account?.mobileVerified) missingFields.push("Mobile number verify karo");
    if (!account?.aadhaarVerified) missingFields.push("Aadhaar verify karo");
    checklist.forEach((c) => {
        if (!c.done) missingFields.push(c.label);
    });

    const firstIncomplete = checklist.find((c) => !c.done);
    const tip = !account
        ? "Selling account banavo — pak vechva mate pehla step chhe."
        : firstIncomplete
          ? `Have "${firstIncomplete.label}" bharo — profile ${percent}% thi vadhu complete thashe.`
          : "Profile pura chhe! Have pak list karva mate taiyar chho.";

    return { percent, checklist, missingFields, tip };
}
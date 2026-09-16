import { useEffect, useState } from "react";
import { X, Store, User, MapPinned, Sprout, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { sellingAccountService } from "../../services/sellingAccountService";
import { toast } from "sonner";

const theme = {
    forest: "#0B3D26",
    forestSoft: "#12532F",
    leaf: "#1E8F4E",
    leafSoft: "#EAF6EE",
    ink: "#0F2B1D",
    inkSoft: "#5B6E63",
    line: "#DCE8DF",
} as const;

type StepKey = "quickInfo" | "identity" | "farm" | "crop";

const steps: { key: StepKey; label: string; icon: typeof Store }[] = [
    { key: "quickInfo", label: "Quick Info", icon: Store },
    { key: "identity", label: "Identity", icon: User },
    { key: "farm", label: "Farm Details", icon: MapPinned },
    { key: "crop", label: "Crop Info", icon: Sprout },
];

interface Props {
    open?: boolean;
    onClose: () => void;
    onCreated: (sellingAccount: any) => void;
    initial?: Partial<FormState>;
}

interface FormState {
    sellingAccountName: string;
    mobileNumber: string;
    shortAddress: string;
    aadhaarNumber: string;
    dateOfBirth: string;
    gender: string;
    village: string;
    taluka: string;
    district: string;
    state: string;
    pincode: string;
    surveyNumber: string;
    primaryCrops: string[];
    cropSeason: string;
    expectedYieldValue: string;
    expectedYieldUnit: string;
    farmingType: string;
    soilType: string;
}

const emptyForm: FormState = {
    sellingAccountName: "",
    mobileNumber: "",
    shortAddress: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    gender: "",
    village: "",
    taluka: "",
    district: "",
    state: "Gujarat",
    pincode: "",
    surveyNumber: "",
    primaryCrops: [],
    cropSeason: "",
    expectedYieldValue: "",
    expectedYieldUnit: "Quintal",
    farmingType: "",
    soilType: "",
};

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium" style={{ color: theme.inkSoft }}>
                {label}
            </label>
            {children}
        </div>
    );
}

const inputClass =
    "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-green-500 transition-colors";

export default function SellingAccountModal({ open, onClose, onCreated, initial }: Props) {
    const { user } = useAuth();

    const [step, setStep] = useState(0);
    const [useProfileInfo, setUseProfileInfo] = useState(true);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [cropInput, setCropInput] = useState("");
    const [loading, setLoading] = useState(false);

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    useEffect(() => {
        if (!open) return;
        setStep(0);

        if (initial) {
            setForm((prev) => ({ ...prev, ...initial }));
            return;
        }

        if (useProfileInfo) {
            update("sellingAccountName", user?.fullName ?? "");
        } else {
            update("sellingAccountName", "");
        }
    }, [open, useProfileInfo, user, initial]);

    if (!open) return null;

    function addCrop() {
        const value = cropInput.trim();
        if (!value) return;
        if (!form.primaryCrops.includes(value)) {
            update("primaryCrops", [...form.primaryCrops, value]);
        }
        setCropInput("");
    }

    function removeCrop(crop: string) {
        update(
            "primaryCrops",
            form.primaryCrops.filter((c) => c !== crop)
        );
    }

    function validateStep(index: number): boolean {
        const key = steps[index].key;
        if (key === "quickInfo") {
            if (!form.sellingAccountName || !form.mobileNumber || !form.shortAddress || !form.aadhaarNumber) {
                toast.error("Badha fields bharo.");
                return false;
            }
        }
        if (key === "farm") {
            if (!form.village || !form.taluka || !form.district) {
                toast.error("Village, Taluka, District bharo.");
                return false;
            }
        }
        return true;
    }

    function goNext() {
        if (!validateStep(step)) return;
        setStep((s) => Math.min(s + 1, steps.length - 1));
    }

    function goBack() {
        setStep((s) => Math.max(s - 1, 0));
    }

    async function handleSubmit() {
        if (!validateStep(step)) return;

        setLoading(true);
        try {
            const created = await sellingAccountService.create({
                sellingAccountName: form.sellingAccountName,
                mobileNumber: form.mobileNumber,
                shortAddress: form.shortAddress,
                aadhaarNumber: form.aadhaarNumber,
            });

            await sellingAccountService.updateBasicIdentity({
                dateOfBirth: form.dateOfBirth || undefined,
                gender: (form.gender || undefined) as "Male" | "Female" | "Other" | undefined,
            });

            await sellingAccountService.updateFarmAndLandDetails({
                village: form.village,
                taluka: form.taluka,
                district: form.district,
                state: form.state,
                pincode: form.pincode || undefined,
                surveyNumber: form.surveyNumber || undefined,
            });

            const data = await sellingAccountService.updateCropAndProductionInfo({
                primaryCrops: form.primaryCrops,
                cropSeason: (form.cropSeason || undefined) as "Kharif" | "Rabi" | "Zaid" | undefined,
                expectedYieldValue: form.expectedYieldValue ? Number(form.expectedYieldValue) : undefined,
                expectedYieldUnit: form.expectedYieldUnit || undefined,
                farmingType: (form.farmingType || undefined) as "Organic" | "Conventional" | undefined,
                soilType: form.soilType || undefined,
            });

            toast.success("Selling account banai gayu!");
            onCreated((data as any)?.sellingAccount ?? data ?? created);
            onClose();
        } catch (err: any) {
            const message =
                err?.errors?.[0]?.message || err?.message || "Selling account banavva ma error aavi.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    const isLastStep = step === steps.length - 1;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 p-4">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
                <div
                    className="flex items-center justify-between border-b px-5 py-4"
                    style={{ borderColor: theme.line, background: `linear-gradient(120deg, ${theme.forest}, ${theme.forestSoft})` }}
                >
                    <div className="flex items-center gap-2.5">
                        <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "rgba(255,255,255,0.14)" }}>
                            <Store className="h-4.5 w-4.5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-white">Selling Account Banavo</h2>
                            <p className="text-xs text-white/70">Step {step + 1} of {steps.length}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex items-center justify-between gap-2 border-b px-5 py-3" style={{ borderColor: theme.line }}>
                    {steps.map((s, i) => {
                        const StepIcon = s.icon;
                        const isDone = i < step;
                        const isActive = i === step;
                        return (
                            <div key={s.key} className="flex flex-1 items-center gap-2">
                                <div
                                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors"
                                    style={{
                                        background: isDone || isActive ? theme.leaf : theme.leafSoft,
                                        color: isDone || isActive ? "white" : theme.inkSoft,
                                    }}
                                >
                                    {isDone ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                                </div>
                                <span
                                    className="hidden truncate text-xs font-medium sm:block"
                                    style={{ color: isActive ? theme.ink : theme.inkSoft }}
                                >
                                    {s.label}
                                </span>
                                {i < steps.length - 1 && (
                                    <div className="mx-1 h-px flex-1" style={{ background: isDone ? theme.leaf : theme.line }} />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {step === 0 && (
                        <div className="flex flex-col gap-4">
                            <label
                                className="flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm"
                                style={{ borderColor: theme.line, background: theme.leafSoft }}
                            >
                                <input
                                    type="checkbox"
                                    checked={useProfileInfo}
                                    onChange={(e) => setUseProfileInfo(e.target.checked)}
                                    className="h-4 w-4 accent-green-700"
                                />
                                <span style={{ color: theme.ink }}>
                                    Mari profile ni maahiti vaparo (naam auto-fill thashe)
                                </span>
                            </label>

                            <Field label="Selling Account Name">
                                <input
                                    type="text"
                                    value={form.sellingAccountName}
                                    onChange={(e) => update("sellingAccountName", e.target.value)}
                                    placeholder="Jem ke: Katariya Farms"
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>

                            <Field label="Mobile Number">
                                <input
                                    type="tel"
                                    value={form.mobileNumber}
                                    onChange={(e) => update("mobileNumber", e.target.value)}
                                    placeholder="9876543210"
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>

                            <Field label="Short Address">
                                <input
                                    type="text"
                                    value={form.shortAddress}
                                    onChange={(e) => update("shortAddress", e.target.value)}
                                    placeholder="Village, Taluka, District"
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>

                            <Field label="Aadhaar Number">
                                <input
                                    type="text"
                                    value={form.aadhaarNumber}
                                    onChange={(e) => update("aadhaarNumber", e.target.value)}
                                    placeholder="XXXX-XXXX-XXXX"
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="flex flex-col gap-4">
                            <Field label="Date of Birth">
                                <input
                                    type="date"
                                    value={form.dateOfBirth}
                                    onChange={(e) => update("dateOfBirth", e.target.value)}
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>

                            <Field label="Gender">
                                <select
                                    value={form.gender}
                                    onChange={(e) => update("gender", e.target.value)}
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                >
                                    <option value="">Select karo</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </Field>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Village">
                                    <input
                                        type="text"
                                        value={form.village}
                                        onChange={(e) => update("village", e.target.value)}
                                        placeholder="Sokhda"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="Taluka">
                                    <input
                                        type="text"
                                        value={form.taluka}
                                        onChange={(e) => update("taluka", e.target.value)}
                                        placeholder="Karjan"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="District">
                                    <input
                                        type="text"
                                        value={form.district}
                                        onChange={(e) => update("district", e.target.value)}
                                        placeholder="Vadodara"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="State">
                                    <input
                                        type="text"
                                        value={form.state}
                                        onChange={(e) => update("state", e.target.value)}
                                        placeholder="Gujarat"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="Pincode">
                                    <input
                                        type="text"
                                        value={form.pincode}
                                        onChange={(e) => update("pincode", e.target.value)}
                                        placeholder="391240"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="Survey Number">
                                    <input
                                        type="text"
                                        value={form.surveyNumber}
                                        onChange={(e) => update("surveyNumber", e.target.value)}
                                        placeholder="142/3"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-4">
                            <Field label="Primary Crops">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={cropInput}
                                        onChange={(e) => setCropInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addCrop();
                                            }
                                        }}
                                        placeholder="Jem ke: Cotton — Enter dabo add karva"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addCrop}
                                        className="shrink-0 rounded-xl px-4 text-sm font-medium text-white"
                                        style={{ background: theme.leaf }}
                                    >
                                        Add
                                    </button>
                                </div>
                                {form.primaryCrops.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {form.primaryCrops.map((crop) => (
                                            <span
                                                key={crop}
                                                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                                                style={{ background: theme.leafSoft, color: theme.forest }}
                                            >
                                                {crop}
                                                <button type="button" onClick={() => removeCrop(crop)}>
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Field>

                            <Field label="Crop Season">
                                <select
                                    value={form.cropSeason}
                                    onChange={(e) => update("cropSeason", e.target.value)}
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                >
                                    <option value="">Select karo</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Zaid">Zaid</option>
                                </select>
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Expected Yield">
                                    <input
                                        type="number"
                                        value={form.expectedYieldValue}
                                        onChange={(e) => update("expectedYieldValue", e.target.value)}
                                        placeholder="40"
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    />
                                </Field>
                                <Field label="Unit">
                                    <select
                                        value={form.expectedYieldUnit}
                                        onChange={(e) => update("expectedYieldUnit", e.target.value)}
                                        className={inputClass}
                                        style={{ borderColor: theme.line }}
                                    >
                                        <option value="Quintal">Quintal</option>
                                        <option value="Kg">Kg</option>
                                        <option value="Ton">Ton</option>
                                    </select>
                                </Field>
                            </div>

                            <Field label="Farming Type">
                                <select
                                    value={form.farmingType}
                                    onChange={(e) => update("farmingType", e.target.value)}
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                >
                                    <option value="">Select karo</option>
                                    <option value="Organic">Organic</option>
                                    <option value="Conventional">Conventional</option>
                                </select>
                            </Field>

                            <Field label="Soil Type">
                                <input
                                    type="text"
                                    value={form.soilType}
                                    onChange={(e) => update("soilType", e.target.value)}
                                    placeholder="Black cotton soil"
                                    className={inputClass}
                                    style={{ borderColor: theme.line }}
                                />
                            </Field>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 border-t p-5" style={{ borderColor: theme.line }}>
                    <button
                        type="button"
                        onClick={step === 0 ? onClose : goBack}
                        className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                        style={{ borderColor: theme.line, color: theme.inkSoft }}
                    >
                        {step === 0 ? "Cancel" : "Back"}
                    </button>

                    {isLastStep ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            style={{ background: theme.leaf }}
                        >
                            {loading ? "Banavi rahyu chhe..." : "Banavo"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={goNext}
                            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ background: theme.leaf }}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
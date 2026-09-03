// Section/sall-management/Create-sall.tsx
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LuUpload, LuX, LuImagePlus, LuLoader, LuSprout } from "react-icons/lu";
import Button from "../../components/commen/Button";
import Select from "../../components/commen/Select";
import DatePicker from "../../components/commen/DatePicker";
import RichTextarea from "../../components/commen/RichTextarea";
import { createSaleListing } from "../../lib/salesApi";
import Input from "../../components/commen/Input";
import { FaUserTie } from "react-icons/fa";
import { MdOpacity } from "react-icons/md";

const MIN_IMAGES = 3;
const MAX_IMAGES = 6;

const MARKET_OPTIONS = ["Ahmedabad APMC", "Rajkot APMC", "Gondal APMC", "Deesa APMC", "Unjha APMC", "Surat APMC"];
const UNIT_OPTIONS = [
    { value: "quintal", label: "Quintal" },
    { value: "kg", label: "Kg" },
    { value: "ton", label: "Ton" },
    { value: "bag", label: "Bag" },
];
const QUALITY_OPTIONS = [
    { value: "premium", label: "Premium" },
    { value: "grade-a", label: "Grade A" },
    { value: "grade-b", label: "Grade B" },
    { value: "standard", label: "Standard" },
];

interface SaleForm {
    cropName: string;
    variety: string;
    quantity: string;
    unit: string;
    pricePerUnit: string;
    market: string;
    quality: string;
    harvestDate: string;
    contactNumber: string;
    description: string;
}

const INITIAL_FORM: SaleForm = {
    cropName: "",
    variety: "",
    quantity: "",
    unit: "quintal",
    pricePerUnit: "",
    market: "",
    quality: "standard",
    harvestDate: "",
    contactNumber: "",
    description: "",
};

// Frontend (camelCase) -> Backend (snake_case) field mapping
const FIELD_MAP: Record<keyof SaleForm, string> = {
    cropName: "crop_name",
    variety: "variety",
    quantity: "quantity",
    unit: "unit",
    pricePerUnit: "expected_price",
    market: "market_apmc",
    quality: "quality",
    harvestDate: "harvest_date",
    contactNumber: "contact_number",
    description: "description",
};

export default function CreateSall() {
    const [form, setForm] = useState<SaleForm>(INITIAL_FORM);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const urls = images.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [images]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSelectChange(name: keyof SaleForm, value: string) {
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = Array.from(e.target.files ?? []);
        setImages((prev) => [...prev, ...selected].slice(0, MAX_IMAGES));
        e.target.value = "";
    }

    function removeImage(index: number) {
        setImages((prev) => prev.filter((_, i) => i !== index));
    }

    function clearImages() {
        setImages([]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.cropName || !form.quantity || !form.pricePerUnit || !form.market || !form.contactNumber) {
            toast.error("Badha jaruri (*) fields bharo.");
            return;
        }
        if (images.length < MIN_IMAGES) {
            toast.error(`Ochama ocha ${MIN_IMAGES} photo upload karo.`);
            return;
        }

        const payload = new FormData();

        // Camel case -> snake_case convert kari ne backend ne mokalvu
        (Object.keys(form) as (keyof SaleForm)[]).forEach((key) => {
            const backendKey = FIELD_MAP[key];
            const value = form[key];
            if (value !== "" && value !== undefined && value !== null) {
                payload.append(backendKey, value);
            }
        });

        images.forEach((file) => payload.append("images", file));

        setSubmitting(true);
        try {
            await createSaleListing(payload);
            toast.success("Listing safadtapurvak create thai gayi!");
            setForm(INITIAL_FORM);
            setImages([]);
        } catch (err) {
            console.error("Create sale listing failed:", err);
            toast.error("Listing create karva ma error aavi. Fari try karo.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-green-700 to-green-600 px-6 py-5 text-white shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <LuSprout size={22} />
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Pak vechva mate list karo</h1>
                    <p className="text-sm text-green-50/80">Tamara pak ni vigat bharo, khareedar ne sidhi mahiti malshe.</p>
                </div>
            </div>

            <div className="rounded-2xl border border-green-900/10 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <div className="col-span-2 sm:col-span-1">
                        <Input
                            name="cropName"
                            value={form.cropName}
                            onChange={handleChange}
                            placeholder="e.g. Groundnut"
                            Icons={<FaUserTie />}
                            label={"Crop Name *"}
                            ShowPassword={false}
                            type={"text"}
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <Input
                            name="variety"
                            value={form.variety}
                            onChange={handleChange}
                            placeholder="e.g. Shankar-6"
                            Icons={undefined}
                            label={"Variety"}
                            ShowPassword={false}
                            type={"text"}
                        />
                    </div>

                    <div>
                        <Input
                            type="number"
                            min={0}
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="0"
                            Icons={<MdOpacity />}
                            label={"Quantity *"}
                            ShowPassword={false}
                        />
                    </div>

                    <div>
                        <Select
                            label="Unit *"
                            options={UNIT_OPTIONS}
                            value={form.unit}
                            onChange={(val) => handleSelectChange("unit", val)}
                            searchPlaceholder="Unit search karo..."
                        />
                    </div>

                    <div>
                        <Input
                            type="number"
                            min={0}
                            name="pricePerUnit"
                            value={form.pricePerUnit}
                            onChange={handleChange}
                            placeholder="0"
                            Icons={undefined}
                            label={"Expected price / unit (₹) *"}
                            ShowPassword={false}
                        />
                    </div>

                    <div>
                        <Select
                            label="Quality"
                            options={QUALITY_OPTIONS}
                            value={form.quality}
                            onChange={(val) => handleSelectChange("quality", val)}
                            searchPlaceholder="Quality search karo..."
                        />
                    </div>

                    <div>
                        <Select
                            label="Market / APMC *"
                            placeholder="Select market"
                            options={MARKET_OPTIONS.map((m) => ({ value: m, label: m }))}
                            value={form.market}
                            onChange={(val) => handleSelectChange("market", val)}
                            searchPlaceholder="Market search karo..."
                        />
                    </div>

                    <div>
                        <DatePicker
                            label="Harvest date"
                            value={form.harvestDate}
                            onChange={(val) => handleSelectChange("harvestDate", val)}
                            maxDate={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <Input
                            type="tel"
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            placeholder="9876543210"
                            Icons={undefined}
                            label={"Contact number *"}
                            ShowPassword={false}
                        />
                    </div>

                    <div className="col-span-2">
                        <RichTextarea
                            label="Description"
                            value={form.description}
                            onChange={(html) => setForm((prev) => ({ ...prev, description: html }))}
                            placeholder="Extra vigat, jem ke organic, storage condition, etc."
                        />
                    </div>
                </div>
            </div>

            {/* Image section */}
            <div className="rounded-2xl border border-green-900/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-green-900">
                        Photos * ({images.length}/{MAX_IMAGES})
                    </label>
                    <span className="text-xs font-medium text-green-700">
                        Ochama ocha {MIN_IMAGES} photo jaruri
                    </span>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesSelected}
                    className="hidden"
                />

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                    {previews.map((src, i) => (
                        <div
                            key={src}
                            className="relative aspect-square rounded-xl overflow-hidden border border-green-900/10 ring-1 ring-green-900/5"
                        >
                            <img src={src} alt={`Pak photo ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(i)}
                                aria-label={`Photo ${i + 1} kadho`}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                            >
                                <LuX size={14} aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                    {images.length < MAX_IMAGES && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-green-900/20 flex flex-col items-center justify-center gap-1 text-green-700/60 bg-green-50/40 hover:border-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                        >
                            <LuImagePlus size={22} aria-hidden="true" />
                            <span className="text-xs">Add</span>
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        name="Upload"
                        Icon={<LuUpload size={16} aria-hidden="true" />}
                        type="button"
                        disabled={images.length >= MAX_IMAGES}
                        onclick={() => fileInputRef.current?.click()}
                        classname="px-4 py-2 text-sm"
                    />
                    <Button
                        name="Clear"
                        Icon={<LuX size={16} aria-hidden="true" />}
                        type="button"
                        disabled={images.length === 0}
                        onclick={clearImages}
                        classname="px-4 py-2 text-sm bg-white text-gr   een-700! border border-green-600 hover:bg-green-50"
                    />
                </div>
            </div>

            <Button
                name={submitting ? "Submitting..." : "List for sale"}
                Icon={submitting ? <LuLoader size={16} className="animate-spin" aria-hidden="true" /> : undefined}
                type="submit"
                disabled={submitting}
                classname="w-full py-3.5 text-base font-semibold shadow-md shadow-green-600/20"
            />
        </form>
    );
}
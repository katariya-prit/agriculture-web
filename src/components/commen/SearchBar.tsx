import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-700/50" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Shodho..."}
        className="w-full rounded-lg border border-green-900/15 py-2 pl-9 pr-8 text-sm outline-none focus:border-green-600"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-700/50 hover:text-green-900"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
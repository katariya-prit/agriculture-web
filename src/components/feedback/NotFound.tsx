import { PackageSearch } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "Koi data nathi malyu",
  message = "Aa jagya e hajii sudhi koi listing add nathi thayeli.",
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="rounded-full bg-green-50 p-4">
        <PackageSearch className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-base font-semibold text-green-950">{title}</h3>
      <p className="max-w-sm text-sm text-green-700/60">{message}</p>
    </div>
  );
}
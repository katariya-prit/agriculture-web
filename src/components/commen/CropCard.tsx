
interface CropCardProps {
    emoji: string;
    name: string;
    age: string;
    health: string;
    status: string;
}

export default function CropCard({ emoji, name, age, health, status }: CropCardProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl">
                    {emoji}
                </div>

                <div>

                    <h3 className="text-lg font-bold text-green-900">
                        {name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {age}
                    </p>

                </div>

            </div>

            <div className="mt-5 flex justify-between border-t pt-4">

                <span className="text-sm text-gray-500">
                    Status
                </span>

                <span className="font-semibold text-green-700">
                    {status}
                </span>

            </div>

            <div className="mt-2 flex justify-between">

                <span className="text-sm text-gray-500">
                    Health
                </span>

                <span className={`font-semibold ${health === "Good"
                    ? "text-green-600"
                    : "text-yellow-600"
                    }`}>
                    {health}
                </span>

            </div>

        </div>
    )
}

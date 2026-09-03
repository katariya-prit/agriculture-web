
interface StatCardProps {
    icon: string;
    title: string;
    value: string;
    subtitle: string;
}


export default function StatCard({ icon, title, value, subtitle }: StatCardProps) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                    {icon}
                </div>

                <span className="text-2xl font-bold text-green-800">
                    {value}
                </span>

            </div>

            <h3 className="mt-4 font-semibold text-gray-800">
                {title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                {subtitle}
            </p>

        </div>
    )
}

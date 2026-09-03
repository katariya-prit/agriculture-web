interface QuickActionProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
}


export default function QuickAction({ icon, title, description, onClick }: QuickActionProps) {
    return (
        <button
            onClick={onClick}
            className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >

            <div className="text-3xl">
                {icon}
            </div>

            <h3 className="mt-4 font-bold text-green-900">
                {title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                {description}
            </p>

        </button>
    )
}

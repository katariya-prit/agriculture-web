interface ButtonProps {
    name?: string
    Icon?: React.ReactNode
    classname?: string
    onclick?: () => void
    type: "submit" | "reset" | "button" | undefined
    disabled: boolean
}

export default function Button({ name, Icon, classname, onclick, type, disabled }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`${classname} bg-green-700 hover:bg-green-800 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-green-700/20 cursor-pointer`}
        >
            <span>
                {Icon}
            </span>
            <h1>{name}</h1>
        </button>
    )
}

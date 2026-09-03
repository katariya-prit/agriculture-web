import logo from "../../assets/Logo.png"
export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="rounded-full">
                <img src={logo} className={`h-13 w-13`} />
            </div>
            <div>
                <h1 className="text-xl font-extrabold text-green-800 tracking-wider">FarmLoop</h1>
            </div>
        </div>
    )
}

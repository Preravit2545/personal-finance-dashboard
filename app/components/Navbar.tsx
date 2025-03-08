import { FiSearch, FiBell } from "react-icons/fi";

interface NavProps{
    title:string;
}

export default function Navbar({title}:NavProps) {
    return (
        <div className="bg-gray-800 p-4 rounded-xl flex justify-between items-center shadow-lg">
            {/* Title */}
            <h1 className="text-xl font-semibold text-white">{title}</h1>

            {/* Search Bar & Icons */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 pl-10 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* Notification Bell */}
                <div className="relative cursor-pointer">
                    <FiBell className="text-white text-xl" />
                    <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></span>
                </div>

                {/* Profile */}
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </div>
    );
}

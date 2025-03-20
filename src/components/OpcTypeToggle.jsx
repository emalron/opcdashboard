import React from "react";
import { useOpc } from "./OpcContext";

function OpcTypeToggle() {
    const { isNumber, setIsNumber } = useOpc();

    return (
    <label className="flex gap-2 items-center">
        <div
            className="text-neutral-500 font-center cursor-pointer"
            onClick={() => setIsNumber(!isNumber)}>
            <div className={`relative w-23 h-8 rounded-full transition-all duration-200
                ${isNumber ? 'bg-blue-500' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 h-6 w-8 bg-white rounded-full transition-all duration-200 shadow
                    ${isNumber ? 'left-1' : 'left-14'}`} />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-white font-medium">
                    <span className={`${isNumber ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>String</span>
                    <span className={`${isNumber ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>Number</span>
                </div>
            </div>
        </div>
    </label>
    )
}

export default React.memo(OpcTypeToggle);
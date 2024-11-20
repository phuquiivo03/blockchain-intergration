'use client';
import { useDataContext } from "@/provider/DataContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
function SelectBox() {
    const [show, setShow] = useState(false);
    const {network, setNetwork} = useDataContext();
    return ( <div onClick={() => setShow(!show)} className="relative w-[80px]">
        <span className="flex items-center p-1 text-[12px] text-secondary justify-between border-[1px] border-secondary rounded-[4px] cursor-pointer">{network}
        <ChevronDown size={12} color="var(--secondary)" />
             </span>
        {show && <div className="absolute top-full left-0 w-full bg-[#e4d9fa94]">
            <span className="cursor-pointer hover:bg-[#e4d9fa] p-1 text-[12px] block text-secondary" onClick={() => setNetwork('testnet')}>testnet</span>
            <span className="cursor-pointer hover:bg-[#e4d9fa] p-1 text-[12px] block text-secondary" onClick={() => setNetwork('devnet')}>devnet</span>
        </div>}
    </div> );
}

export default SelectBox;
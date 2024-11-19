'use client'
import { useState } from "react";

function TransferForm() {
    const [address, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const tokenSymbol = 'SUI';
    return ( <div className="w-fit py-[48px] p-[48px] rounded-[4px] border-[1px] flex-col border-secondary shadow-md flex items-center justify-center">
        <span className=" block text-secondary text-[24px] font-[600] mb-4 ">Transfer Token</span>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}  className="w-[320px] bg-[#e4d9fa] py-2 px-3 rounded-[4px] text-black focus:bg-[#cfb8ff] my-6 active:outline-none focus:outline-none" placeholder="Receiver Address" />
        
        
        <input type="text" value={amount == 0 ? '':amount} onChange={e => {
            const value = e.target.value;
            if (isNaN(Number(value))) return;
            return setAmount(Number(value));
        }} className="w-[320px] bg-[#e4d9fa] py-2 px-3 rounded-[4px] text-black focus:bg-[#cfb8ff] active:outline-none focus:outline-none" placeholder="Amount" />

        <span className="text-[#ccc] text-[14px] self-start mt-2">{`${amount/(1000000000)} ${tokenSymbol}`}</span>
        
        
        <button onClick={() => {
            if (!address || amount == 0) return;
            console.log({address, amount});
        }} className=" mt-[64px] mb-10  w-[320px] before:content-[''] before:absolute relative before:left-[-54px] before:block overflow-hidden before:top-[-40px] before:w-8 before:h-[200px] before:bg-[#ffffff61] before:rotate-45 bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-[4px] text-white my-6 active:outline-none focus:outline-none hover:before:translate-x-[320px] before:transition-all before:ease-in-out before:duration-300 active:scale-[.99]">Transfer</button>

    </div> );
}

export default TransferForm;
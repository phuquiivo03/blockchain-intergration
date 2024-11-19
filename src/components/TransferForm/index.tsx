'use client'
import { useState } from "react";
import { useCurrentAccount, useCurrentWallet, useDisconnectWallet, useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Transaction } from '@mysten/sui/transactions';
const rpcUrl = getFullnodeUrl('devnet');
 import { useWallets } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { toast } from "react-toastify";
// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });
function TransferForm() {
    const network = 'devnet';
    console.log();
    const [address, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const tokenSymbol = 'SUI';
    const { mutateAsync: signTransaction } = useSignTransaction();
    

    const h = async () => {
        const tx = new Transaction();
        tx.setGasBudget(2000000);
        const [coin] = tx.splitCoins(tx.gas, [amount]);
        tx.transferObjects([coin], address); 
        const { bytes, signature, reportTransactionEffects } = await signTransaction({
            transaction: tx,
            chain: 'sui:devnet',
        });
        const executeResult = await client.executeTransactionBlock({
            transactionBlock: bytes,
            signature
        });
        toast.success(<span className="font-[500] text-[13px]"> Transaction Successfully! <a onClick={() => open(`https://${network}.suivision.xyz/txblock/${executeResult.digest}`)} className="underline text-secondary cursor-pointer">View Transaction</ a></span>);
    }

   
    return ( 
    <div className="w-fit py-[48px] p-[48px] rounded-[4px] border-[1px] flex-col border-secondary shadow-md flex items-center justify-center">
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
            h();
        }} className=" mt-[64px] mb-10  w-[320px] before:content-[''] before:absolute relative before:left-[-54px] before:block overflow-hidden before:top-[-40px] before:w-8 before:h-[200px] before:bg-[#ffffff61] before:rotate-45 bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-[4px] text-white my-6 active:outline-none focus:outline-none hover:before:translate-x-[320px] before:transition-all before:ease-in-out before:duration-300 active:scale-[.99]">Transfer</button>

    </div> );
}

export default TransferForm;
'use client'
import {  useState } from "react";
import {useCurrentAccount, useCurrentWallet, useSignTransaction } from "@mysten/dapp-kit";
import { Transaction } from '@mysten/sui/transactions';
import { toast } from "react-toastify";
import { useDataContext } from "@/provider/DataContext";
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";
// create a client connected to devnet
function TransferForm() {


    const {connectionStatus} = useCurrentWallet();
    const {client, network} = useDataContext();
    const account = useCurrentAccount();

    const [address, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const tokenSymbol = 'SUI';

    const { mutateAsync: signTransaction } = useSignTransaction();

    
    const handleSubmit = async () => {
        if(!dataValidation()) return;
        const tx = new Transaction();
        tx.setGasBudget(2000000);
        const [coin] = tx.splitCoins(tx.gas, [amount]);
        tx.transferObjects([coin], address); 
        try{
        
            const { bytes, signature } = await signTransaction({
                transaction: tx,
                chain: `sui:${network}`,
            });
            const executeResult = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature
            });
            toast.success(<span className="font-[500] text-[13px]"> Transaction Successfully! <a onClick={() => open(`https://${network}.suivision.xyz/txblock/${executeResult.digest}`)} className="underline text-secondary cursor-pointer">View Transaction</ a></span>);
            handleSaveHistory(executeResult);
        } catch {
            toast.error('Transaction Failed');
        }
    }

    const handleSaveHistory = (res: SuiTransactionBlockResponse)=> {
        
        const data = {
            reiver: address,
            amount: amount,
            timeStamp: Date.now(),
            digest: res?.digest
        }
        const history = JSON.parse(localStorage.getItem(`transferHistory${account?.address}`) || '[]');
        history.push(data);
        localStorage.setItem(`transferHistory${account?.address}`, JSON.stringify(history));
    }

    const dataValidation = () => {
        if(address.length != 66 || address.substring(0, 2) != '0x') {
            toast.warn(`Invalid Address ${address.length} ${address.substring(0, 2)}`);
            return false;  
        }
        if(amount <= 10000)  {
            toast.warn("Minimum amount is 0.00001 SUI");
            return false;
        }
        return true;
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
            if(connectionStatus != 'connected'){
                toast.warn('Please connect wallet');
                return;
            }
            if (!address || amount == 0){
                toast.warn('Please fill all fields');
                return; 
            };
            handleSubmit();
        }} className={`mt-[64px] mb-10  w-[320px] before:content-[''] before:absolute relative before:left-[-54px] before:block overflow-hidden before:top-[-40px] before:w-8 before:h-[200px] before:bg-[#ffffff61] before:rotate-45  py-2 px-3 rounded-[4px] text-white my-6 active:outline-none focus:outline-none  before:transition-all before:ease-in-out before:duration-300 active:scale-[.99] ${connectionStatus == 'connected'? 'bg-gradient-to-r from-primary to-secondary hover:before:translate-x-[320px]': 'bg-slate-300'}`}>Transfer</button>

    </div> );
}

export default TransferForm;
'use client'
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

interface HistoryProps {
        digest: string;
    reiver: string;
    amount: string;
    timeStamp: number;
}
function History() {
    const {connectionStatus} = useCurrentWallet();
    const account = useCurrentAccount()
    const [history, setHistory] = useState<HistoryProps[]>([]);
    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem(`transferHistory${account?.address}`) || '[]'));
    }, [])
    return ( <div className="flex items-center justify-center min-h-[90vh]">
       {connectionStatus == 'connected'? <div> {history.map((item: HistoryProps, index: number) => {
            return   ( <div className="border-[2px] border-secondary mt-2 rounded-[4px] p-5" key={index}>
                <div className="mt-1 font-[500]">{`Digest: ${item?.digest||'not found'}`}</div>
                <div className="mt-1 font-[500]">{`Receiver: ${item?.reiver||'not found'}`}</div>
                <div className="mt-1 font-[500]">{`Amount: ${item?.amount||'not found'}`}</div>
                <div className="mt-1 font-[500]">{`Timestamp: ${item?.timeStamp?( new Date(item?.timeStamp)).toLocaleDateString():'not found'}`}</div>
            </div>)


        })}</div> : <span className="text-secondary text-[24px] font-[600]">Login to view history</span>}

    </div> );
}

export default History;
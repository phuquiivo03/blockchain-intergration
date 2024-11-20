'use client'
import { DataContext, useDataContext } from "@/provider/DataContext";
import HeadignButton from "../../../components/HeadingButton";
import { useContext, useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { ConnectButton, useAccounts, useCurrentWallet } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Copy, CheckCheck } from "lucide-react";
const pages = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'History',
        href: '/history'
    }
]
function Heading() {
    const { currentWallet, connectionStatus } = useCurrentWallet();
    const accounts = useAccounts();
    const [balance, setBalance] = useState<any>(null);
    const [active, setActive] = useState<boolean>(false);
    const context =useContext(DataContext)
    if(!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }

    const handleCopy = () => {
        if(!active)
            navigator.clipboard.writeText(accounts[0].address);
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, 1000);
    }

    const rpcUrl = getFullnodeUrl(context.network == 'devnet' || context.network == 'testnet'? context.network : 'devnet');
    // create a client connected to devnet
        const client = new SuiClient({ url: rpcUrl });
        useEffect(() => {
            if(connectionStatus == 'connected') {
                client.getCoins({
                    owner: accounts[0].address,
                }).then(res => setBalance(res.data.length > 0? res.data.filter((coin: any) => coin.coinType == '0x2::sui::SUI')[0].balance:0));
            }
        }
        , [connectionStatus])
    
    const {activePage, setActivePage} =context;
    return ( <div className="w-full pt-6 px-[100px] flex items-center justify-between">
        <div className=" flex justify-self-center justify-items-center">
        {
            pages.map((page, index) => <HeadignButton to={page.href} active={index == activePage} key={index} text={page.title} click={()=> {
                setActivePage(index);
            }} />  )  

        }
        </div>
        <div className="flex items-center">
        {connectionStatus == 'connected'&&< ><div className="flex ml-6 items-center justify-center "><Coins size={14} strokeWidth={3}  />
            <span className="ml-2 text-[14px] font-[600]">{balance}</span>
            </div>
            <div className="ml-8 flex items-center justify-center h-fit bg-secondary px-2 py-1 rounded-[4px] "> 
                <span className="text-white  text-[16px] font-[600]">
                    {accounts[0]?.address.substring(0, 8)}...
                </span>
                <span onClick={handleCopy} className="cursor-pointer active:scale-105">{active? <CheckCheck size={14} strokeWidth={3} stroke="white" className="ml-2" />:<Copy size={14} strokeWidth={3} stroke="white" className="ml-2" />}</span>
            </div></>}
            <div className="ml-4"><ConnectButton  /></div>
        </div>
    </div> );
}

export default Heading;
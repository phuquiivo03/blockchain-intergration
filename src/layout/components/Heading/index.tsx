'use client'
import { DataContext, useDataContext } from "@/provider/DataContext";
import HeadignButton from "../../../components/HeadingButton";
import { useContext, useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { ConnectButton, useAccounts, useCurrentWallet, useSuiClient } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Copy, CheckCheck } from "lucide-react";
import SelectBox from "@/components/SelectBox";
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
    const { client } = useDataContext();
    const accounts = useAccounts();
    const [balance, setBalance] = useState<any>(null);
    const [active, setActive] = useState<boolean>(false);
    const {connectionStatus} = useCurrentWallet();
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

    // create a client connected to devnet
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
        <div className="flex items-center justify-end">
        {connectionStatus == 'connected'&&< ><div className="flex ml-6 items-center justify-center "><Coins size={14} strokeWidth={3}  />
            <span className="ml-2 text-[14px] font-[600]">{balance}</span>
            </div>
            <div className="ml-8 flex items-center justify-center h-fit bg-secondary px-2 py-1 rounded-[4px] "> 
                <span className="text-white  text-[16px] font-[600]">
                    {accounts[0]?.address.substring(0, 8)}...
                </span>
                <span onClick={handleCopy} className="cursor-pointer active:scale-105">{active? <CheckCheck size={14} strokeWidth={3} stroke="white" className="ml-2" />:<Copy size={14} strokeWidth={3} stroke="white" className="ml-2" />}</span>
            </div></>}
            <div className="mx-1 scale-[0.65]"><ConnectButton className="bg-secondary"  /></div>
        {/* select network */}
        <SelectBox />
        <span className={`ml-4 w-3 h-3 rounded-[50%] ${client? 'bg-green-400': 'bg-red-600'}`}></span>
        </div>

    </div> );
}

export default Heading;
'use client'
import { DataContext, useDataContext } from "@/provider/DataContext";
import HeadignButton from "../../../components/HeadingButton";
import { useContext, useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { ConnectButton, useAccounts, useCurrentWallet } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
const pages = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'History',
        href: '/history'
    },
    {
        title: 'Contact',
        href: '/contact'
    }
]
function Heading() {
    const { currentWallet, connectionStatus } = useCurrentWallet();
    const accounts = useAccounts();
    const [balance, setBalance] = useState<any>(null);
    const context =useContext(DataContext)
    if(!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }



    const rpcUrl = getFullnodeUrl('devnet');
// create a client connected to devnet
        const client = new SuiClient({ url: rpcUrl });
        useEffect(() => {
            if(connectionStatus == 'connected') {
                client.getCoins({
                    owner: accounts[0].address,
                }).then(res => setBalance(res.data.length > 0? res.data.filter((coin: any) => coin.coinType == '0x2::sui::SUI')[0].balance:0));
        }}
        , [connectionStatus])
    
    console.log(accounts)
    const {activePage, setActivePage} =context;
    return ( <div className="w-full pt-6 px-[100px] flex items-center justify-end">
        {
            pages.map((page, index) => <HeadignButton to={page.href} active={index == activePage} key={index} text={page.title} click={()=> {
                setActivePage(index);
            }} />  )  

        }
        {connectionStatus == 'connected'&&<><div className="flex ml-6 items-center justify-center "><Coins size={14} strokeWidth={3}  />
            <span className="ml-2 text-[14px] font-[600]">{balance}</span>
        </div>
        <button className="ml-8"> <span className="text-white bg-secondary px-2 py-1 rounded-[4px] hover:shadow-sm hover:shadow-secondary text-[16px] font-[600]">{accounts[0]?.address}</span>
        </button></>}
        <div className="ml-4"><ConnectButton  /></div>
    </div> );
}

export default Heading;
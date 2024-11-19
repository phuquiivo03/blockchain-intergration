'use client'
import { DataContext, useDataContext } from "@/provider/DataContext";
import HeadignButton from "../../../components/HeadingButton";
import { useContext } from "react";
import { Coins } from "lucide-react";
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
    const context =useContext(DataContext)
    if(!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    const {activePage, setActivePage} =context;
    return ( <div className="w-full pt-6 px-[100px] flex items-center justify-end">
        {
            pages.map((page, index) => <HeadignButton to={page.href} active={index == activePage} key={index} text={page.title} click={()=> {
                setActivePage(index);
            }} />  )  

        }
        <div className="flex ml-6 items-center justify-center"><Coins size={14} weight={1} strokeWidth={3}  /><span className="ml-2 text-[14px] font-[600]">99.999</span></div>
        <button className="ml-8"> <span className="text-white bg-secondary px-2 py-1 rounded-[4px] hover:shadow-sm hover:shadow-secondary text-[16px] font-[600]">Connect Wallet</span>
        </button>
    </div> );
}

export default Heading;
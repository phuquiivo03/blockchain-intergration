'use client'
import { useRouter } from "next/navigation";
import { text } from "stream/consumers";


interface Props {
    text: string;
    click: () => void;
    active: boolean;
    to: string;
}
function HeadignButton(props: Props) {
    const router = useRouter();
    return ( <div className={`headingButtonWrapper flex justify-center items-center px-4 py-2 cursor-pointer ${props.active? 'border-b-[3px]': ''}  border-secondary rounded-t-lg`}
        onClick={() => {
            
            props.click()
        
            router.push(props.to)
        }}
    >
        <span className="text-secondary font-[600] text-[20px]">
            {props.text}
        </span>
    </div> );
}

export default HeadignButton;
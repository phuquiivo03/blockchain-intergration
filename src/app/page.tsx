import TransferForm from "@/components/TransferForm";
import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";


export default function Home() {
  return (
    <>
            <div  className="h-[90vh] flex items-center justify-center"><TransferForm /></div>
    </>
  );
}

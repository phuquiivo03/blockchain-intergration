import Heading from "@/layout/components/Heading";
import {Poppins} from "next/font/google";
import { DataProvider } from "@/provider/DataContext";

const popins = Poppins({
  display: "swap",
  subsets: ["latin-ext"],
  weight: ['400', '500', '600', '700'],
});
function DefaultLayout({children} : {children: React.ReactNode}) {
    return ( 
            <div className={popins.className}>
                <Heading />
                <div className="px-[100px]">{children}</div>
            </div>
     );
}

export default DefaultLayout;
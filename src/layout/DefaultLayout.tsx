'use client'
import Heading from "@/layout/components/Heading";
import {Poppins} from "next/font/google";
import {  useDataContext } from "@/provider/DataContext";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from "@mysten/sui.js/client";
import '@mysten/dapp-kit/dist/index.css';
const popins = Poppins({
  display: "swap",
  subsets: ["latin-ext"],
  weight: ['400', '500', '600', '700'],
});

const { networkConfig } = createNetworkConfig({
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
});
const queryClient = new QueryClient();
function DefaultLayout({children} : {children: React.ReactNode}) {
  const {network} = useDataContext()
    return ( 
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={network == 'devnet' || network == 'testnet' ? network : 'devnet'}>
          <WalletProvider>
            <div className={popins.className}>
                <Heading />
                <div className="px-[100px]">{children}</div>
            </div>
          </WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
     );
}

export default DefaultLayout;
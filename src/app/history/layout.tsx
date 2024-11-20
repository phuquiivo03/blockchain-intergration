import DefaultLayout from "@/layout/DefaultLayout";

function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return ( <>
        {children}
    </> );
}

export default RootLayout;
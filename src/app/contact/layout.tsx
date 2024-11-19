import DefaultLayout from "@/layout/DefaultLayout";

function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return ( <DefaultLayout>{children}</DefaultLayout> );
}

export default RootLayout;
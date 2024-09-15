import React, { useRef, useState } from "react";

import ToogleDark from "@/Components/Navbar/ToogleDark";
import Account from "@/Components/Navbar/Account";
import SidebarDesktop from "@/Components/Sidebar/SidebarDesktop";
import { Widgets } from "@mui/icons-material";
import Card from "@/Components/Card/Card";
import { Head } from "@inertiajs/react";

export default function AuthLayout({ children, title }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const triggerRef = useRef();
    return (
        <div className="relative w-full bg-white dark:bg-slate-950 h-screen usetransition">
            <Head title={title} />
            {/* Navbar */}
            <div className="flex justify-between items-center px-2 md:px-4 lg:px-8 usetransition py-2">
                {/* Logo dan Title Logo */}
                <div className="flex gap-x-3 items-center">
                    <div className="flex gap-x-2 items-center">
                        <img src="/favicon.ico" alt="" className="h-10 w-10" />
                        <h1 className="font-bold dark:text-white text-slate-950">
                            SMK JUAN PATTAROPURA
                        </h1>
                    </div>
                    <button
                        ref={triggerRef}
                        onClick={() => setOpenSidebar(true)}
                        className="block md:hidden text-slate-950 dark:text-white leading-3 tracking-tighter"
                    >
                        <Widgets color="inherit" fontSize="inherit" />
                    </button>
                </div>
                <div className="flex gap-x-3 items-center justify-between">
                    {/* Toogle */}
                    <ToogleDark />
                    {/* Account  */}
                    <Account />
                </div>
            </div>
            {/*Container */}
            <div className="flex justify-between h-fit bg-slate-100 dark:bg-slate-950">
                <SidebarDesktop
                    open={openSidebar}
                    setOpen={setOpenSidebar}
                    triggerRef={triggerRef}
                />
                <div className=" w-full overflow-y-auto bg-slate-100/90 dark:bg-slate-900/30">
                    <div className="px-3 py-2 max-h-[85vh] overflow-y-auto">
                        {/* Contoh */}

                        {children}
                    </div>
                    <div className="bg-white dark:bg-slate-950 w-full py-2  fixed left-0 bottom-0 flex justify-end px-4">
                        <p className="text-xs">Copy Right @ Mahacreative</p>
                    </div>
                </div>
            </div>
            {/* FOOTER */}
        </div>
    );
}

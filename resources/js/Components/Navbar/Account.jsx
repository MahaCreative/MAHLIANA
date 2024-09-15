import { Link } from "@inertiajs/react";
import { Logout, ManageAccounts } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

function Account() {
    const accountRef = useRef();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        let handler = (e) => {
            if (!accountRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    return (
        <div
            ref={accountRef}
            onClick={() => setOpen(!open)}
            className={`${
                open ? "bg-slate-200 dark:bg-slate-900" : ""
            } flex justify-between items-center gap-3 relative cursor-pointer  py-1 px-2 rounded-sm`}
        >
            <div className="flex flex-col tracking-tight leading-3 text-right">
                <p className="capitalize text-[8pt] md:text-[10pt] lg:text-sm font-semibold text-slate-950 dark:text-white">
                    USER
                </p>
            </div>
            <div className=" flex gap-x-4 items-center hover:cursor-pointer">
                <img src="" alt="" className="w-5 h-5 rounded-full" />
            </div>
            <div
                className={`${
                    open ? " py-2 w-[180px] opacity-100" : "opacity-0 h-0 w-0"
                } absolute right-0 top-12  rounded-md bg-slate-200 dark:bg-slate-900 overflow-y-hidden usetransition border border-slate-500/50 z-50`}
            >
                {/* <Menu
                    icon={
                        <ManageAccounts children="inherit" fontSize="inherit" />
                    }
                    name={"Setting Profile"}
                /> */}
                <Menu
                    icon={<Logout children="inherit" fontSize="inherit" />}
                    name={"Logout"}
                />
            </div>
        </div>
    );
}

function Menu({ icon, name, url }) {
    return (
        <Link
            href={url}
            className="px-3 hover:bg-slate-300 hover:dark:bg-slate-800 flex gap-2 items-center tracking-tighter text-[8pt] md:text-sm lg:text-base dark:text-slate-200"
        >
            <div>{icon}</div>
            <p>{name}</p>
        </Link>
    );
}

export default Account;

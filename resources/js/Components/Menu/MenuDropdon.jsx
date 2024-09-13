import { KeyboardArrowDown, SpaceDashboard } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import MenuLink from "./MenuLink";

export default function MenuDropdon({ icon, title, children }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        window.addEventListener("mousedown", handler);
        return () => {
            window.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div className="h-full" ref={dropdownRef}>
            <div
                onClick={() => setOpen(!open)}
                className={`${
                    open ? "bg-slate-200/30 dark:bg-slate-900/30" : ""
                } h-full py-2 px-4 hover:cursor-pointer hover:bg-slate-200/30 hover:dark:bg-slate-900/30 backdrop-blur-sm flex justify-between items-center usetransition`}
            >
                <div className="flex gap-x-3 items-center">
                    <div className="leading-3 tracking-tighter  text-slate-950 dark:text-white text-2xl">
                        {icon}
                    </div>
                    <div className="font-light text-slate-950 dark:text-white">
                        {title}
                    </div>
                </div>
                <div
                    className={`${
                        open ? "rotate-180" : ""
                    } usetransition leading-3 tracking-tighter text-slate-950 dark:text-white text-xl`}
                >
                    <KeyboardArrowDown color="inherit" fontSize="inherit" />
                </div>
            </div>
            <div
                className={`${
                    open
                        ? "h-full opacity-100 translate-x-0"
                        : "-translate-x-10 h-0 opacity-0"
                } overflow-y-hidden usetransition w-full `}
            >
                {children}
            </div>
        </div>
    );
}

import { Link } from "@inertiajs/react";
import { SpaceDashboard } from "@mui/icons-material";
import React from "react";

export default function MenuLink({
    icon,
    link,
    title,
    active,
    dropdown = false,
}) {
    return (
        <Link
            href={link}
            className={`${
                active ? "bg-slate-200/30 dark:bg-slate-900/30" : ""
            } h-full py-2 ${
                dropdown ? "px-12" : "px-4"
            } hover:bg-slate-200/30 hover:dark:bg-slate-900/30 backdrop-blur-sm flex justify-between items-center usetransition`}
        >
            <div className="flex gap-x-3 items-center">
                <div
                    className={`leading-3 tracking-tighter  text-slate-950 dark:text-white ${
                        dropdown ? "text-base" : "text-2xl"
                    }`}
                >
                    {icon}
                </div>
                <div
                    className={`font-light text-slate-950 dark:text-white ${
                        dropdown ? "text-base" : ""
                    }`}
                >
                    {title}
                </div>
            </div>
        </Link>
    );
}

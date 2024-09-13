import { Person } from "@mui/icons-material";
import React from "react";

function CardComponent({ children }) {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark py-2 px-4">
            {children}
        </div>
    );
}

function Icon({ children, className }) {
    return (
        <div
            className={`${
                className
                    ? className
                    : "text-xl md:text-2xl  h-10 w-10 md:h-10 md:w-10"
            } tracking-tighter leading-3  rounded-full bg-slate-100 dark:bg-black flex items-center justify-center`}
        >
            {children}
        </div>
    );
}

CardComponent.Icon = Icon;
export default CardComponent;

import { Close } from "@mui/icons-material";
import React from "react";

export default function Modals({ children, title, open, setOpens }) {
    return (
        <div
            className={`absolute top-0 left-0 w-full ${
                open ? "h-full" : "h-0"
            } overflow-y-hidden bg-slate-950/50 backdrop-blur-sm z-[999]`}
        >
            <div className="w-full h-full flex justify-center items-center">
                <div
                    className={`bg-white dark:bg-slate-800 rounded-md py-3 px-5 ${
                        open
                            ? "translate-y-0 opacity-100"
                            : "translate-y-50 opacity-0"
                    } usetransition transform min-w-[300px] max-w-[90vw] md:max-w-[70vw] lg:max-w-[80vw] min-h-[300px] max-h-[95vh] overflow-y-auto`}
                >
                    <div className="flex justify-between items-center text-slate-950 w-full">
                        <p className="block text-slate-950 dark:text-slate-100">
                            {title}
                        </p>
                        <button
                            onClick={() => setOpens(false)}
                            className="rounded-md hover:bg-slate-900 py-1 px-2 leading-3 tracking-tighter hover:text-white text-slate-950 usetransition"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

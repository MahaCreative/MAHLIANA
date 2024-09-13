import React from "react";

export default function InputText({ name, title, errors, ...props }) {
    return (
        <div className="w-full">
            {title && <p>{title}</p>}
            <div className="w-full">
                <input
                    name={name}
                    className="w-full px-3 py-1 relative rounded-md bg-slate-100 dark:bg-slate-900 border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0 appearance-none h-[40px] flex flex-col items-center justify-center "
                    {...props}
                />
            </div>
            {errors && (
                <p className="text-xs italic text-red-500 font-light tracking-tighter leading-3">
                    {errors}
                </p>
            )}
        </div>
    );
}

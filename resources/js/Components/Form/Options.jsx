import { ArrowDownward, ArrowDropDown } from "@mui/icons-material";
import React, {
    Children,
    cloneElement,
    useEffect,
    useRef,
    useState,
} from "react";

function Options({ children, name, title, onChange, errors, value }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const optionRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!optionRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const handleOptionValue = (e) => {
        setSelectedValue(e);
        setOpen(false);
        if (onChange) {
            onChange({ value: e, name: name });
        }
    };
    useEffect(() => {
        if (value) {
            setSelectedValue(value);
        }
    });

    return (
        <div ref={optionRef} onClick={() => setOpen(!open)}>
            <div className="w-full px-3 hover:cursor-pointer py-1 relative rounded-md bg-slate-100 dark:bg-slate-950 border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0 appearance-none h-[40px] flex flex-col items-start justify-center gap-3">
                <div className="min-w-[200px] max-w-full flex gap-x-4 tracking-tighter leading-3 items-center justify-between">
                    <p className="w-fullmy-3">
                        {selectedValue ? selectedValue : title}
                    </p>
                    <div
                        className={`${open ? "rotate-180" : ""} usetransition`}
                    >
                        <ArrowDropDown fontSize="inherit" color="inherit" />
                    </div>
                </div>

                <div
                    className={`${
                        open
                            ? "max-h-[300px] opacity-100 overflow-y-auto min-w-[100%] "
                            : "opacity-0 max-h-0 overflow-y-hidden"
                    }   z-10 usetransition  rounded-md  absolute left-0 top-12 bg-white shadow-lg shadow-gray-700/50 dark:bg-slate-900 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-900 scrollbar-track-slate-100 dark:scrollbar-track-slate-800 scrolbar`}
                >
                    {Children.map(children, (child) =>
                        cloneElement(child, {
                            onClick: handleOptionValue,
                            selectedValue: selectedValue,
                        })
                    )}
                </div>
            </div>

            {errors && (
                <p className="text-xs italic text-red-500 font-light tracking-tighter leading-3">
                    {errors}
                </p>
            )}
        </div>
    );
}

function Item({ children, value, onClick, selectedValue }) {
    return (
        <div
            className={`${
                selectedValue == value ? "dark:bg-slate-950 bg-slate-300 " : ""
            } px-3 font-light text-sm text-slate-950 dark:text-white hover:bg-slate-200 hover:dark:bg-slate-950/50 min-w-[300px] w-full`}
            onClick={() => onClick(value)}
        >
            {children}
        </div>
    );
}
Options.Item = Item;
export default Options;

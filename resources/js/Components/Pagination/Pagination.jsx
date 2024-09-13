import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links, currentPage, params, setParams }) {
    return (
        <ul>
            {links.map((item, key) => (
                <button
                    disabled={
                        item.url == null || item.label == currentPage
                            ? true
                            : false
                    }
                    className={`${
                        item.url == null || item.label == currentPage
                            ? "bg-slate-200 dark:bg-slate-700 hover:cursor-not-allowed"
                            : ""
                    } py-1 px-2 rounded-md  mx-2 text-xs hover:bg-slate-300 hover:dark:bg-slate-800 usetransition`}
                    key={key}
                    onClick={() =>
                        setParams({
                            ...params,
                            page: new URL(item.url).searchParams.get("page"),
                        })
                    }
                    dangerouslySetInnerHTML={{ __html: item.label }}
                />
            ))}
        </ul>
    );
}

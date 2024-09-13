import React from "react";

export default function Search({ params, setParams }) {
    return (
        <input
            value={params.cari}
            onChange={(e) => setParams({ ...params, cari: e.target.value })}
            placeholder="cari..."
            className="rounded-md bg-slate-100 dark:bg-slate-800/50 border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0"
        ></input>
    );
}

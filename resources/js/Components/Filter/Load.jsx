import React, { useEffect, useState } from "react";
import Options from "../Form/Options";

export default function Load({ length, params, setParams }) {
    const [numberList, setNumberList] = useState([]);
    useEffect(() => {
        let number = [];
        let bagi = 10;
        if (length > 0 && length <= 50) {
            bagi = 2;
        } else if (length > 100 && length <= 200) {
            bagi = 10;
        } else {
            bagi = 25;
        }
        for (let i = 10; i < length / bagi; i = i + params.load) {
            number.push(i);
        }
        setNumberList(number);
    }, []);
    return (
        <Options name={"load"} title={"Load"} onChange={(e) => console.log(e)}>
            <Options.Item value={""}>
                Pilih jumlah data yang ditampilkan
            </Options.Item>
            {numberList.map((item, key) => (
                <Options.Item value={item} key={key}>
                    {item}
                </Options.Item>
            ))}
        </Options>
    );
    // <select
    //     className="rounded-md bg-slate-100 dark:bg-slate-800/50 border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0 appearance-none "
    //     value={params.load}
    //     onChange={(e) => setParams({ ...params, load: e.target.value })}
    // >
    //     {numberList.map((item, key) => (
    //         <option value={item} key={key}>
    //             {item}
    //         </option>
    //     ))}
    //     <option value={length}>All Data</option>
    // </select>;
}

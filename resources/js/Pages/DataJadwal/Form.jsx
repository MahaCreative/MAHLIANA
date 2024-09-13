import InputText from "@/Components/Form/InputText";
import Options from "@/Components/Form/Options";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default function Form({ open, setOpen, props }) {
    const { data, setData, post, errors, reset } = useForm({
        data_kelas_id: "",
        data_mapel_id: "",
        hari: "",
        jam_masuk: "",
    });
    const { dataKelas } = usePage().props;
    const { dataMapel } = usePage().props;
    const submitHandler = (e) => {
        -e.preventDefault();
        post(route("data-jadwal"), {
            onSuccess: (e) => {
                console.log(e);
                setOpen(false);
                reset("data_mapel_id", "hari", "jam_keluar", "jam_masuk");
                Swal.fire({
                    title: "Success",
                    text: "1 kelas baru berhasil ditambahkan",
                    icon: "success",
                    confirmButtonText: "Close",
                });
            },
            onError: (e) => {
                console.log(e);

                Swal.fire({
                    title: "Error!",
                    timer: 2000,
                    text: e?.message
                        ? e.message
                        : "Data kelas gagal di tambahkan silahkan periksa kembali isian anda",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            },
        });
    };
    console.log(data);

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-3">
                <Options
                    errors={errors.data_kelas_id}
                    onChange={(e) => setData({ ...data, [e.name]: e.value })}
                    name={"data_kelas_id"}
                    title={"Silahkan Pilih Data Kelas"}
                    value={""}
                >
                    <Options.Item value={""}>Silahkan Pilih Kelas</Options.Item>
                    {dataKelas.map((item, key) => (
                        <Options.Item key={key + 1} value={item.nama_kelas}>
                            {item.nama_kelas}
                        </Options.Item>
                    ))}
                </Options>
                <Options
                    errors={errors.data_mapel_id}
                    onChange={(e) => setData({ ...data, [e.name]: e.value })}
                    name={"data_mapel_id"}
                    title={"Silahkan Pilih Data Mapel"}
                    value={""}
                >
                    <Options.Item value={""}>Silahkan Pilih Mapel</Options.Item>
                    {dataMapel.map((item, key) => (
                        <Options.Item key={key + 1} value={item.nama_mapel}>
                            {item.nama_mapel}
                        </Options.Item>
                    ))}
                </Options>
            </div>
            <Options
                errors={errors.hari}
                onChange={(e) => setData({ ...data, [e.name]: e.value })}
                name={"hari"}
                title={"Silahkan Pilih Hari"}
                value={""}
            >
                <Options.Item value={""}>Silahkan Pilih Hari</Options.Item>
                <Options.Item value={"senin"}>senin</Options.Item>
                <Options.Item value={"selasa"}>selasa</Options.Item>
                <Options.Item value={"rabu"}>rabu</Options.Item>
                <Options.Item value={"kamis"}>kamis</Options.Item>
                <Options.Item value={"jumat"}>jumat</Options.Item>
                <Options.Item value={"sabtu"}>sabtu</Options.Item>
            </Options>
            <InputText
                errors={errors.jam_masuk}
                type="time"
                name={"jam_masuk"}
                title={"Jam Masuk"}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />

            <div className="flex gap-3 items-center">
                <button className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-950 dark:text-white text-slate-200">
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-950 dark:text-white text-slate-200"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}

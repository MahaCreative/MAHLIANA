import InputText from "@/Components/Form/InputText";
import Options from "@/Components/Form/Options";
import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default function Form({ open, setOpen }) {
    const { data, setData, post, errors, reset } = useForm({
        kd_mapel: "",
        nama_mapel: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("data-mapel"), {
            onSuccess: (e) => {
                console.log(e);
                setOpen(false);
                reset();
                Swal.fire({
                    title: "Success",
                    text: "1 Mata pelajaran baru berhasil ditambahkan",
                    icon: "success",
                    confirmButtonText: "Close",
                });
            },
            onError: (e) => {
                Swal.fire({
                    title: "Error!",
                    timer: 2000,
                    text: "Data mata pelajaran gagal di tambahkan silahkan periksa kembali isian anda",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            },
        });
    };
    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <InputText
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                errors={errors.kd_mapel}
                name={"kd_mapel"}
                title={"Kode Mata Pelajaran"}
            />
            <InputText
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                errors={errors.nama_mapel}
                name={"nama_mapel"}
                title={"Nama Mata Pelajaran"}
            />
            <button className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-950 dark:text-white text-slate-200">
                Submit
            </button>
        </form>
    );
}

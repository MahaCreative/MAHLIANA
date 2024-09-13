import InputText from "@/Components/Form/InputText";
import Options from "@/Components/Form/Options";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Form({ setOpen }) {
    const { data, setData, post, errors, reset } = useForm({
        data_kelas_id: "",
        nis: "",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        foto_siswa: "",
    });
    const { dataKelas } = usePage().props;
    const submitHandler = (e) => {
        -e.preventDefault();
        post(route("data-siswa"), {
            onSuccess: (e) => {
                setOpen(false);
                reset();
                Swal.fire({
                    title: "Success",
                    text: "1 data siswa baru berhasil ditambahkan",
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
                        : "Data siswa gagal di tambahkan silahkan periksa kembali isian anda",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            },
        });
    };
    return (
        <form onSubmit={submitHandler}>
            <div className="flex w-full justify-between ga-3 items-center gap-3">
                <InputText
                    name={"nis"}
                    title={"Nomor Induk Siswa"}
                    errors={errors.nis}
                    value={data.nis}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    name={"nama"}
                    title={"Nama Lengkap"}
                    errors={errors.nama}
                    value={data.nama}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <div className="flex w-full justify-between ga-3 items-center gap-3">
                <InputText
                    name={"tanggal_lahir"}
                    type="date"
                    title={"Tanggal Lahir"}
                    errors={errors.tanggal_lahir}
                    value={data.tanggal_lahir}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    name={"foto_siswa"}
                    type="file"
                    title={"Foto Siswa"}
                    errors={errors.foto_siswa}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.files[0] })
                    }
                />
            </div>
            <div className="flex flex-col gap-3 my-2">
                <Options
                    errors={errors.jenis_kelamin}
                    onChange={(e) => setData({ ...data, [e.name]: e.value })}
                    name={"jenis_kelamin"}
                    title={"Silahkan Pilih Jenis Kelamin"}
                    value={""}
                >
                    <Options.Item value={""}>
                        Silahkan Pilih Jenis Kelamin
                    </Options.Item>
                    <Options.Item value={"laki-laki"}>Laki-Laki</Options.Item>
                    <Options.Item value={"perempuan"}>perempuan</Options.Item>
                </Options>
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
            </div>
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

import InputText from "@/Components/Form/InputText";
import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default function Login() {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    timer: 2000,
                    text: "Login Sukses",
                    icon: "success",
                    confirmButtonText: "Close",
                });
            },
            onError: (e) => {
                Swal.fire({
                    title: "Error",
                    timer: 2000,
                    text: e.message
                        ? e.message
                        : "Login gagal, silahkan periksa kembali isian anda",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            },
        });
    };
    return (
        <div className="w-full bg-slate-950 h-screen flex justify-center items-center">
            <form
                onSubmit={loginHandler}
                className="bg-white rounded-md  px-4 w-[95%] md:w-[70%] lg:w-1/2 py-12"
            >
                <h3>
                    Selamat datang di aplikasi Absensi SMK Juan Pattaro Pura
                </h3>

                <div className="flex flex-col gap-5">
                    <InputText
                        placeholder="email"
                        type="email"
                        name={"email"}
                        errors={errors.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        placeholder="password"
                        type="password"
                        name={"password"}
                        errors={errors.password}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <button className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-950 dark:text-white text-slate-200">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

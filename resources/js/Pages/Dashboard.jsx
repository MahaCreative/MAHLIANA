import CardComponent from "@/Components/Card/Card";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, Head, usePage } from "@inertiajs/react";
import { Group } from "@mui/icons-material";

export default function Dashboard({ auth, laravelVersion, phpVersion }) {
    const { countSiswa } = usePage().props;
    const { countKelas } = usePage().props;
    const { count_mapel } = usePage().props;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
                <CardComponent>
                    <div className="flex gap-3 justify-between items-center">
                        <div>
                            <CardComponent.Icon>
                                <Group fontSize="inherit" color="inherit" />
                            </CardComponent.Icon>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl md:text-3xl lg:text-4xl font-bold">
                                {countSiswa}
                            </p>
                            <h3>Jumlah Siswa</h3>
                        </div>
                    </div>
                </CardComponent>
                <CardComponent>
                    <div className="flex gap-3 justify-between items-center">
                        <div>
                            <CardComponent.Icon>
                                <Group fontSize="inherit" color="inherit" />
                            </CardComponent.Icon>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl md:text-3xl lg:text-4xl font-bold">
                                {countKelas}
                            </p>
                            <h3>Jumlah Kelas</h3>
                        </div>
                    </div>
                </CardComponent>
                <CardComponent>
                    <div className="flex gap-3 justify-between items-center">
                        <div>
                            <CardComponent.Icon>
                                <Group fontSize="inherit" color="inherit" />
                            </CardComponent.Icon>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl md:text-3xl lg:text-4xl font-bold">
                                {count_mapel}
                            </p>
                            <h3>Jumlah Mapel</h3>
                        </div>
                    </div>
                </CardComponent>
            </div>
            <div className="mt-6">
                <div className="text-center">
                    <h3 className="font-bold text-4xl">
                        Selamat Datang Di Sistem Absensi{" "}
                    </h3>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <AuthLayout children={page} title="Dashboard" />;

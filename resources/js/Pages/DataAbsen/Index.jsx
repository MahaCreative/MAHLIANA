import InputText from "@/Components/Form/InputText";
import Options from "@/Components/Form/Options";
import Modals from "@/Components/Modals/Modals";
import Table from "@/Components/Table/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const { data: dataAbsen, links, total, current_page } = props.dataAbsen;
    const [params, setParams] = useState({
        kelas: "",
        nis: "",
        mapel: "",
        kehadiran: "",
        absen: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const { dataKelas } = usePage().props;
    const { dataMapel } = usePage().props;
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("data-absen-siswa"),

                { ...query, page: query.search ? 1 : query.page },

                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }, 300),
        []
    );
    useEffect(() => reload(params), [params]);

    return (
        <>
            <div className="my-3">
                <div className="flex gap-3 items-center">
                    <div>Dashboard </div>
                    <div>/</div>
                    <h1>Data Absensi</h1>
                </div>
                <div className="mt-4">
                    <h3>Filter data absensi yang ingin anda lihat</h3>
                    <div>
                        <InputText
                            name={"nis"}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            placeholder="Nis Siswa"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full my-3">
                        <Options
                            onChange={(e) =>
                                setParams({ ...params, [e.name]: e.value })
                            }
                            name={"kelas"}
                            title={"Silahkan Pilih Data Kelas"}
                            value={""}
                        >
                            <Options.Item value={""}>
                                Silahkan Pilih Kelas
                            </Options.Item>
                            {dataKelas.map((item, key) => (
                                <Options.Item
                                    key={key + 1}
                                    value={item.nama_kelas}
                                >
                                    {item.nama_kelas}
                                </Options.Item>
                            ))}
                        </Options>
                        <Options
                            onChange={(e) =>
                                setParams({ ...params, [e.name]: e.value })
                            }
                            name={"mapel"}
                            title={"Silahkan Pilih Data Mapel"}
                            value={""}
                        >
                            <Options.Item value={""}>
                                Silahkan Pilih Mapel
                            </Options.Item>
                            {dataMapel.map((item, key) => (
                                <Options.Item
                                    key={key + 1}
                                    value={item.nama_mapel}
                                >
                                    {item.nama_mapel}
                                </Options.Item>
                            ))}
                        </Options>
                        <Options
                            onChange={(e) =>
                                setParams({ ...params, [e.name]: e.value })
                            }
                            name={"kehadiran"}
                            title={"Pilih Status Kehadiran"}
                            value={""}
                        >
                            <Options.Item value={""}>
                                Pilih Status Kehadiran
                            </Options.Item>
                            <Options.Item value={"alpha"}>alpha</Options.Item>
                            <Options.Item value={"hadir"}>hadir</Options.Item>
                        </Options>
                        <Options
                            onChange={(e) =>
                                setParams({ ...params, [e.name]: e.value })
                            }
                            name={"absen"}
                            title={"Pilih Status Masuk"}
                            value={""}
                        >
                            <Options.Item value={""}>
                                Pilih Status Masuk
                            </Options.Item>
                            <Options.Item value={"on time"}>
                                on time
                            </Options.Item>
                            <Options.Item value={"terlambat"}>
                                terlambat
                            </Options.Item>
                        </Options>
                    </div>
                    <div className="flex justify-between items-center gap-x-3">
                        <InputText
                            name={"dari_tanggal"}
                            type="date"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            placeholder="Nis Siswa"
                        />
                        <InputText
                            name={"sampai_tanggal"}
                            type="date"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            placeholder="Nis Siswa"
                        />
                    </div>
                </div>
                <Table
                    links={links}
                    current_page={current_page}
                    length={total}
                    setParams={setParams}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td className={"w-[100px]"}>No</Table.Td>
                            <Table.Td className={""}>Nama Kelas</Table.Td>
                            <Table.Td className={""}>Nama Mapel</Table.Td>
                            <Table.Td className={""}>Jam Masuk</Table.Td>
                            <Table.Td className={""}>Nis Siswa</Table.Td>
                            <Table.Td className={""}>Nama Siswa</Table.Td>
                            <Table.Td className={""}>Tanggal</Table.Td>
                            <Table.Td className={""}>Jam Absen</Table.Td>
                            <Table.Td className={""}>Status Kehadiran</Table.Td>
                            <Table.Td className={""}>Status Absen</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataAbsen.length > 0
                            ? dataAbsen.map((item, key) => (
                                  <Table.Tr key={key + 1}>
                                      <Table.Td>{key + 1}</Table.Td>
                                      <Table.Td>
                                          {item.jadwal.kelas.nama_kelas}
                                      </Table.Td>
                                      <Table.Td>
                                          {item.jadwal.mapel.nama_mapel}
                                      </Table.Td>

                                      <Table.Td>
                                          {item.jadwal.jam_masuk}
                                      </Table.Td>
                                      <Table.Td>{item.siswa.nis}</Table.Td>
                                      <Table.Td>{item.siswa.nama}</Table.Td>
                                      <Table.Td>{item.tanggal}</Table.Td>
                                      <Table.Td>{item.jam_absen}</Table.Td>
                                      <Table.Td>
                                          {item.status_kehadiaran}
                                      </Table.Td>
                                      <Table.Td>{item.status_absen}</Table.Td>
                                  </Table.Tr>
                              ))
                            : ""}
                    </Table.Tbody>
                </Table>
            </div>
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"Data Jadwal"} />;

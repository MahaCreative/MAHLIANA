import Modals from "@/Components/Modals/Modals";
import Table from "@/Components/Table/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import useConfirmationAlert from "@/Hooks/useConfirmationAlert";
import { router } from "@inertiajs/react";
import { debounce } from "@mui/material";

export default function Index(props) {
    const { data: dataJadwal, links, current_page, total } = props.dataJadwal;
    const [modal, setModalTambah] = useState(false);
    const { showConfirmationAlert } = useConfirmationAlert();
    const [params, setParams] = useState({ cari: "", page: "" });
    const handleDeleteClick = async (id) => {
        const confirmed = await showConfirmationAlert(
            "Apakah anda yakin ingin menghapus data ini ?",
            "anda tidak akan bisa mengembalikan data ketika telah dihapus"
        );
        if (confirmed) {
            router.delete(route("data-jadwal", { id: id }));
            // Perform the delete action
        } else {
            console.log("User canceled the deletion.");
        }
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("data-jadwal"),

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
            <Modals
                title={"Tambah Jadwal"}
                open={modal}
                setOpens={setModalTambah}
            >
                <Form setOpen={setModalTambah} />
            </Modals>
            <div className="my-3">
                <div className="flex gap-3 items-center">
                    <div>Dashboard </div>
                    <div>/</div>
                    <h1>Data Jadwal</h1>
                </div>
                <div>
                    <div className="my-2">
                        <button
                            onClick={() => setModalTambah(true)}
                            className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-800 dark:text-white text-slate-200"
                        >
                            Tambah Jadwal
                        </button>
                    </div>
                </div>
                <Table
                    current_page={current_page}
                    length={total}
                    links={links}
                    params={params}
                    setParams={setParams}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td className={"w-[100px]"}>No</Table.Td>
                            <Table.Td className={""}>Nama Kelas</Table.Td>
                            <Table.Td className={""}>Nama Mapel</Table.Td>
                            <Table.Td className={""}>Hari</Table.Td>
                            <Table.Td className={""}>Jam Masuk</Table.Td>

                            <Table.Td className={""}>Aksi</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataJadwal.length > 0
                            ? dataJadwal.map((item, key) => (
                                  <Table.Tr key={key + 1}>
                                      <Table.Td>{key + 1}</Table.Td>
                                      <Table.Td>
                                          {item.kelas.nama_kelas}
                                      </Table.Td>
                                      <Table.Td>
                                          {item.mapel.nama_mapel}
                                      </Table.Td>
                                      <Table.Td>{item.hari}</Table.Td>
                                      <Table.Td>{item.jam_masuk}</Table.Td>

                                      <Table.Td>
                                          <button
                                              className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 usetransition"
                                              onClick={() =>
                                                  handleDeleteClick(item.id)
                                              }
                                          >
                                              Delete
                                          </button>
                                      </Table.Td>
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

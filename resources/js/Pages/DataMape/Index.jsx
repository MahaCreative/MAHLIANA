import Modals from "@/Components/Modals/Modals";
import Table from "@/Components/Table/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState } from "react";
import Form from "./Form";
import useConfirmationAlert from "@/Hooks/useConfirmationAlert";
import { router } from "@inertiajs/react";

export default function Index(props) {
    const [params, setParamsa] = useState();
    const dataMapel = props.dataMapel;
    const [modal, setModalTambah] = useState(false);
    const { showConfirmationAlert } = useConfirmationAlert();

    const handleDeleteClick = async (id) => {
        const confirmed = await showConfirmationAlert(
            "Apakah anda yakin ingin menghapus data ini ?",
            "anda tidak akan bisa mengembalikan data ketika telah dihapus"
        );
        if (confirmed) {
            router.delete(route("data-mapel", { id: id }));
            // Perform the delete action
        } else {
        }
    };
    return (
        <>
            <Modals
                title={"Tambah Data Mata Pelajaran"}
                open={modal}
                setOpens={setModalTambah}
            >
                <Form setOpen={setModalTambah} />
            </Modals>
            <div className="my-3">
                <div className="flex gap-3 items-center">
                    <div>Dashboard </div>
                    <div>/</div>
                    <h1>Data Mata Pelajaran</h1>
                </div>
                <div>
                    <div className="my-2">
                        <button
                            onClick={() => setModalTambah(true)}
                            className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-800 dark:text-white text-slate-200"
                        >
                            Tambah Mata Pelajaran
                        </button>
                    </div>
                </div>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td className={"w-[100px]"}>No</Table.Td>
                            <Table.Td className={"w-[100px]"}>
                                Kode Mapel
                            </Table.Td>
                            <Table.Td className={""}>Mata Pelajaran</Table.Td>

                            <Table.Td className={""}>Aksi</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataMapel.length > 0
                            ? dataMapel.map((item, key) => (
                                  <Table.Tr key={key + 1}>
                                      <Table.Td>{key + 1}</Table.Td>
                                      <Table.Td>{item.kd_mapel}</Table.Td>
                                      <Table.Td>{item.nama_mapel}</Table.Td>

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

Index.layout = (page) => <AuthLayout children={page} title={"Data Mapel"} />;

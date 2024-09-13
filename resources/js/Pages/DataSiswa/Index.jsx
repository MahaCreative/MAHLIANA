import Modals from "@/Components/Modals/Modals";
import Table from "@/Components/Table/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import useConfirmationAlert from "@/Hooks/useConfirmationAlert";
import { router } from "@inertiajs/react";
import InputText from "@/Components/Form/InputText";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { debounce } from "@mui/material";
export default function Index(props) {
    const { data: dataSiswa, links, total, current_page } = props.dataSiswa;
    const [modal, setModalTambah] = useState(false);
    const { showConfirmationAlert } = useConfirmationAlert();
    const handleDeleteClick = async (id) => {
        const confirmed = await showConfirmationAlert(
            "Apakah anda yakin ingin menghapus data ini ?",
            "anda tidak akan bisa mengembalikan data ketika telah dihapus"
        );
        if (confirmed) {
            router.delete(route("data-siswa", { id: id }));
            // Perform the delete action
        } else {
            console.log("User canceled the deletion.");
        }
    };
    const [modalFoto, setModalFoto] = useState(false);
    const [model, setModel] = useState();
    const [addFoto, setAddFoto] = useState(false);
    const showFoto = (model) => {
        setModel(model);

        setModalFoto(true);
    };
    const [dataFoto, setDataFoto] = useState({ foto_siswa: [] });
    const renderPhotos = () => {
        return dataFoto.foto_siswa.map((file, index) => (
            <div key={index}>
                <img
                    src={URL.createObjectURL(file)} // Menggunakan URL.createObjectURL untuk menampilkan preview
                    alt={`preview-${index}`}
                    width={100}
                />
            </div>
        ));
    };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Mengambil file dari input
        setDataFoto((prevState) => ({
            ...prevState,
            foto_siswa: [...prevState.foto_siswa, ...files], // Menambahkan file baru ke array
        }));
    };

    const submitFoto = (e) => {
        e.preventDefault();
        router.post(
            "submit-foto",
            {
                id: model?.id,
                foto: dataFoto.foto_siswa,
            },
            {
                onError: (e) => {
                    Swal.fire({
                        title: "Error!",
                        text: e,
                        icon: "error",
                        confirmButtonText: "Close",
                    });
                    setDataFoto({ foto_siswa: [] });
                },
                onSuccess: () => {
                    Swal.fire({
                        title: "Success",
                        text: "Foto berhasil ditambahkan ke database",
                        icon: "success",
                        confirmButtonText: "Close",
                    });
                    setDataFoto({ foto_siswa: [] });
                    setAddFoto(false);
                },
            }
        );
    };

    const resetFoto = (id) => {
        router.delete(route("clear-foto", { id: id }), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Gambar berhasil di clear",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                setAddFoto(false);
            },
        });
    };
    const [params, setParams] = useState({ cari: "", kelas: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("data-siswa"),

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
                title={"Tambah Data Siswa"}
                open={modal}
                setOpens={setModalTambah}
            >
                <Form setOpen={setModalTambah} />
            </Modals>
            <Modals
                title={"Lihat List Foto "}
                open={modalFoto}
                setOpens={setModalFoto}
            >
                {model && (
                    <>
                        {model.koleksi_count > 0 ? (
                            <button
                                className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 usetransition"
                                onClick={() => resetFoto(model?.id)}
                            >
                                Reset Foto
                            </button>
                        ) : (
                            <button
                                className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 usetransition"
                                onClick={() => setAddFoto(true)}
                            >
                                Tambahkan Foto
                            </button>
                        )}
                        {addFoto && (
                            <>
                                <form onSubmit={submitFoto} className="my-3">
                                    <p>
                                        Untuk meningkatkan akurasi foto,
                                        tambahkan foto sebanyak 15 Gambar
                                        berekstensi JPG
                                    </p>
                                    <InputText
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 usetransition"
                                        >
                                            Tambahkan Foto
                                        </button>
                                        <button
                                            type="button"
                                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 usetransition"
                                            onClick={() => {
                                                setAddFoto(false);
                                                setDataFoto({ foto_siswa: [] });
                                            }}
                                        >
                                            Cancell
                                        </button>
                                    </div>
                                </form>
                                {dataFoto.foto_siswa.length > 0 && (
                                    <div className="grid grid-cols-4 gap-3">
                                        {renderPhotos()}
                                    </div>
                                )}
                            </>
                        )}
                        {model?.koleksi.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3 ">
                                {model?.koleksi.map((foto, key) => (
                                    <img src={"storage/" + foto.foto} alt="" />
                                ))}
                            </div>
                        ) : (
                            <p className="my-3">
                                Belum ada foto yang ditambahkan, siswa ini tidak
                                akan terbaca oleh sistem absensi. silahkan
                                tambahkan foto
                            </p>
                        )}
                    </>
                )}
            </Modals>
            <div className="my-3">
                <div className="flex gap-3 items-center">
                    <div>Dashboard </div>
                    <div>/</div>
                    <h1>Data Siswa</h1>
                </div>
                <div>
                    <div className="my-2">
                        <button
                            onClick={() => setModalTambah(true)}
                            className="py-2 px-3 rounded-md hover:opacity-75 usetransition bg-slate-400 dark:bg-slate-800 dark:text-white text-slate-200"
                        >
                            Tambah Siswa
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
                            <Table.Td className={"w-[100px]"}>Image</Table.Td>
                            <Table.Td className={""}>NIS</Table.Td>
                            <Table.Td className={""}>Nama Siswa</Table.Td>
                            <Table.Td className={""}>Kelas</Table.Td>
                            <Table.Td className={""}>Jenis Kelamin</Table.Td>
                            <Table.Td className={""}>Tanggal Lahir</Table.Td>
                            <Table.Td className={""}>Jumlah Foto</Table.Td>
                            <Table.Td className={""}>Aksi</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataSiswa.length > 0
                            ? dataSiswa.map((item, key) => (
                                  <Table.Tr key={key + 1}>
                                      <Table.Td>{key + 1}</Table.Td>
                                      <Table.Td>
                                          <img
                                              src={
                                                  "/storage/" + item.foto_siswa
                                              }
                                              className="w-[100px]"
                                          />
                                      </Table.Td>
                                      <Table.Td>{item.nis}</Table.Td>
                                      <Table.Td>{item.nama}</Table.Td>
                                      <Table.Td>
                                          {item.kelas.nama_kelas}
                                      </Table.Td>
                                      <Table.Td>{item.jenis_kelamin}</Table.Td>
                                      <Table.Td>{item.tanggal_lahir}</Table.Td>
                                      <Table.Td>
                                          {item.koleksi_count} Foto Ditambahkan
                                      </Table.Td>
                                      <Table.Td>
                                          <div className="flex gap-3 items-center">
                                              <button
                                                  className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 usetransition"
                                                  onClick={() => showFoto(item)}
                                              >
                                                  Lihat Foto
                                              </button>
                                              <button
                                                  className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 usetransition"
                                                  onClick={() =>
                                                      handleDeleteClick(item.id)
                                                  }
                                              >
                                                  Delete
                                              </button>
                                          </div>
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

Index.layout = (page) => <AuthLayout children={page} title={"Data Siswa"} />;

import AuthLayout from "@/Layouts/AuthLayout";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import ReactLoading from "react-loading";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import mqtt from "mqtt";
import Modals from "@/Components/Modals/Modals";
export default function Index() {
    const webcamRef = useRef(null);
    const [label, setLabel] = useState(false);
    const [loading, setLoading] = useState(false);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };
    const { dataSiswa } = usePage().props;
    useEffect(() => {
        let lab = [];
        dataSiswa.map((item) => lab.push(item.nis));
        setLabel(lab);
        console.log(dataSiswa);
    }, [dataSiswa]);
    const [screenshot, setScreenshot] = useState(null);
    const [prediksi, setPrediksi] = useState(false);
    const [datawajah, setDatawajah] = useState({ status_kenal: "", nama: "" });
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScreenshot(imageSrc);
        setPrediksi(true);
        setLoading(true);
    };
    useEffect(() => {
        async function loadModels() {
            try {
                await Promise.all([
                    faceapi.nets.ageGenderNet.loadFromUri("/models"),
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                ]);
            } catch (error) {
                console.error("Failed to load models:", error);
            }
        }
        loadModels();
    }, []);
    useEffect(() => {
        if (screenshot) {
            const img = new Image();
            img.src = screenshot;
            img.onload = async () => {
                const detections = await faceapi
                    .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                if (detections && detections.length > 0) {
                    const labeledDescriptors = await loadLabeledImages();
                    const faceMatcher = new faceapi.FaceMatcher(
                        labeledDescriptors,
                        0.6
                    );
                    const resizedDetections = faceapi.resizeResults(
                        detections,
                        { width: img.width, height: img.height }
                    );
                    const results = resizedDetections.map((d) =>
                        faceMatcher.findBestMatch(d.descriptor)
                    );
                    setLoading(false);
                    results.forEach((result) => {
                        if (result.label !== "unknown") {
                            setDatawajah({
                                status_kenal: true,
                                nama: result.label,
                            });
                            router.post(
                                route("kirim-absen"),
                                {
                                    nis: result.label,
                                },
                                {
                                    onError: (e) => {
                                        Swal.fire({
                                            title: (e.type = "error"
                                                ? "Upss Terlambat"
                                                : "Good On Time"),
                                            text: e.message,
                                            icon: (e.type = "error"
                                                ? "error"
                                                : "success"),
                                            confirmButtonText: "Close",
                                        });
                                    },
                                }
                            );
                            Swal.fire({
                                title: "Success",
                                text: `Selamat anda telah absen denan NIS ${result.label}`,
                                icon: "success",
                                confirmButtonText: "Close",
                            });
                        } else {
                            setDatawajah({
                                status_kenal: false,
                                nama: "unknow",
                            });
                            Swal.fire({
                                title: "Upps",
                                text: `Upss Wajah anda tidak dikenal, harap tidak menggunakan penutup wajah`,
                                icon: "error",
                                confirmButtonText: "Close",
                            });
                            router.get("response-wajah-tidak-dikenal");
                        }
                    });
                } else {
                    setDatawajah({ status_kenal: false, nama: "" });
                    router.get("response-tidak-ada-wajah");
                    Swal.fire({
                        title: "Errors",
                        text: `Tidak ada wajah yang ditemukan, silahkan berdiri tepat didepan kamera. dan jangan menggunakan penutup wajah`,
                        icon: "error",
                        confirmButtonText: "Close",
                    });
                }
                setLoading(false);
            };
        }
    }, [screenshot, prediksi]);

    const loadLabeledImages = async () => {
        return Promise.all(
            label.map(async (labels) => {
                const descriptions = [];
                for (let i = 1; i <= 3; i++) {
                    const img = await faceapi.fetchImage(
                        `/storage/${labels}/${i}.jpeg`
                    );
                    const detections = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();
                    if (detections && detections.descriptor) {
                        descriptions.push(detections.descriptor);
                    }
                }
                return new faceapi.LabeledFaceDescriptors(labels, descriptions);
            })
        );
    };

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Konfigurasi koneksi MQTT dengan WebSocket

        const client = mqtt.connect("ws://broker.hivemq.com:8883/mqtt");

        client.on("connect", () => {
            console.log("Connected to MQTT broker");
            // Berlangganan ke topik

            client.subscribe("test/topic", (err) => {
                if (err) {
                    console.error("Subscription error:", err);
                }
            });
        });

        client.on("message", (topic, message) => {
            // Pesan yang diterima
            console.log(`Received message: ${message.toString()}`);
            setMessage(message.toString());
        });

        client.on("error", (err) => {
            console.error("Connection error:", err);
        });

        // Bersihkan koneksi saat komponen di-unmount
        return () => {
            client.end();
        };
    }, []);

    const [timer, setTimer] = useState(5);
    const [modalTimer, setModalTimer] = useState(false);
    Echo.channel("getPicture").listen("GetPicture", (e) => {
        console.log(e);
        setModalTimer(true);
        if (modalTimer) {
            let time = timer;
            const interval = setInterval(() => {
                if (time > 0) {
                    setTimer((prevTime) => prevTime - 1); // Mengurangi timer setiap detik
                    time -= 1;
                } else {
                    clearInterval(interval); // Hentikan interval ketika timer mencapai 0
                }
            }, 1000); // Interval setiap 1 detik

            return () => clearInterval(interval); // Bersihkan interval jika komponen di-unmount atau modalTimer berubah
        }

        setModalTimer(false);
        setTimer(5);
        capture(); // Panggil fungsi capture
    });

    return (
        <div>
            <Modals open={modalTimer} setOpens={setModalTimer}>
                <h3 className="text-white font-bold text-center">
                    Pengambilan Gambar Dimulai
                </h3>
                <p className="text-center italic">
                    Berdiri tepat dihadapan kamera, foto akan dimulai 5 detik
                    dari sekarang
                </p>
                <h3 className="text-center text-7xl font-bold mt-6">{timer}</h3>
            </Modals>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700/50 z-50">
                    <ReactLoading
                        type={"spinningBubbles"}
                        color="#fff"
                        height={"20%"}
                        width={"20%"}
                    />
                </div>
            )}
            <div>
                <Webcam
                    audio={false}
                    height={280}
                    width={640}
                    videoConstraints={videoConstraints}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
            </div>
            <button
                onClick={capture}
                className="text-center bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500 text-red-500 py-2 px-4 active:scale-105 cursor-pointer justify-center"
            >
                Take Picture For Prediction
            </button>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Proses Absensi"} />
);

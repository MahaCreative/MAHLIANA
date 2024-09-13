import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});

const useConfirmationAlert = () => {
    const showConfirmationAlert = async (title, text) => {
        const result = await swalWithBootstrapButtons.fire({
            title: title || "Are you sure?",
            text: text || "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancell",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            await swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return false;
    };

    return { showConfirmationAlert };
};

export default useConfirmationAlert;

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const swalWithBootstrapButtons = MySwal.mixin({
  customClass: {
    confirmButton: "btn btn-success m-1",
    cancelButton: "btn btn-danger m-1"
  },
  buttonsStyling: false
});

export default swalWithBootstrapButtons;

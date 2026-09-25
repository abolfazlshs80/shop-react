import Swal from "sweetalert2";

const alertService = {
  success(message: string) {
    return Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },

  error(message: string) {
    return Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  },

  warning(message: string) {
    return Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  },

  info(message: string) {
    return Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "info",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};

export default alertService;
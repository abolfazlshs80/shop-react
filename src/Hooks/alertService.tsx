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

  async confirm(message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "انصراف",
      reverseButtons: true,
    });

    return result.isConfirmed;
  },
};

export default alertService;
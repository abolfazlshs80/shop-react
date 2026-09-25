import { ApiError } from "./api-client";

export function handleApiError(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return "خطای غیرمنتظره‌ای رخ داد.";
  }

  switch (error.statusCode) {
    case 400:
      return error.errors.join(", ") || error.message;
    case 401:
      return "نشست شما منقضی شده است. دوباره وارد شوید.";

    case 0:
      return "ادرس سرور درست نیست";
    case 403:
      return "شما اجازه دسترسی به این بخش را ندارید.";
    case 404:
      return "مورد درخواستی پیدا نشد.";
    case 500:
      return "خطایی در سرور رخ داده است.";
    default:
      return error.message;
  }
}

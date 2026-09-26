import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { LoginRequest, LoginResponse } from "./account.types";


export class AuthService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }


  login(
    request: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> {
   

    return this.api.post<LoginResponse,LoginRequest>(
      "/api/Account/Login",
      request,
    );
  }


}

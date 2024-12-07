import { AuthModel } from "../model/auth.model";
import { API_URL } from "../../../../constant/AppConstant";

export class AuthService {
  static async login(email: string, password: string): Promise<AuthModel> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "An error occurred");
    }

    return new AuthModel(data.email, data.userName, data.id, data.token);
  }

  static async signup(
    email: string,
    password: string,
    userName: string,
    userImage: File | null
  ): Promise<string> {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);

    if (userImage) {
      formData.append("userImage", userImage);
    }

    const response = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      body: formData, // Send as FormData
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "An error occurred");
      }
      return data.id;
    } else {
      const errorText = await response.text();
      throw new Error(`Unexpected response format: ${errorText}`);
    }
  }
  //Admin
  static async adminlogin(email: string, password: string): Promise<AuthModel> {
    const response = await fetch(`${API_URL}/auth/adminLogin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "An error occurred");
    }

    return new AuthModel(data.email, data.userName, data.id, data.token);
  }
}

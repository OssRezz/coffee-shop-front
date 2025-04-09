import { handleResponse } from "../utils/handleResponse";

export class HttpClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL;
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(res);
  }

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  }

  async put<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  }

  async delete<T>(url: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(res);
  }
}

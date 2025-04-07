export class HttpClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL;
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(
      `${this.baseURL}${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`${this.baseURL}${url}`);
    console.log(res.json);
    return await res.json();
  }

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async put<T>(url: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async delete<T>(url: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
}

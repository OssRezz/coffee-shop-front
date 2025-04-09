export async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const responseData = isJson ? await res.json() : null;

  if (!res.ok) {
    const error = {
      status: res.status,
      message: responseData?.message || "Request failed",
      data: responseData?.data || null,
      code: responseData?.code || res.status,
    };
    throw error;
  }

  return responseData;
}

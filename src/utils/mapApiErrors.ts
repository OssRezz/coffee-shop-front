interface ApiError {
  success: false;
  code: number;
  message: string;
  data: any;
}

export const mapApiErrors = (error: ApiError): string[] => {
  const messages: string[] = [];

  if (error.message) messages.push(error.message);

  if (Array.isArray(error.data)) {
    error.data.forEach((entry: any) => {
      if (entry.messages) {
        for (const key in entry.messages) {
          messages.push(...entry.messages[key]);
        }
      } else if (entry.field) {
        messages.push(`Invalid field: ${entry.field}`);
      }
    });
  }

  return messages.length > 0 ? messages : ["Ocurrió un error inesperado."];
};

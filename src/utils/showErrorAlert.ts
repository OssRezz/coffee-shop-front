import Swal from "sweetalert2";

/**
 * Muestra una alerta de error con una lista de mensajes.
 * @param title Título de la alerta
 * @param messages Arreglo de mensajes a mostrar
 */
export const showErrorAlert = (title: string, messages: string[]) => {
  Swal.fire({
    icon: "error",
    title,
    html: `<ul class="text-start">${messages
      .map((msg) => `<li>${msg}</li>`)
      .join("")}</ul>`,
    confirmButtonColor: "#212529",
  });
};

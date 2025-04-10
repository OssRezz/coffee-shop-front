import Swal from "sweetalert2";
import { showErrorAlert } from "../showErrorAlert";

jest.mock("sweetalert2");

describe("showErrorAlert", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe mostrar una alerta con los mensajes pasados", () => {
    const messages = ["Campo requerido", "Email inválido"];

    showErrorAlert("Error de validación", messages);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Error de validación",
      html: `<ul class="text-start"><li>Campo requerido</li><li>Email inválido</li></ul>`,
      confirmButtonColor: "#212529",
    });
  });

  it("debe llamar a Swal.fire solo una vez", () => {
    showErrorAlert("Título", ["Mensaje"]);
    expect(Swal.fire).toHaveBeenCalledTimes(1);
  });
});

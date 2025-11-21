import React from "react";
import { render } from "@testing-library/react";
import Contacto from "../Contacto"; 

describe("Contacto page", () => {
  it("muestra el botón de enviar", () => {
    const { getByRole } = render(<Contacto />);
    expect(getByRole("button")).toBeTruthy();
  });
});

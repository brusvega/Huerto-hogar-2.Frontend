import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

describe("Login page", () => {
  it("contiene campo de correo electrónico", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Buscar el campo por su etiqueta
    const emailInput = getByLabelText(/correo electrónico/i);
    expect(emailInput).toBeTruthy();
  });
});

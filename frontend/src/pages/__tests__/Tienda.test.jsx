import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "../../context/CarritoContext";
import Tienda from "../Tienda";

describe("Tienda page", () => {
  it("renderiza correctamente el título Tienda", () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <CarritoProvider>
          <Tienda />
        </CarritoProvider>
      </BrowserRouter>
    );

    // Verifica que haya al menos un elemento que diga "Tienda"
    const elementos = getAllByText(/tienda/i);
    expect(elementos.length).toBeGreaterThan(0);
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { CarritoProvider } from "../../context/CarritoContext"; 
import Carrito from "../Carrito"; 


describe("Carrito page", () => {
  it("muestra mensaje de carrito vacío", () => {
    const { getByText } = render(
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    );
    expect(getByText(/carrito está vacío/i)).toBeTruthy();
  });
});

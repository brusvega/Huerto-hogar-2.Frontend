import React from "react";
import { render } from "@testing-library/react";
import AdminProductos from "../admin/AdminProductos"; 


describe("AdminProductos page", () => {
  it("muestra el título o botón de agregar", () => {
    const { container } = render(<AdminProductos />);
    expect(container.textContent).toMatch(/agregar/i);
  });
});

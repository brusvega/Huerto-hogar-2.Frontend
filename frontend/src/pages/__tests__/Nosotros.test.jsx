import React from "react";
import { render } from "@testing-library/react";
import Nosotros from "../Nosotros";

describe("Nosotros page", () => {
  it("muestra texto sobre la misión o visión", () => {
    const { getAllByText } = render(<Nosotros />);
    const elementos = getAllByText(/misión/i);
    expect(elementos.length).toBeGreaterThan(0); // ✅ hay uno o más
  });
});

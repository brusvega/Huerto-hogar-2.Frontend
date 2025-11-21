import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer"; //  CORREGIDO


describe("Footer component", () => {
  it("muestra texto de derechos reservados", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain("Huerto Hogar");
  });
});

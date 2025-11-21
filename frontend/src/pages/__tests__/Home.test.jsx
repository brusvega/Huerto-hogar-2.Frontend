import React from "react";
import { render } from "@testing-library/react";
import Home from "../Home";

describe("Home page", () => {
  it("muestra el título de bienvenida", () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Huerto Hogar/i)).toBeTruthy();
  });
});

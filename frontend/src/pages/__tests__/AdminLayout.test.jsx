import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";

describe("AdminLayout", () => {
  it("muestra enlaces de navegación del panel admin", () => {
    const { getByText } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );

    // ✅ verifica que existan algunos links
    expect(getByText(/productos/i)).toBeTruthy();
  });
});

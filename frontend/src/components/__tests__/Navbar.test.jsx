import React from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";          // fuerza render sincrónico
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { CarritoProvider } from "../../context/CarritoContext";

describe("Navbar component", () => {
  it("se renderiza correctamente y muestra el texto 'Huerto Hogar'", () => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div);

    //  flushSync asegura que React renderice inmediatamente
    flushSync(() => {
      root.render(
        <BrowserRouter>
          <CarritoProvider>
            <Navbar />
          </CarritoProvider>
        </BrowserRouter>
      );
    });

    // Ahora sí, React ya terminó de renderizar
    expect(div.innerHTML).toContain("Huerto Hogar");
  });
});

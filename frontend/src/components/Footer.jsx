import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <p>© {new Date().getFullYear()} Huerto Hogar — Todos los derechos reservados.</p>
    </footer>
  );
}

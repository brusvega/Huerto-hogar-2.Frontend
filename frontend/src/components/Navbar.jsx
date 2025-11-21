import React from "react";
import { Link } from "react-router-dom";
import "../styles/style-buttons.css";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCarrito } from "../context/CarritoContext";


export default function Navbar() {
  const { carrito } = useCarrito();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        {/* Marca / Logo */}
        <Link className="navbar-brand fw-bold text-success" to="/">
          Huerto Hogar
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link to="/carrito" className="nav-link">
                🛒 ({totalItems})
              </Link>
            </li>
          </ul>

          {/* Botón cuenta */}
          <Link className="btn navbar-btn px-4" to="/login">
            Cuenta
          </Link>
        </div>
      </div>
    </nav>
  );
}
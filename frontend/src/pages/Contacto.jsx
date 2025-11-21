import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Contacto.css';

export default function Contacto() {
  return (
    <main className="contacto-container">
      <div className="contacto-wrapper">
        <h1 className="contacto-title">Contáctanos</h1>

        <form className="contacto-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" required></textarea>
          </div>

          <button type="submit" className="btn-enviar">Enviar</button>
        </form>
      </div>
    </main>
  );
}

import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import '../styles/Nosotros.css';

export default function Nosotros() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <main>

      {/* Sección principal */}
      <section className="nosotros-section container my-5">
        <h2 className="titulo-seccion text-center mb-4">Nosotros</h2>

        <div className="blog-container d-flex justify-content-center flex-wrap gap-4">

          {/* Tarjeta 1 */}
          <div
            className="equipo-card text-center"
            data-bs-toggle="modal"
            data-bs-target="#modalQuienesSomos"
          >
            <img
              src="/img/quienes_somos.jpg"
              alt="Quiénes Somos"
              className="img-fluid rounded"
            />
            <h4 className="mt-3">Quiénes Somos</h4>
            <p>Nuestra historia</p>
          </div>

          {/* Tarjeta 2 */}
          <div
            className="equipo-card text-center"
            data-bs-toggle="modal"
            data-bs-target="#modalMision"
          >
            <img
              src="/img/mision.jpg"
              alt="Misión"
              className="img-fluid rounded"
            />
            <h4 className="mt-3">Misión</h4>
            <p>Propósito</p>
          </div>

          {/* Tarjeta 3 */}
          <div
            className="equipo-card text-center"
            data-bs-toggle="modal"
            data-bs-target="#modalValores"
          >
            <img
              src="/img/vision.jpg"
              alt="Visión"
              className="img-fluid rounded"
            />
            <h4 className="mt-3">Visión</h4>
            <p>Metas</p>
          </div>
        </div>
      </section>

      {/* ======================= MODALES ======================= */}

      {/* QUIÉNES SOMOS */}
      <div className="modal fade" id="modalQuienesSomos" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-4">
            <div className="modal-header border-0">
              <h2 className="modal-title">Quiénes Somos</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p>
                Somos una empresa comprometida en ofrecer soluciones innovadoras para el hogar,
                combinando diseño moderno con tecnología eficiente.
              </p>
              <p>
                Nuestro objetivo es mejorar tu calidad de vida con productos accesibles y confiables.
                Desde nuestros inicios, trabajamos con pasión para brindar experiencias únicas
                y acompañar a nuestros clientes en cada etapa de sus proyectos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MISIÓN */}
      <div className="modal fade" id="modalMision" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-4">
            <div className="modal-header border-0">
              <h2 className="modal-title">Misión</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p>
                Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes,
                garantizando la frescura y el sabor en cada entrega.
              </p>
              <p>
                Promovemos una conexión más cercana entre consumidores y agricultores locales,
                apoyando prácticas sostenibles y fomentando una alimentación saludable en los hogares chilenos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VISIÓN */}
      <div className="modal fade" id="modalValores" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-4">
            <div className="modal-header border-0">
              <h2 className="modal-title">Visión</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p>
                Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en Chile,
                reconocida por su calidad, servicio al cliente y compromiso con la sostenibilidad.
              </p>
              <p>
                Aspiramos a expandirnos a nivel nacional e internacional,
                estableciendo un nuevo estándar en la distribución de productos agrícolas
                directos del productor al consumidor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

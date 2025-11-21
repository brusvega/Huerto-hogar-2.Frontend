import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Tienda.css";
import "../styles/Card-style.css";
import Categorias from "../components/Categorias";
import "../styles/ModalProducto.css";
import "../styles/style-buttons.css";
import { useCarrito } from "../context/CarritoContext";

// 🔥 Importamos el servicio que llama al backend
import { obtenerProductos } from "../services/productosService";

export default function Tienda() {
  //  Estados para el Modal
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // Estado donde guardaremos los productos reales del backend
  const [productos, setProductos] = useState([]);

  const { agregarProducto } = useCarrito();

  // Llamar al backend al cargar la página
  useEffect(() => {
    obtenerProductos().then((data) => {
      console.log("Productos desde backend:", data);
      setProductos(data);
    });
  }, []);

  // Funciones del modal
  const handleVerDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setCantidad(1);
    setShowModal(true);
  };

  const handleCerrarModal = () => setShowModal(false);

  const aumentarCantidad = () =>
    setCantidad((prev) => prev + 1);

  const disminuirCantidad = () =>
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main className="container my-5">
      <section className="nosotros-section text-center mb-5">
        <h2 className="titulo-seccion mb-4">Tienda</h2>
        <p>
          Bienvenido a la tienda de Huerto Hogar. Aquí encontrarás una variedad
          de productos naturales y sustentables para tu hogar y jardín.
        </p>
      </section>

      <main className="container my-5">
        <Categorias />
      </main>

      {/* PUBLICIDAD */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <img
          src="/img/publi.png"
          alt="publi 1"
          style={{ width: "500px", height: "auto" }}
        />

        <img
          src="/img/publi2.png"
          alt="publi 2"
          style={{ width: "380px", height: "auto" }}
        />
      </section>

      {/* 🔥🔥🔥 PRODUCTOS DESDE BACKEND 🔥🔥🔥 */}
      <section className="row g-4 mb-4">
        <h2 className="titulo-seccion mb-4">Todos los productos</h2>

        {productos.map((p) => (
          <div key={p.id} className="col-md-3 col-sm-6 col-12">
            <div className="card h-100">

              <img
                src={p.imagen}
                alt={p.nombre}
                className="card-img-top"
              />

              <div className="card-body d-flex flex-column">

                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
                <p className="fw-bold text-success">
                  ${p.precio?.toLocaleString()}
                </p>

                <div className="d-flex justify-content-between gap-2 mt-auto">
                  <button
                    className="btn add-to-cart flex-fill"
                    onClick={() =>
                      agregarProducto({
                        id: p.id,
                        nombre: p.nombre,
                        descripcion: p.descripcion,
                        precio: p.precio,
                        imagen: p.imagen,
                        cantidad: 1,
                      })
                    }
                  >
                    Añadir al carrito
                  </button>

                  <button
                    className="btn btn-ver-detalle flex-fill"
                    onClick={() =>
                      handleVerDetalle({
                        nombre: p.nombre,
                        descripcion: p.descripcion,
                        precio: p.precio,
                        imagen: p.imagen,
                      })
                    }
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 🔥 MODAL DE PRODUCTO 🔥 */}
      <Modal show={showModal} onHide={handleCerrarModal} centered>
        {productoSeleccionado && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoSeleccionado.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="img-fluid mb-3 rounded"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />

              <p>{productoSeleccionado.descripcion}</p>

              <p className="fw-bold text-success fs-5">
                ${productoSeleccionado.precio?.toLocaleString()}
              </p>

              {/* Contador */}
              <div className="d-flex justify-content-center align-items-center gap-3 my-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={disminuirCantidad}
                >
                  –
                </button>

                <span className="fs-5">{cantidad}</span>

                <button
                  className="btn btn-outline-secondary"
                  onClick={aumentarCantidad}
                >
                  +
                </button>
              </div>

              <Button
                variant="success"
                onClick={() => {
                  agregarProducto({
                    ...productoSeleccionado,
                    cantidad: cantidad,
                  });
                  handleCerrarModal();
                }}
              >
                Añadir {cantidad > 1 ? `${cantidad} unidades` : "1 unidad"} al carrito
              </Button>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </main>
  );
}

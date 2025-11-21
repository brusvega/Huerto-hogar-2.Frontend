import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Tienda.css';
import '../styles/Card-style.css';
import { useCarrito } from "../context/CarritoContext";

export default function Prodlacteos() {

    // 🔹 1. Estados primero
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    // 🔹 2. Funciones que usan esos estados
    const handleVerDetalle = (producto) => {
        setProductoSeleccionado(producto);
        setCantidad(1); // Reinicia cantidad al abrir modal
        setShowModal(true);
    };

    const handleCerrarModal = () => setShowModal(false);

    const aumentarCantidad = () => setCantidad((prev) => prev + 1);
    const disminuirCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

    const { agregarProducto } = useCarrito();

    // Aqui es donde se "ve" el producto esta creado como objeto
    const producto = {
        id: 1,
        nombre: "Naranjas Valencia",
        precio: 1000,
        img: "/img/p1.jpg",
        descripcion: "Fresca y 100% natural."
    };
    return (
        <main className="container my-5">
            <section className="nosotros-section text-center mb-5">
                <h2 className="titulo-seccion mb-4">Productos Lácteos</h2>
                <p>
                    Encuentra nuestra mejor más selecta variedad de lácteos orgánicos
                </p>
            </section>
            <section className="row g-4 mb-4">
                <div className="col-md-3 col-sm-6 col-12">
                    <div className="card h-100">
                        <img
                            src="/img/p9.jpg"
                            alt="producto9"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Leche Entera</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$2.500</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Leche Entera"
                                    data-precio="2500"
                                    data-imagen="/img/p9.jpg"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Leche Entera",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 2500,
                                            imagen: "/img/p9.jpg",
                                        })
                                    }
                                >
                                    Ver detalle
                                </button>

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
                                                    ${productoSeleccionado.precio.toLocaleString()}
                                                </p>

                                                {/* 🔹 Contador de cantidad */}
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

                                                {/* 🔹 Botón para agregar al carrito */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Tienda.css';
import '../styles/Card-style.css';
import Categorias from "../components/Categorias";
import '../styles/ModalProducto.css';
import '../styles/style-buttons.css';
import { useCarrito } from "../context/CarritoContext";

export default function Verduras() {
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
                <h2 className="titulo-seccion mb-4">Verduras</h2>
                <p>
                    Encuentra nuestra mejor más selecta variedad de verdura orgánica
                </p>
            </section>

            <section className="row g-4 mb-4">
                <div className="col-md-3 col-sm-6 col-12">
                    <div className="card h-100">
                        <img
                            src="/img/p4.jpg"
                            alt="producto4"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Zanahorias Orgánicas</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$1.000</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Zanahorias Orgánicas"
                                    data-precio="1000"
                                    data-imagen="/img/p4.jpg"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Zanahorias Orgánicas",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 1000,
                                            imagen: "/img/p4.jpg",
                                        })
                                    }
                                >
                                    Ver detalle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6 col-12">
                    <div className="card h-100">
                        <img
                            src="/img/p5.jpg"
                            alt="producto5"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Espinacas Frescas</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$800</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Espinacas Frescas"
                                    data-precio="800"
                                    data-imagen="/img/p5.jpg"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Espinacas Frescas",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 800,
                                            imagen: "/img/p5.jpg",
                                        })
                                    }
                                >
                                    Ver detalle
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6 col-12">
                    <div className="card h-100">
                        <img
                            src="/img/p6.png"
                            alt="producto6"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Pimientos Tricolores</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$1.000</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Pimientos Tricolores"
                                    data-precio="1000"
                                    data-imagen="/img/p6.png"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Pimientos Tricolores",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 1000,
                                            imagen: "/img/p6.jpg",
                                        })
                                    }
                                >
                                    Ver detalle
                                </button>
                            </div>

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
            </section>
        </main>
    );
}
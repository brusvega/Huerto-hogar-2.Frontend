import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Tienda.css';
import '../styles/Card-style.css';
import { useCarrito } from "../context/CarritoContext";

export default function Prodorganicos() {
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
                <h2 className="titulo-seccion mb-4">Productos Orgánicos</h2>
                <p>
                    Encuentra nuestra mejor más selecta variedad de productos orgánicos
                </p>
            </section>

            <section className="row g-4 mb-4">
                <div className="col-md-3 col-sm-6 col-12">
                    <div className="card h-100">
                        <img
                            src="/img/p7.jpg"
                            alt="producto7"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Miel Orgánica</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$3.500</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Miel Orgánica"
                                    data-precio="3500"
                                    data-imagen="/img/p7.jpg"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Miel Orgánica",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 3500,
                                            imagen: "/img/p7.jpg",
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
                            src="/img/p8.jpg"
                            alt="producto8"
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Quinua Orgánica</h5>
                            <p className="card-text">Fresca y 100% natural.</p>
                            <p className="fw-bold text-success">$3.000</p>

                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                <button
                                    className="btn add-to-cart flex-fill"
                                    data-nombre="Quinua Orgánica"
                                    data-precio="3000"
                                    data-imagen="/img/p8.jpg"
                                >
                                    Añadir al carrito
                                </button>

                                <button
                                    className="btn btn-ver-detalle flex-fill"
                                    onClick={() =>
                                        handleVerDetalle({
                                            nombre: "Quinua Orgánica",
                                            descripcion: "Dulces y jugosas.",
                                            precio: 3000,
                                            imagen: "/img/p8.jpg",
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
import React from "react";

import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Categorias.css';
import { Link } from "react-router-dom";


export default function CategoriasCarousel() {
    const categorias = [
        { nombre: "Frutas Frescas", imagen: "/img/cat-frutas.jpg", link: "/Frutas" },
        { nombre: "Verduras Orgánicas", imagen: "/img/cat-verduras.jpg", link: "/Verduras" },
        { nombre: "Productos Orgánicos", imagen: "/img/cat-organicos.jpg", link: "/Prodorganicos" },
        { nombre: "Productos Lácteos", imagen: "/img/cat-lacteos.jpg", link: "/Prodlacteos" },
    ];

    // 🔹 Control del slide actual
    const [activeIndex, setActiveIndex] = useState(0);

    const handleIndicatorClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <section className="container my-5">
            <h2 className="text-center mb-4">Categorías</h2>

            <div className="categorias-carousel">
                <div
                    className="categorias-track"
                    style={{ transform: `translateX(-${activeIndex * 50}%)` }}
                >
                    {categorias.map((cat, index) => (
                        <div className="categoria-slide" key={index}>
                            <div className="categoria-card">
                                <Link to={cat.link}>
                                    <img src={cat.imagen} alt={cat.nombre} className="categoria-img" />
                                    <div className="categoria-overlay">
                                        <h3 className="categoria-titulo">{cat.nombre}</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔹 Indicadores circulares */}
            <div className="carousel-indicators">
                {[0, 1].map((index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? "active" : ""}`}
                        onClick={() => handleIndicatorClick(index)}
                    ></span>
                ))}
            </div>

        </section>
    );
}
import React from "react";

export default function Home() {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center text-center min-vh-100 bg-light">
      <div className="container py-5">
        <h1 className="display-4 fw-bold mb-4 text-success">Huerto Hogar </h1>
        <p className="lead mb-5">Bienvenido a nuestra tienda de productos naturales y sustentables.</p>
        <a className="btn btn-success btn-lg" href="/productos">
          Ver productos
        </a>
      </div>
    </main>
  );
}

import { Link } from "react-router-dom";
import "../styles/pago.css";


export default function PagoExitoso() {
  return (
    <main className="pago-container success">
      <div className="pago-card">
        <h1>✅ ¡Pago Exitoso!</h1>
        <p>Gracias por tu compra en <strong>Huerto Hogar</strong>.</p>
        <p>Recibirás un correo con los detalles de tu pedido.</p>

        <Link to="/tienda" className="btn-volver">
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}

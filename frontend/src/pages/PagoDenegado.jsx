import { Link } from "react-router-dom";
import "../styles/pago.css";


export default function PagoDenegado() {
  return (
    <main className="pago-container error">
      <div className="pago-card">
        <h1>❌ Pago Denegado</h1>
        <p>Hubo un problema al procesar tu pago.</p>
        <p>Por favor, revisa tus datos e inténtalo nuevamente.</p>

        <Link to="/carrito" className="btn-volver">
          Volver al carrito
        </Link>
      </div>
    </main>
  );
}

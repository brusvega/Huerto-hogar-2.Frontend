import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Tienda from "./pages/Tienda";
import Carrito from "./pages/Carrito";
import Frutas from "./pages/Frutas";
import Verduras from "./pages/Verduras";
import Prodlacteos from "./pages/Prodlacteos";
import Prodorganicos from "./pages/Prodorganicos";

// Rutas de pagos
import FormularioPago from "./pages/FormularioPago";
import PagoExitoso from "./pages/PagoExitoso";
import PagoDenegado from "./pages/PagoDenegado";

// 🔹 Rutas Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

// 🔸 Importante: importar el CarritoProvider
import { CarritoProvider } from "./context/CarritoContext";

export default function App() {
  return (
    <BrowserRouter>
      {/* Envolvemos toda la app dentro del contexto del carrito */}
      <CarritoProvider>
        <Navbar />
        <Routes>
          {/* Rutas generales */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Rutas Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="productos" element={<AdminProductos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>

          {/* Rutas de productos */}
          <Route path="/frutas" element={<Frutas />} />
          <Route path="/verduras" element={<Verduras />} />
          <Route path="/prodlacteos" element={<Prodlacteos />} />
          <Route path="/prodorganicos" element={<Prodorganicos />} />

          {/* Rutas de pago */}
          <Route path="/pago" element={<FormularioPago />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-denegado" element={<PagoDenegado />} />
        </Routes>
        <Footer />
      </CarritoProvider>
    </BrowserRouter>
  );
}

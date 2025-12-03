import { createContext, useState, useEffect } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../api/productosApi";

export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  const agregarProducto = async (nuevo) => {
    const creado = await crearProducto(nuevo);
    setProductos([...productos, creado]);
  };

  const editarProducto = async (id, actualizado) => {
    const prod = await actualizarProducto(id, actualizado);
    setProductos(productos.map(p => p.id === id ? prod : p));
  };

  const borrarProducto = async (id) => {
    await eliminarProducto(id);
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      cargarProductos,
      agregarProducto,
      editarProducto,
      borrarProducto
    }}>
      {children}
    </ProductosContext.Provider>
  );
}

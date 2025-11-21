import React from "react";

import { Outlet, Link } from "react-router-dom";
import "../../styles/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Panel Admin</h2>
        <nav>
          <ul>
            <li><Link to="/admin/productos">Productos</Link></li>
            <li><Link to="/admin/usuarios">Usuarios</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

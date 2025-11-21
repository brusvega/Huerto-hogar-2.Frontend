// frontend/src/pages/FormularioPago.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const regionsData = {
  "Región Metropolitana": ["Santiago", "Providencia", "Las Condes"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante"],
};

export default function FormularioPago() {
  const navigate = useNavigate();

  // Datos del comprador / envío
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [infoEntrega, setInfoEntrega] = useState("");

  // Datos de tarjeta
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const comunasForRegion = region ? regionsData[region] || [] : [];

  const resetErrors = () => setErrors([]);

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const validarNumeroTarjeta = (num) => {
    const onlyDigits = num.replace(/\s+/g, "");
    return /^[0-9]{13,19}$/.test(onlyDigits);
  };

  const validarFecha = (mmYY) => {
    if (!/^\d{2}\/\d{2}$/.test(mmYY)) return false;
    const [mmStr, yyStr] = mmYY.split("/");
    const mm = parseInt(mmStr, 10);
    const yy = parseInt(yyStr, 10);
    if (mm < 1 || mm > 12) return false;
    // convertir a año completo asumiendo 20xx para 00-99
    const current = new Date();
    const currentYear2 = current.getFullYear() % 100;
    const currentMonth = current.getMonth() + 1;
    if (yy < currentYear2) return false;
    if (yy === currentYear2 && mm < currentMonth) return false;
    return true;
  };

  const validarCvv = (c) => /^\d{3,4}$/.test(c);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    const errs = [];

    // Validaciones requeridas
    if (!nombre.trim()) errs.push("El nombre es obligatorio.");
    if (!apellido.trim()) errs.push("El apellido es obligatorio.");
    if (!correo.trim() || !validarEmail(correo)) errs.push("Correo inválido.");
    if (!calle.trim()) errs.push("La dirección (calle) es obligatoria.");
    if (!region) errs.push("La región es obligatoria.");
    if (!comuna) errs.push("La comuna es obligatoria.");

    // Tarjeta
    if (!nombreTarjeta.trim()) errs.push("Nombre en la tarjeta es obligatorio.");
    if (!numeroTarjeta.trim() || !validarNumeroTarjeta(numeroTarjeta))
      errs.push("Número de tarjeta inválido (13-19 dígitos).");
    if (!fechaExpiracion.trim() || !validarFecha(fechaExpiracion))
      errs.push("Fecha de expiración inválida (MM/YY).");
    if (!cvv.trim() || !validarCvv(cvv)) errs.push("CVV inválido (3-4 dígitos).");

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    // Simulación de envío: en producción -> tokenizar tarjeta y enviar token
    setLoading(true);
    try {
      // Simular llamada a API (reemplazar con integración real)
      await new Promise((res) => setTimeout(res, 900));

      // Si todo ok -> redirigir a página de éxito
      navigate("/pago-exitoso", { replace: true });
    } catch (err) {
      console.error(err);
      navigate("/pago-denegado", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2>Formulario de Pago</h2>

      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h5 className="mt-3">Datos del comprador</h5>

            <Form.Group className="mb-2">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Apellido *</Form.Label>
              <Form.Control
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Correo electrónico *</Form.Label>
              <Form.Control
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Calle y número *</Form.Label>
              <Form.Control
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                placeholder="Calle 123"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Departamento (opcional)</Form.Label>
              <Form.Control
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                placeholder="Depto / Casa / Oficina"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Región *</Form.Label>
              <Form.Select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna("");
                }}
              >
                <option value="">-- Seleccione región --</option>
                {Object.keys(regionsData).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Comuna *</Form.Label>
              <Form.Select
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
              >
                <option value="">-- Seleccione comuna --</option>
                {comunasForRegion.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Información de entrega (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={infoEntrega}
                onChange={(e) => setInfoEntrega(e.target.value)}
                placeholder="Instrucciones para la entrega, piso, puerta, etc."
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <h5 className="mt-3">Datos de la tarjeta</h5>

            <Form.Group className="mb-2">
              <Form.Label>Nombre en la tarjeta *</Form.Label>
              <Form.Control
                value={nombreTarjeta}
                onChange={(e) => setNombreTarjeta(e.target.value)}
                placeholder="Como figura en la tarjeta"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Número de tarjeta *</Form.Label>
              <Form.Control
                value={numeroTarjeta}
                onChange={(e) =>
                  setNumeroTarjeta(e.target.value.replace(/[^\d\s]/g, ""))
                }
                placeholder="1234 5678 9012 3456"
              />
              <Form.Text className="text-muted">
                Para pruebas, no uses tarjetas reales en este entorno.
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Fecha expiración (MM/YY) *</Form.Label>
                  <Form.Control
                    value={fechaExpiracion}
                    onChange={(e) => setFechaExpiracion(e.target.value)}
                    placeholder="MM/YY"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>CVV *</Form.Label>
                  <Form.Control
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Pagar ahora"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

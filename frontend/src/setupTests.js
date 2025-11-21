import '@testing-library/jest-dom'

// Mock de Bootstrap JS para evitar errores con "document is not defined"
if (typeof globalThis.vi !== 'undefined') {
  globalThis.vi.mock('bootstrap/dist/js/bootstrap.bundle.min.js', () => ({}))
}

// Importa las funciones que quieres probar
import { Login } from '../src/components/login.js';
// Mock de las funciones de Firebase y Router
jest.mock('../src/lib/firebase.js', () => ({
  loginEmail: jest.fn(),
  loginGoogle: jest.fn(),
}));

jest.mock('../src/router/index.js', () => ({
  navigate: jest.fn(),
}));

describe('Login', () => {
  beforeEach(() => {
    // Crear un elemento div para simular el contenedor donde se agregará el Login
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Limpiar el contenido del body después de cada test
    document.body.innerHTML = '';
  });

  it('Debe renderizar el formulario de Login', () => {
    const loginElement = Login();
    const formElement = loginElement.querySelector('#loginForm');
    expect(formElement).toBeDefined();
  });

  it('Debe inicializar los inputs correctamente', () => {
    const loginElement = Login();
    const emailInput = loginElement.querySelector('.inputEmail');
    expect(emailInput.getAttribute('type')).toBe('email');
    const passwordInput = loginElement.querySelector('.inputPassword');
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  it('Debe renderizar el botón de registro', () => {
    const loginElement = Login();
    const registerButton = loginElement.querySelector('.btnregistrar');
    expect(registerButton.textContent).toContain('Crear cuenta');
  });
});

import {
  loginEmail,
  loginGoogle,
} from '../lib/firebase.js';

import { navigate } from '../router';

export const Login = () => {
  const homeSection = document.createElement('section');
  homeSection.className = 'section';

  // formulario para loguearse

  const formLogin = document.createElement('form');
  formLogin.id = 'loginForm';

  // input del email

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.className = 'inputEmail';
  inputEmail.placeholder = 'usuario@email.com';

  // input de la contraseña

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.className = 'inputPassword';
  inputPassword.placeholder = 'Contraseña';

  // Boton de login

  const buttonLogin = document.createElement('button');
  buttonLogin.type = 'submit';
  buttonLogin.className = 'btnLogin';
  buttonLogin.textContent = 'Ingresar';
  buttonLogin.class = 'BtnLogin';

  // Boton de login con google

  const buttonGoogle = document.createElement('button');
  buttonGoogle.type = 'submit';
  buttonGoogle.id = 'googleLogin';
  buttonGoogle.className = 'btnGoogle';
  buttonGoogle.textContent = 'Inicia Sesion con Google ';

  // Boton de crear cuenta

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'btnregistrar';
  buttonRegister.textContent = 'Crear cuenta';// Registrate

  // Mensaje de error

  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';

  // Agregando elementos al DOM

  homeSection.appendChild(formLogin);
  formLogin.appendChild(inputEmail);
  formLogin.appendChild(inputPassword);
  formLogin.appendChild(errorMessage);
  formLogin.appendChild(buttonLogin);
  formLogin.appendChild(buttonGoogle);
  formLogin.appendChild(buttonRegister);

  // Login con google

  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      errorMessage.textContent = 'Bienvenidos';
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage.textContent = 'Ventana de inicio de sesión cerrada';
      } else if (error.code) {
        errorMessage.textContent = 'Error al iniciar sesión con Google';
      }
    }
  });

  // Ir a Register;

  buttonRegister.addEventListener('click', () => navigate('/register'));

  // Login con email

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    // vconsole.log(email, password)
    try {
      await loginEmail(email, password);
      errorMessage.textContent = 'Bienvenidos';
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        errorMessage.textContent = 'La contraseña que ingresaste es incorrecta.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage.textContent = 'El correo electrónico que ingresaste no está conectado a una cuenta';
      } else {
        errorMessage.textContent = 'El correo electrónico o número de celular que ingresaste no está conectado a una cuenta.';
      }
    }
  });

  return homeSection;
};

import { navigate } from '../router';

import { createUser } from '../lib/firebase.js';

export const Register = () => {
  const registerSection = document.createElement('section');
  registerSection.className = 'section';
  const registerSectionTitle = document.createElement('h1');
  registerSectionTitle.textContent = 'Crea tu cuenta';

  // formulario para registrarse
  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';
  const textEmail = document.createElement('p');
  textEmail.id = 'textEmail';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.className = 'inputEmailc';
  inputEmail.placeholder = 'usuario@email.com';
  inputEmail.setAttribute('required', '');

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.className = 'inputPasswordc';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('required', '');

  const buttonRegister = document.createElement('button');
  buttonRegister.type = 'submit';
  buttonRegister.className = 'btnLogin';
  buttonRegister.textContent = 'Registrarse';

  const btnGoBack = document.createElement('button');
  btnGoBack.type = 'submit';
  btnGoBack.className = 'btnLogin';
  btnGoBack.textContent = 'Volver';

  // Mensaje de error
  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';

  registerSection.appendChild(formRegister);
  formRegister.appendChild(registerSectionTitle);
  formRegister.appendChild(inputEmail);
  formRegister.appendChild(inputPassword);
  formRegister.appendChild(errorMessage);
  formRegister.appendChild(buttonRegister);
  formRegister.appendChild(btnGoBack);

  // vista de los inputs
  // console.log(inputEmail.value, inputPassword.value)

  // Registro de usuario primera vez, auth con Firebase
  formRegister.addEventListener('submit', async (e) => { // submit pertenece form
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    // console.log(email, password)

    try {
      await createUser(email, password);
      errorMessage.textContent = 'Ingreso Exitoso';
      navigate('/home');
    } catch (error) {
      // console.log(error.message)
      // console.log(error.code)     // ayuda para el if msj error.code

      if (error.code === 'auth/email-already-in-use') {
        errorMessage.textContent = 'El correo electrónico ya está en uso por otra cuenta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage.textContent = 'El correo electrónico no es válido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (error.code) {
        errorMessage.textContent = 'Error al crear cuenta';
      }
    }
  });

  // Regresar a login
  btnGoBack.addEventListener('click', () => navigate('/'));

  return registerSection;
};

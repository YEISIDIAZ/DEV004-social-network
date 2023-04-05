import { navigate } from '../router';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { auth } from '../lib/firebase.js';

export const Register = () => {
  const registerSection = document.createElement('section');
  const registerSectionTitle = document.createElement('h1');
  registerSectionTitle.textContent = 'Crea tu cuenta';

  // formulario para registrarse
  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';

  const textEmail = document.createElement('p');
  textEmail.className = 'form';
  textEmail.id = 'textEmail';
  textEmail.textContent = 'Correo electronico';

  const inputEmail = document.createElement('input');
  inputEmail.className = 'InputEmail';
  inputEmail.id = 'userEmail';
  inputEmail.type = 'email';
  inputEmail.placeholder = 'usuario@email.com';
  inputEmail.setAttribute('required', '');

  const textPassword = document.createElement('p');
  textPassword.className = 'InputPass';
  textPassword.id = 'textPassword';
  textPassword.textContent = 'Contraseña';

  const inputPassword = document.createElement('input');
  inputPassword.className = 'InputEmail';
  inputPassword.id = 'userPassword';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('required', '');

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'BtnReg';
  buttonRegister.type = 'submit';
  buttonRegister.textContent = 'Registrarse';

  const btnGoBack = document.createElement('button');
  btnGoBack.className = 'BtnReg';
  buttonRegister.type = 'submit';
  btnGoBack.textContent = 'Volver';

  const saltolinea = document.createElement('br');
  


  registerSection.appendChild(registerSectionTitle);
  registerSection.appendChild(formRegister);
  formRegister.appendChild(inputEmail);
  formRegister.appendChild(inputPassword);
  formRegister.appendChild(saltolinea);
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
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      alert('Ingreso con exito');
      navigate('/home');
    } catch (error) {
      // console.log(error.message)
      // console.log(error.code)     // ayuda para el if msj error.code

      if (error.code === 'auth/email-already-in-use') {
        alert('Correo ya registrado');
      } else if (error.code === 'auth/invalid-email') {
        alert('Correo invalido');
      } else if (error.code === 'auth/weak-password') {
        alert('Contraseña debil');
      } else if (error.code) {
        alert('Algo salio mal');
      }
    }
  });

  // Regresar a login
  btnGoBack.addEventListener('click', () => navigate('/'));

  return registerSection;
};

import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { auth } from '../lib/firebase.js';
import { navigate } from '../router';

export const Login = () => {
  const homeSection = document.createElement('section');
  homeSection.className = 'section';

  // const homeSectionTitle = document.createElement('p');
  // homeSectionTitle.id = 'comment1';
  // // homeSectionTitle.textContent = '¿Olvidaste tu contraseña?';
  // const homeSectionSubTitle = document.createElement('p');
  // homeSectionSubTitle.id = 'comment2';
  // homeSectionSubTitle.textContent = 'Registrate';

  // boton crear cuenta con google

const buttonGoogle = document.createElement('button');
  // buttonGoogle.className = 'btn';
  buttonGoogle.type = 'submit';
  buttonGoogle.id = 'googleLogin';
  buttonGoogle.textContent = 'Inicia Sesion con Google ';

  // boton crear cuenta con correo y contrasena

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'btnregistrar';
  // buttonRegister.type = 'button';
  buttonRegister.textContent = 'Crear cuenta';// Registrate
  // const line = document.createElement('hr');

  // formulario para loguearse

  const formLogin = document.createElement('form');
  formLogin.id = 'loginForm';
  const textEmail = document.createElement('p');
  textEmail.id = 'textEmail';

  // textEmail.textContent = 'Correo electronico';

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'usuario@email.com';
  const textPassword = document.createElement('p');
  textPassword.id = 'textPassword';

  // textPassword.textContent = 'Contraseña';

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';

  const buttonLogin = document.createElement('button');
  buttonLogin.type = 'submit';
  buttonLogin.textContent = 'Ingresar';
  buttonLogin.className = 'BtnLogin'

  homeSection.appendChild(formLogin);
 
  // homeSection.appendChild(homeSectionTitle);

  // homeSection.appendChild(homeSectionSubTitle);

  homeSection.appendChild(buttonRegister);

  // homeSection.appendChild(line);

  formLogin.appendChild(textEmail);
  formLogin.appendChild(inputEmail);
  formLogin.appendChild(textPassword);
  formLogin.appendChild(inputPassword);
  formLogin.appendChild(buttonLogin);
  formLogin.appendChild(buttonGoogle);

  // Login con google

  buttonGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider(); // instancia es una clase q va a devolver un objeto

    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      alert('Bienvenida/o ' + credentials.user.displayName);
      // no se usa alert se remplaza document.getElementById("message")
      // .innerText = "La tarea se ha completado.";
      navigate('/home');
    } catch (error) {
      
      if (error.code === 'auth/popup-closed-by-user') {
        alert('Ventana cerrada por el usuario');
      } else if (error.code) {
        alert('Algo salio mal');
      }
    }
    // falta mas if con alerts??
  });

  /* Ir a Register; */

  buttonRegister.addEventListener('click', () => navigate('/register'));

  // Login con email

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(credentials);
      alert('Bienvenida/o ' + credentials.user.email);
      navigate('/home');
    } catch (error) {
      // console.log(error)
      if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado');
      } else {
        alert('Algo salio mal');
      }
    }
  });

  // const buttonContainer = document.createElement('div');
  // buttonContainer.style.display = 'flex';
  // buttonContainer.style.flexWrap = 'wrap';
  // buttonContainer.style.justifyContent = 'space-between';
  // buttonContainer.style.alignItems = 'center'; // añadimos este estilo para centrar verticalmente los botones

  // // buttonLogin.style.width = '150px';
  // buttonGoogle.style.width = '210px';

  // // buttonLogin.style.marginRight = '10px';

  // // buttonContainer.appendChild(buttonLogin);
  // buttonContainer.appendChild(buttonGoogle);
  // homeSection.appendChild(buttonContainer);

  // homeSection.appendChild(buttonRegister);

  return homeSection;
};
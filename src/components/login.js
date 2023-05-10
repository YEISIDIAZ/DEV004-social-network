
import {
  loginEmail,
  loginGoogle,
} from '../lib/firebase.js';



import { navigate } from '../router';




export const Login = () => {

  const homeSection = document.createElement('section'); // se crea el contenedor principal
  homeSection.className = 'section';// se le asigna una clase

  const logo = document.createElement('img'); // se crea el logo
  logo.src = "img/logo_sz.png" // se le asigna una ruta
  logo.className = 'logo';// se le asigna una clase

  const about = document.createElement('h5');  // se crea el parrafo
  about.textContent = '¿Quieres conocer el look más reciente de tu artista preferido? ¿O tal vez enterarte de los secretos detrás de su última película? ¡Aquí lo encontrarás todo! Únete a nuestra comunidad de amantes de la farándula y no te pierdas ni un solo detalle.'
  about.className = 'about';
  
  const errorMessageEl = document.createElement('p');
  errorMessageEl.className = 'error-message';

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
  buttonLogin.textContent = 'Iniciar Sesion';
  buttonLogin.class = 'BtnLogin';

  // Boton de login con google

  const buttonGoogle = document.createElement('button');
  buttonGoogle.type = 'submit';
  buttonGoogle.id = 'googleLogin';
  buttonGoogle.className = 'btnGoogle';
  buttonGoogle.textContent = 'Ingresar con Google';

  // Boton de crear cuenta o registrar usuario 

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'btnregistrar';
  buttonRegister.textContent = 'Crear cuenta';// Registrate

  // Agregando elementos al DOM
 
  homeSection.appendChild(formLogin);
  formLogin.appendChild(logo);
  formLogin.appendChild(about);
  formLogin.appendChild(inputEmail);
  formLogin.appendChild(inputPassword);
  formLogin.appendChild(errorMessageEl);
  formLogin.appendChild(buttonLogin);
  formLogin.appendChild(buttonGoogle);
  formLogin.appendChild(buttonRegister);


buttonGoogle.addEventListener('click', async (e) => {

  e.preventDefault();//  cancela evento por defecto q es refrescar la pagina

  try {
    const credentials = await loginGoogle();
    //  console.log('cred', credentials)
    errorMessageEl.textContent = 'Bienvenidos';
    navigate('/home');
  } catch (error) {
    //  console.log(error)
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessageEl.textContent = 'Ventana de inicio de sesión cerrada';
    } else if (error.code) {
      errorMessageEl.textContent = 'Error al iniciar sesión con Google';
    }
  }
});

// Ir a Register;

  buttonRegister.addEventListener('click', () => navigate('/register'));

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    //  console.log(email, password)
    try {
      const credentials = await loginEmail(email, password);
      //  console.log('cred', credentials)
      errorMessageEl.textContent = 'Bienvenidos';
      navigate('/home');
    } catch (error) {
      //  console.log(error)
      if (error.code === 'auth/wrong-password') {
        errorMessageEl.textContent = 'La contraseña que ingresaste es incorrecta.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessageEl.textContent = 'El correo electrónico que ingresaste no está conectado a una cuenta';
      } else {
        errorMessageEl.textContent = 'El correo electrónico o número de celular que ingresaste no está conectado a una cuenta.';
      }
    }
  });

  return homeSection;
};

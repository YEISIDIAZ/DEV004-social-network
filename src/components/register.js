import { navigate } from '../router';
import { createUser } from '../lib/firebase.js';

export const Register = () => {
  
  const registerSection = document.createElement('section');
  registerSection.className = 'section';


  const logo = document.createElement('img');
  logo.src = "img/logo_sz.png"
  logo.className = 'logo';
    const about = document.createElement('h5');
  about.textContent = '¿Quieres conocer el look más reciente de tu artista preferido? ¿O tal vez enterarte de los secretos detrás de su última película? ¡Aquí lo encontrarás todo! Únete a nuestra comunidad de amantes de la farándula y no te pierdas ni un solo detalle.'
  about.className = 'about';
  const registerSectionTitle = document.createElement('h1');
  registerSectionTitle.textContent = 'Crea tu cuenta';

  const formRegister = document.createElement('form');
  formRegister.id = 'loginForm';

  const textEmail = document.createElement('p');
  textEmail.id = 'textEmail';


  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.className = 'inputEmail';
  inputEmail.placeholder = 'usuario@email.com';
  inputEmail.setAttribute('required', '');

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.className = 'inputPassword';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('required', '');

  const buttonRegister = document.createElement('button');
  buttonRegister.type = 'submit';
  buttonRegister.className = 'btnLogin';
  buttonRegister.textContent = 'Registrarse';

  const btnGoBack = document.createElement('button');
  btnGoBack.className = 'btnLogin';
  btnGoBack.textContent = 'Volver';
  btnGoBack.classList.add('btnVolver');

  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';

  registerSection.appendChild(formRegister);
  formRegister.appendChild(logo);
  formRegister.appendChild(about);
  formRegister.appendChild(registerSectionTitle);
  formRegister.appendChild(inputEmail);
  formRegister.appendChild(inputPassword);
  formRegister.appendChild(errorMessage);
  formRegister.appendChild(buttonRegister);
  formRegister.appendChild(btnGoBack);

  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    try {
      await createUser(email, password);
      errorMessage.textContent = 'Ingreso Exitoso';
      navigate('/home');

    } catch (error) {
      const errorCodeAlreadyInUse = 'auth/email-already-in-use';
      const errorCodeInvalidEmail = 'auth/invalid-email';
      const errorCodeWeakPassword = 'auth/weak-password';
      if (error.code === errorCodeAlreadyInUse) {
        errorMessage.textContent = 'El correo electrónico ya está en uso por otra cuenta.';
      } else if (error.code === errorCodeInvalidEmail) {
        errorMessage.textContent = 'El correo electrónico no es válido.';
      } else if (error.code === errorCodeWeakPassword) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      } else {
        errorMessage.textContent = 'Error al crear cuenta.';
      }
    }
  });
  
  btnGoBack.addEventListener('click', () => navigate('/'));
  return registerSection;
};

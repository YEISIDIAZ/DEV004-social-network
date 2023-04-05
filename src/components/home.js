import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

import { auth } from '../lib/firebase.js';

import { navigate } from '../router';

export const Home = () => {
  const div = document.createElement('div');
  const sectionTitle = document.createElement('h1');
  sectionTitle.textContent = 'PUBLICACIONES';
  const contentDiv = document.createElement('p');
  contentDiv.textContent = 'Esto es una prueba';
  const logOut = document.createElement('button');
  logOut.textContent = 'Cerrar Sesion';
  div.appendChild(sectionTitle);
  div.appendChild(contentDiv);
  div.appendChild(logOut);
  // Regresar a login
  logOut.addEventListener('click', async () => {
    await signOut(auth);
    navigate('/');
  });
  return div;
};

// Este es el punto de entrada de tu aplicacion
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'; // ver authStateChanged
import { auth } from './lib/firebase.js';  // ver authStateChanged
import { Home } from './components/home.js';
import { Login } from './components/login.js';
import { Register } from './components/register.js';
import { myFunction } from './lib/index.js';
import { addRoutes, navigate } from './router/index.js';
import './lib/firebase.js';

myFunction();

addRoutes({
  '/': Login,
  '/register': Register,
  '/login': Login,
  '/home': Home,
});

// ejecuta una función tan pronto como una página haya cargado
/* window.onload = () => {
    navigate(window.location.pathname);
}; */
// Add event listener to handle back/forward button
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

// Add event listener to handle page load
window.addEventListener('load', () => {
  navigate(window.location.pathname);
});

onAuthStateChanged(auth, async (user) => {
  console.log(user);
});

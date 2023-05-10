import { Home } from './components/home.js';
import { Login } from './components/login.js';
import { Register } from './components/register.js';
import { myFunction } from './lib/index.js';
import { addRoutes, navigate } from './router/index.js';


myFunction();

addRoutes({
  '/': Login,  // si no hay ruta, redirige a login
  '/register': Register, // si no hay ruta, redirige a login
  '/login': Login,// si no hay ruta, redirige a login
  '/home': Home,// si no hay ruta, redirige a login
});


window.addEventListener('popstate', () => { // cuando se presiona el boton de atras
  navigate(window.location.pathname); // redirige a la ruta anterior
});


window.addEventListener('load', () => { // cuando se carga la pagina
  navigate(window.location.pathname);  // redirige a la ruta actual
});


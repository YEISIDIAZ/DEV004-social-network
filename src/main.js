import { Home } from './components/home.js';
import { Login } from './components/login.js';
import { Register } from './components/register.js';
import { myFunction } from './lib/index.js';
import { addRoutes, navigate } from './router/index.js';

// Llamada a la función `myFunction` antes de configurar las rutas del router
myFunction();

addRoutes({
  '/': Login,
  '/register': Register,
  '/login': Login,
  '/home': Home,
});

window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

window.addEventListener('load', () => {
  navigate(window.location.pathname);
});

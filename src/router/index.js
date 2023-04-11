const ROUTES = {};

export const navigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  window.history.pushState({}, path, window.location.origin + pathname);
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((accumulator, currentRoute) => {
    // seria buena agregar validaciones
    accumulator[currentRoute] = routes[currentRoute];
    return accumulator;
  }, ROUTES);
};

// importamos la funcion que vamos a testear

import { Login } from '../src/components/login.js';
import { addRoutes } from '../src/router/index.js';
import { Register } from '../src/components/register.js';
import { Home } from '../src/components/home.js';
import {
  loginEmail,
  loginGoogle,
  createUser,
  logOutUser,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js', () => ({
  loginEmail: jest.fn(),
}));

// evita problemas con alert
// jest.spyOn(window, 'alert').mockImplementation(() => { });
global.alert = () => { };

// ARCHIVO login.js
describe('login', () => {
  it('si usuario y contrasena son correctas lleva a home', (done) => {
    // const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))
    // donde se inserta la vista de Login
    document.body.innerHTML = '<main id="root"></main>';
    // donde estan las rutas
    addRoutes({
      '/home': () => { },
    });
    // mock del metodo
    // mock del metodo
    loginEmail.mockResolvedValueOnce({ user: { email: 'usuario@mail.com' } });
    // vista de Login
    const section = Login();
    // inputs de formulario completados
    section.querySelector('#email').value = 'usuario@mail.com';
    section.querySelector('#password').value = 'usu123';
    // envio de formulario
    section.querySelector('#loginForm').dispatchEvent(new Event('submit'));
    // pasos completados debe dirigirnos a home
    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);
  });

  it('si el usuario de google es correcto lleva a home', (done) => {
    document.body.innerHTML = '<main id="root"></main>';
    addRoutes({

      '/home': () => { },
    });

    // mock del metodo
    loginGoogle.mockResolvedValueOnce({ user: { email: 'usuario@gmail.com' } });

    /* para mockear un constructor
    firebaseFn.GoogleAuthProvider = jest.fn().mockImplementation(() => {
      return { GoogleAuthProvider: GoogleAuthProvider };
    }); */

    const section = Login();

    section.querySelector('#googleLogin').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);
  });

  it('el boton register lleva a /register', (done) => {
    document.body.innerHTML = '<main id="root"></main>';
    addRoutes({

      '/register': () => { },
    });

    const section = Login();

    section.querySelector('#btnRegister').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/register');

      done();
    }, 0);
  });
});

/* ARCHIVO register.js */
describe('register', () => {
  it('usuario al registrarse lo lleva a home', (done) => {
    // const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))
    document.body.innerHTML = '<main id="root"></main>';
    addRoutes({

      '/home': () => { },
    });
    // REVISAR MOCK DE CREATE USER, SE SUPONE Q ES UN ESPACIO VACIO???
    // Mock del método
    createUser.mockResolvedValueOnce({ user: { email: 'usu@mail.com' } });

    const section = Register();

    section.querySelector('#userEmail').value = 'usu@mail.com';
    section.querySelector('#userPassword').value = 'usu1234';

    section.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);
  });

  it('el boton volver lleva a pagina principal', (done) => {
    document.body.innerHTML = '<main id="root"></main>';
    addRoutes({

      '/': () => { },
    });

    const section = Register();

    section.querySelector('#btnBack').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/');

      done();
    }, 0);
  });
});

/* ARCHIVO home.js */
describe('home', () => {
  it('Boton cerrar sesion lleva a pagina principal', (done) => {
    document.body.innerHTML = '<main id="root"></main>';
    addRoutes({

      '/': () => { },
    });
    // REVISAR MOCK DE CREATE USER, SE SUPONE Q ES UN ESPACIO VACIO???
    // Mock del método
    logOutUser.mockResolvedValueOnce();

    const section = Home();
    section.querySelector('#btnlogOut').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/');

      done();
    }, 0);
  });
});

//  import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
//  import { QuerySnapshot, doc } from 'firebase/firestore';
/* eslint-disable no-alert */

import {
  logOutUser,
  saveTextContent,
  deleteContent,
  onGetContent,
  getContent,
  updateContent,
  auth,
} from '../lib/firebase.js';
import { navigate } from '../router';

export const Home = () => {
  
  const div = document.createElement('div');
  div.id = 'divHome';


  const logo = document.createElement('img');
  logo.src = "img/logo_sz.png"
  logo.className = 'logo2';

  const headerHome = document.createElement('header');
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'Publicaciones';
  sectionTitle.id = 'tittle';

  const logOut = document.createElement('button');
  logOut.className = 'btnLogOut';
  logOut.textContent = 'Cerrar Sesión';
  logOut.id = 'btnlogOut';

  //  formulario para crear contenido
  const formCreate = document.createElement('form');
  formCreate.id = 'loginCreate';

  const inputText = document.createElement('textarea');
  inputText.classList.add('textArea');//  inputText.className='textArea'
  inputText.id = 'inputText';
     const user = auth.currentUser;
    console.log (user)
    const name = user ? (user.displayName || '.') : '.';
    inputText.placeholder = `¿ Qué está pasando ${name} en el mundo de ShowZone ?`;
    inputText.setAttribute('rows', '2');
    inputText.setAttribute('maxLength', '450');
    inputText.setAttribute('required', '');

  const createPub = document.createElement('button');
  createPub.textContent = 'Crear';
  createPub.id = 'btnCreate';
  const ul = document.createElement('ul');// revisar    
  ul.id = 'muro';

  const navFooter = document.createElement('nav');
  const contentNav = document.createElement('p');


  div.appendChild(headerHome);
  headerHome.appendChild(logo);
  headerHome.appendChild(sectionTitle);
  headerHome.appendChild(logOut);
  div.appendChild(formCreate);
  formCreate.appendChild(inputText);
  formCreate.appendChild(createPub);
  div.appendChild(ul);
  div.appendChild(navFooter);
  navFooter.appendChild(contentNav);

  //  Regresar a login
  logOut.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await logOutUser();
      //  console.log('usuario logout')
      navigate('/');
    } catch (error) {
      if (error.code) {
        alert('Algo salió mal');
      }
    }
  });

  //  form crear contenido

  formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();
    //  console.log("enviar form"); // aux para test
    const content = document.getElementsByClassName('textArea')[0];
    //  console.log(content) //formCreate.textArea

    if (content.value.trim() === '') {
      alert('No válido, post vacío');
      return false;
    }
    saveTextContent(content.value);
    formCreate.reset();
  });

  //  listar contenido revisar
  onGetContent((querySnapshot) => {
    //  console.log(querySnapshot)
    ul.innerHTML = '';

    querySnapshot.forEach((doc) => {


       //*********************************** 

       // Dentro del bucle forEach para crear cada publicación...

// const likeBtn = document.createElement('button');
// likeBtn.textContent = 'Me gusta';
// likeBtn.id = `like-${doc.id}`; // Identificador único para cada botón de Me gusta
// likeBtn.classList.add('like-btn'); // Clase CSS para seleccionar fácilmente el botón de Me gusta


// likeBtn.addEventListener('click', async () => {
//   const postId = doc.id;
//   const postRef = db.collection('publications').doc(postId);
//   const currentUser = auth.currentUser;

//   try {
//     const postSnapshot = await postRef.get();
//     const postData = postSnapshot.data();

//     if (!postData.likes) postData.likes = []; // Si aún no hay likes, inicializa el campo

//     const hasUserLiked = postData.likes.includes(currentUser.uid);

//     if (hasUserLiked) {
//       // Si el usuario ya le dio Me gusta
//       postData.likes = postData.likes.filter((uid) => uid !== currentUser.uid);
//       likeBtn.classList.remove('liked');
//     } else {
//       // Si el usuario aún no ha dado Me gusta
//       postData.likes.push(currentUser.uid);
//       likeBtn.classList.add('liked');
//     }

//     await postRef.update({ likes: postData.likes });

//   } catch (error) {
//     console.error(error);
//   }
// });


//*******************************************


      //  console.log(doc.data())
      // const renderContent = ((doc) => {
      const li = document.createElement('li');
      const name = document.createElement('span');
      const cont = document.createElement('span');
      const contEdit = document.createElement('textarea');
      const date = document.createElement('span');
      // li.appendChild(likeBtn);
      const edit = document.createElement('button');
      const save = document.createElement('button');
      const cancel = document.createElement('button');
      const del = document.createElement('div');
      name.id = 'name';
      save.id = 'btnSave';
      cancel.id = 'btnCancel';
      del.id = 'del';

      const user = doc.data().name == null ? doc.data().email : doc.data().name;
      //  console.log(doc.data())

      li.setAttribute('data-id', doc.id);
      li.setAttribute('data-userid', doc.data().uid);
      contEdit.setAttribute('class', 'oculto');

      name.textContent = user;
      cont.textContent = doc.data().content;
      contEdit.textContent = doc.data().content;
      date.textContent = doc.data().dateCreate.toDate();
      edit.textContent = 'Editar';
      save.textContent = 'Guardar ✔';
      cancel.textContent = 'Cancelar ✘';
      del.textContent = 'x';//  signo para eliminar publicaciones

      li.appendChild(name);
      li.appendChild(cont);
      li.appendChild(contEdit);
      li.appendChild(date);

      //  delete y edit visible solo para user signin

      if (doc.data().uid === auth.currentUser.uid) { // revisar problemas con usuario nuevo
        li.appendChild(del);
        li.appendChild(edit);
        li.appendChild(save);
        li.appendChild(cancel);

        save.setAttribute('class', 'oculto');
        cancel.setAttribute('class', 'oculto');
      }
      ul.appendChild(li);

      //  borrar publicacion
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        //  console.log('PRUEBA')
        const id = e.target.parentElement.getAttribute('data-id');
        const option = confirm('Estas segura/o de eliminar este post?');
        if (option === true) {
          deleteContent(id);
        }
      });

      //  editar publicacion
      edit.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = e.target.parentElement.getAttribute('data-id');
        await getContent(id);
        //  console.log('editar');

        edit.setAttribute('class', 'oculto');
        cont.setAttribute('class', 'oculto');
        contEdit.setAttribute('class', 'visible');
        save.setAttribute('class', 'visible');
        cancel.setAttribute('class', 'visible');
   
      });
      //  eventos de editar: guardar y cancelar
      save.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = e.target.parentElement.getAttribute('data-id');
        //  console.log('guardar');
        if (contEdit.value !== null || contEdit.value !== '') {
          await updateContent(id, { content: contEdit.value });
          cancel.setAttribute('class', 'oculto');
          save.setAttribute('class', 'oculto');
          cont.setAttribute('class', 'visible');
          edit.setAttribute('class', 'visible');
        }
      });

      cancel.addEventListener('click', (e) => {
        e.stopPropagation();
        //  console.log('cancelar');
        edit.setAttribute('class', 'visible');
        cont.setAttribute('class', 'visible');
        contEdit.setAttribute('class', 'oculto');
        cancel.setAttribute('class', 'oculto');
        save.setAttribute('class', 'oculto');
      });
      // });
    });
  });

  const goToTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  contentNav.addEventListener('click', goToTop);

  return div;
};







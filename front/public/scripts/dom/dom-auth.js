import {
  headerTitleElement,
  mainElement,
  userDataElement,
  menuCerrarSesion
} from "./dom-main-elements.js";

import * as auth from "../services/auth.js";

userDataElement.addEventListener("mouseenter", () => {
  const user = auth.getUser();
  if (user) userDataElement.textContent = user.roles.join(",");
  else userDataElement.textContent = "roles";
});
userDataElement.addEventListener("mouseleave", () => {
  const user = auth.getUser();
  if (user) userDataElement.textContent = user.username;
  else userDataElement.textContent = "username";
});

export async function mostrarLogin() {
  headerTitleElement.innerHTML = `<h2>Iniciar sesión</h2>`;
  const formId = "loginForm";
  /*html*/
  const miHtml = `
        <div class="card">
          
          <form id="${formId}">
            <label for="username">username:</label><br />
            <input type="text" id="username" name="username" /><br /><br />

            <label for="password">password:</label><br />
            <input type="password" id="password" name="password" /><br /><br />

            <input type="submit" value="Ingresar"/>
          </form>
          <div id="error-login" class="error-message"></div>

        </div>
    `;

  mainElement.innerHTML = miHtml;
  const formElement = document.getElementById(formId);
  formElement.addEventListener("submit", doLogin);
}

export async function doLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    await auth.login(username, password); //Esto ya setea el user.
    const user = auth.getUser();
    if (!user) throw new Error("No hay usuario seteado.");
    userDataElement.textContent = user.username;

    menuCerrarSesion.innerText = "Cerrar sesión";
    menuCerrarSesion.addEventListener("click", doLogout);

    mainElement.innerHTML = "<h1>Login exitoso.</h1>";
  } catch (error) {
    console.error(error.message);
    const errorMessageElement = document.getElementById("error-login");

    /*html*/
    const errorTemplate = `
      <p>${error.message}</p>
    `;
    errorMessageElement.innerHTML = errorTemplate;
  }
}

async function doLogout(event) {
  auth.logout();
  menuCerrarSesion.innerText = "";
  mainElement.innerHTML = "<h1>Sesión terminada.</h1>";
}

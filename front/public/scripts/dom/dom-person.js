import personService from "../services/person.js";
import { headerTitleElement, mainElement, menuCrearUsuarioElement, menuListaUsuariosElement } from "./dom-main-elements.js";

menuListaUsuariosElement.addEventListener("click", () => {
  mostrarListarUsuarios();
});

menuCrearUsuarioElement.addEventListener("click", (event) => {
  mostrarCrearUsuario(event);
});


export async function mostrarListarUsuarios() {
  try {
    headerTitleElement.innerHTML = `<h2>Listar usuarios</h2>`;

    const users = await personService.getAll();
    const miHtml = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr>
            <td>${user.id_persona}</td>
            <td>${user.username}</td>
            <td>${user.roles.join(", ")}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    mainElement.innerHTML = miHtml;
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-login" class="error-message">${error.message}</div>
    `;
  }
}

export async function mostrarCrearUsuario() {
  try {
    headerTitleElement.innerHTML = `<h2>Crear usuario</h2>`;

    const formId = "createUserForm";

    const miHtml = `
      <div class="card">
        
        <form id="${formId}">
          <label for="username">Username:</label><br />
          <input type="text" id="username" name="username" /><br /><br />

          <p>Roles:</p>
          <input type="checkbox" id="admin" name="admin">
          <label for="admin">Admin</label><br>

          <input type="checkbox" id="normal" name="normal">
          <label for="normal">Normal</label><br>

          <input type="submit" value="Ingresar"/>
        </form>
        <div id="error-login" class="error-message"></div>

      </div>
    `;

  mainElement.innerHTML = miHtml;
  const formElement = document.getElementById(formId);
  formElement.addEventListener("submit", doCreateUser);
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-create-user" class="error-message">${error.message}</div>
    `;
  }
}

async function doCreateUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const isAdminChecked = document.getElementById("admin").checked;
  const isNormalChecked = document.getElementById("normal").checked;

  console.log({ username, isAdminChecked, isNormalChecked })

  const roles = []
  if (isAdminChecked) roles.push("admin")
  if (isNormalChecked) roles.push("normal")
  
  try {
    await personService.create(username, roles);
   
    mostrarListarUsuarios();
  } catch (error) {
    console.error(error.message);
    const errorMessageElement = document.getElementById("error-create-user");

    /*html*/
    const errorTemplate = `
      <p>${error.message}</p>
    `;
    errorMessageElement.innerHTML = errorTemplate;
  }
}
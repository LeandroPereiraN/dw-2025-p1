import { getUser } from "../services/auth.js";
import taskService from "../services/task.js";
import { headerTitleElement, mainElement, menuMisTareasElement } from "./dom-main-elements.js";

menuMisTareasElement.addEventListener("click", () => {
  mostrarListarTareas();
});

async function mostrarListarTareas() {
  try {
    headerTitleElement.innerHTML = `<h2>Listar tareas</h2>`;
    const user = getUser()

    const tasks = await taskService.getAll(user.id_persona);
    const miHtml = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
        </tr>
      </thead>
      <tbody>
        ${tasks
          .map(
            (task) => `
          <tr>
            <td>${task.id_tarea}</td>
            <td>${task.titulo}</td>
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

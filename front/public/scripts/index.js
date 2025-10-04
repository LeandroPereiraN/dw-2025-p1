import { mostrarLogin } from "./dom/dom-auth.js";
import { mostrarListarUsuarios } from "./dom/dom-person.js";
import { hayToken } from "./services/api.js";
import "./dom/dom-tasks.js"

if (!hayToken()) mostrarLogin();
else mostrarListarUsuarios();

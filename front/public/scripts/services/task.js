import { api } from "./api.js";

const baseUrl = "personas/";

const getBaseUrl = (id_persona) => `personas/${id_persona}/tareas/`;

const getAll = async function (id_persona) {
  return api.get(getBaseUrl(id_persona));
};

const create = async function (id_persona, titulo) {
  return api.post(baseUrl, { id_persona, titulo });
};

const erase = async function (id_persona) {
  await api.delete(baseUrl + id_persona);
};

const taskService = {
  getAll,
  create,
  erase,
};

export default taskService;

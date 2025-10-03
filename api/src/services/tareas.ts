import { UcuNoEncontrado } from "../model/errors.ts";

const tareas = [
  {
    id_tarea: 1,
    id_persona: 3,
    titulo: "Pasear perro",
  },
  {
    id_tarea: 2,
    id_persona: 3,
    titulo: "Cocinar",
  },
  {
    id_tarea: 3,
    id_persona: 4,
    titulo: "Ir al gim",
  },
  {
    id_tarea: 4,
    id_persona: 4,
    titulo: "Bañarse",
  },
];
let taskCount = tareas.length;

export function findAll() {
  return tareas;
}

export const createTask = async function (id_persona: number, titulo: string) {
  taskCount++;

  const newTask = { 
    id_tarea: taskCount, 
    id_persona, 
    titulo
  };
  tareas.push(newTask);

  return newTask;
};

export const deleteTaskById = async function (id: number) {
  const index = tareas.findIndex((t) => t.id_tarea === id);

  if (index < 0) throw new UcuNoEncontrado("");

  tareas.splice(index, 1);
};


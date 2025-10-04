import createError from "@fastify/error";
import Type from "typebox";

export const UcuError = createError("UCU_0001", "Error: %s", 500, Error);

export const UcuNoAutenticado = createError(
  "UCU_0002",
  "No autenticado: %s",
  401,
  Error
);
export const UcuNoEncontrado = createError(
  "UCU_0003",
  "No se encontró el elemento: %s",
  404,
  Error
);
export const UcuNoAdmin = createError(
  "UCU_0004",
  "No sos admin: %s",
  403,
  Error
);

export const UcuYaExisteUsuario = createError(
  "UCU_0005",
  "Ya existe usuario: %s",
  400,
  Error
);

export const UcuNotOwnerTask = createError(
  "UCU_0006",
  "No sos el dueño de la tarea: %s",
  403,
  Error
);

export default {
  UcuError,
  UcuNoAutenticado,
  UcuNoEncontrado,
};

export const UcuDatosIncorrectos = createError(
  "UCU_0006",
  "Usuario o contraseña incorrecta. %s",
  401,
  Error
);

export const ErrorSchema = Type.Object(
  {
    statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.String(),
    code: Type.Optional(Type.String()),
  },
  {
    title: "Esquema para errores",
  }
);

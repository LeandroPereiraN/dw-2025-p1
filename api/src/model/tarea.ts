import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";

export const Task = Type.Object({
  id_tarea: Type.Integer(),
  id_persona: Type.Integer(),
  titulo: Type.String({ maxLength: 20 }),
});

export type Task = Static<typeof Task>;

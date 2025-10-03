import { Type, type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Task } from "../../../../model/tarea.ts";
import { createTask, findAll } from "../../../../services/tareas.ts";
import { ErrorSchema, UcuNoAutenticado, UcuNotOwnerTask } from "../../../../model/errors.ts";

const taskRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
      "/",
      {
        schema: {
          tags: ["tareas"],
          params: Type.Pick(Task, ["id_persona"]),
          response: {
            200: Type.Array(Task),
          },
          security: [
            { bearerAuth: [] }
          ]
        },
        preHandler: [fastify.checkIsUserOwner],
      },
      async function () {
        return findAll();
      }
    );
  
    fastify.post(
      "/",
      {
        schema: {
          tags: ["tareas"],
          params: Type.Pick(Task, ["id_persona"]),
          body: Type.Pick(Task, [ "titulo"], {
            examples: [
              {
                titulo: "Comer comida",
              },
            ],
          }),
          response: {
            201: Task,
            400: ErrorSchema,
          },
          security: [
            { bearerAuth: [] }
          ]
        },
        preHandler: [fastify.checkIsUserOwner],
      },
      async function (req, rep) {
        rep.code(201);
        return createTask(req.params.id_persona, req.body.titulo);
      }
    );
};

export default taskRoutes;

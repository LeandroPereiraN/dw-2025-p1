import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { deleteTaskById } from "../../../../../services/tareas.ts";
import { Task } from "../../../../../model/tarea.ts";

const taskRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.delete(
    "/",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Task, ["id_persona", "id_tarea"]),
        response: {
          204: Type.Null(),
        },
        security: [
          { bearerAuth: [] }
        ]
      },
      preHandler: [fastify.checkIsUserOwner],
    },
    async function (req, rep) {
      rep.code(204);
      return deleteTaskById(req.params.id_tarea);
    }
  );
};

export default taskRoutes;

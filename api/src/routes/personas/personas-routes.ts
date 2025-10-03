import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { Persona } from "../../model/persona.ts";
import { createPerson, findAll } from "../../services/personas.ts";
import { ErrorSchema } from "../../model/errors.ts";

const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["personas"],
        response: {
          200: Type.Array(Persona),
        },
        security: [
          { bearerAuth: [] }
        ]
      },
      onRequest: [fastify.checkIsAdmin],
    },
    async function () {
      return findAll();
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        tags: ["personas"],
        body: Type.Pick(Persona, ["username", "roles"], {
          examples: [
            {
              username: "user5",
              roles: ["normal"],
            },
          ],
        }),
        response: {
          201: Persona,
          400: ErrorSchema,
        },
        security: [
          { bearerAuth: [] }
        ]
      },
      onRequest: [fastify.checkIsAdmin],
    },
    async function (req, rep) {
      rep.code(201);
      return createPerson(req.body.username, req.body.roles);
    }
  );
};

export default personasRoutes;

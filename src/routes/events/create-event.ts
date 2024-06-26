import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { generateSlug } from "../../utils/generate-slug"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/events", {
            schema: {
                summary: "Create event",
                tags: ["Events"],
                body: z.object({
                    title: z.string().min(4).max(255),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(),
                }),
                response: {
                    201: z.object({
                        id: z.string().uuid(),
                    }),
                    409: z.object({
                        error: z.string(),
                    }),
                },
            },
        },
            async (request, reply) => {

                const {
                    title,
                    details,
                    maximumAttendees,
                } = request.body

                const slug = generateSlug(title)

                const eventWithSameSlug = await prisma.event.findUnique({
                    where: {
                        slug,
                    },
                })

                if (eventWithSameSlug !== null) {
                    return reply.status(409).send({
                        error: "An event with the same title already exists",
                    })
                }

                const event = await prisma.event.create({
                    data: {
                        title,
                        details,
                        maximumAttendees,
                        slug,
                    },
                })

                return reply.status(201).send({ id: event.id })
            })
}
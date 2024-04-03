import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function getEvents(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/events",
            {
                schema: {
                    response: {
                        200: z.object({
                            events: z.array(
                                z.object({
                                    id: z.string().uuid(),
                                    title: z.string(),
                                    details: z.string().nullable(),
                                    slug: z.string().nullable(),
                                    maximumAttendees: z.number().int().positive().nullable(),
                                    attendeesAmount: z.number().int().positive().nullable(),
                                })
                            ),
                        }),
                    },
                },
            },
            async (request, reply) => {

                const events = await prisma.event.findMany({
                    select: {
                        id: true,
                        title: true,
                        details: true,
                        slug: true,
                        maximumAttendees: true,
                        _count: {
                            select: {
                                attendees: true
                            },
                        },
                    },
                })

                return reply.status(200).send({
                    events: events.map(event => ({
                        id: event.id,
                        title: event.title,
                        details: event.details,
                        slug: event.slug,
                        maximumAttendees: event.maximumAttendees,
                        attendeesAmount: event._count.attendees,
                    }))
                })
            }
        )
}
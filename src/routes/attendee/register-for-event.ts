import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../../lib/prisma"


export async function registerForEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees',
            {
                schema: {
                    summary: "Register for event",
                    tags: ["Attendees"],
                    body: z.object({
                        name: z.string().min(3).max(255),
                        email: z.string().email(),
                    }),
                    params: z.object({
                        eventId: z.string().uuid(),
                    }),
                    response: {
                        201: z.object({
                            attendeeId: z.number(),
                        }),
                        404: z.object({
                            error: z.string(),
                        }),
                        409: z.object({
                            error: z.string(),
                        }),
                    },
                },
            },
            async (request, reply) => {
                const { eventId } = request.params
                const { name, email } = request.body

                const [event, eventAttendees] = await Promise.all([
                    prisma.event.findFirst({
                        where: {
                            id: eventId,
                        },
                    }),
                    await prisma.attendee.findMany({
                        where: {
                            eventId,
                        },
                    }),
                ])

                // If the event is not found, return a 404 error
                if (event === null)
                    return reply.status(404).send({ error: "Event not found" })


                // If the attendee is already registered, return a 409 error
                if (eventAttendees.some((attendee) => attendee.email === email))
                    return reply.status(409).send({ error: "Attendee already registered" })


                // If the event has a maximum number of attendees and the limit is reached, return a 409 error
                if (event.maximumAttendees !== null && eventAttendees.length >= event.maximumAttendees)
                    return reply.status(409).send({ error: "Event is full" })


                const attendee = await prisma.attendee.create({
                    data: {
                        name,
                        email,
                        eventId,
                    },
                })

                return reply.status(201).send({ attendeeId: attendee.id })
            })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function checkInEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/attendees/:attendeeId/checkin", {
            schema: {
                params: z.object({
                    attendeeId: z.coerce.number().int(),

                }),
                response: {
                    201: z.object({
                        id: z.number().int(),
                        attendeeId: z.number().int(),
                        createdAt: z.date(),
                    }),
                    400: z.object({ error: z.string() }),
                    404: z.object({ error: z.string() }),
                },
            }
        },
            async (request, reply) => {

                const { attendeeId } = request.params

                const attendee = await prisma.attendee.findUnique({
                    where: {
                        id: attendeeId
                    },
                    select: {
                        id: true,
                        CheckIn: true
                    }
                })

                // Check if attendee exists
                if (!attendee) {
                    return reply.status(404).send({ error: "Attendee not found" })
                }

                console.log(attendee)
                const hasCheckIn = await prisma.checkIn.findFirst({
                    where: {
                        attendeeId
                    }
                })

                if (hasCheckIn) {
                    return reply.status(400).send({ error: "Attendee already checked in" })
                }

                const checkin = await prisma.checkIn.create({
                    data: {
                        attendeeId
                    }
                })

                return reply.status(201).send({
                    id: checkin.id,
                    attendeeId: checkin.attendeeId,
                    createdAt: checkin.createdAt,
                })
            })
}
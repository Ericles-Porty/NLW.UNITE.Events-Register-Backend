import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function checkInEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/attendees/:attendeeId/checkin", {
            schema: {
                summary: "Check-in event",
                tags: ["Check-in"],
                params: z.object({
                    attendeeId: z.coerce.number().int().positive(),

                }),
                response: {
                    201: z.object({
                        id: z.number().int(),
                        attendeeId: z.number().int(),
                        createdAt: z.date(),
                    }),
                    404: z.object({ error: z.string() }),
                    409: z.object({ error: z.string() }),
                },
            }
        },
            async (request, reply) => {

                const { attendeeId } = request.params

                const attendee = await prisma.attendee.findUnique({
                    where: {
                        id: attendeeId
                    },
                    include: {
                        checkIn: true
                    }
                })

                if (!attendee)
                    return reply.status(404).send({ error: "Attendee not found" })

                //  O participante só pode realizar check-in em um evento uma única vez;
                if (attendee.checkIn)
                    return reply.status(409).send({ error: "Attendee already checked in" })

                const checkIn = await prisma.checkIn.create({
                    data: {
                        attendeeId
                    }
                })

                return reply.status(201).send({
                    id: checkIn.id,
                    attendeeId: checkIn.attendeeId,
                    createdAt: checkIn.createdAt,
                })
            })
}
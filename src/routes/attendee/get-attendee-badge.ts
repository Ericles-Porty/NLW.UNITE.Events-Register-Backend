import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/attendees/:attendeeId/badge", {
            schema: {
                summary: "Get attendee badge",
                tags: ["Attendees"],
                params: z.object({
                    attendeeId: z.coerce.number().int(),
                }),
                response: {
                    200: z.object({
                        id: z.number().int(),
                        name: z.string(),
                        email: z.string().email(),
                        event: z.object({
                            title: z.string(),
                        }),
                        checkInURL: z.string().url(),
                        checkedIn: z.boolean(),
                    }),
                    404: z.object({
                        error: z.string(),
                    }),
                }
            }
        }, async (request, reply) => {

            const { attendeeId } = request.params

            const attendee = await prisma.attendee.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    event: {
                        select: {
                            title: true
                        }
                    },
                    checkIn: true
                },
                where: {
                    id: attendeeId
                }
            })

            if (attendee === null)
                return reply.status(404).send({ error: "Attendee not found" })

            const baseURL = request.protocol + '://' + request.hostname

            const checkInURL = new URL(`/attendees/${attendeeId}/checkin`, baseURL)

            return reply.status(200).send(
                {
                    id: attendee.id,
                    name: attendee.name,
                    email: attendee.email,
                    event: {
                        title: attendee.event.title
                    },
                    checkInURL: checkInURL.toString(),
                    checkedIn: attendee.checkIn !== null,
                }
            )
        })

}
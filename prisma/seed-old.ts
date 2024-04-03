import { randomUUID } from "crypto"
import { prisma } from "../src/lib/prisma"
import { generateSlug } from "../src/utils/generate-slug"
import { promise } from "zod"

async function seed() {
    await prisma.event.deleteMany()
    await prisma.attendee.deleteMany()
    await prisma.checkIn.deleteMany()

    const [event1, event2, event3, event4] =
        await Promise.all([
            prisma.event.create({
                data: {
                    id: randomUUID(),
                    title: "Casamento do João e da Maria",
                    details: "O casamento do João e da Maria será realizado no dia 20/12/2021 às 20h.",
                    slug: generateSlug("Casamento do João e da Maria"),
                    maximumAttendees: 20,
                }
            }),
            prisma.event.create({
                data: {
                    id: randomUUID(),
                    title: "Festa de aniversário do João",
                    details: "A festa de aniversário do João será realizada no dia 20/12/2021 às 20h.",
                    slug: generateSlug("Festa de aniversário do João"),
                    maximumAttendees: 20,
                }
            }),
            prisma.event.create({
                data: {
                    id: randomUUID(),
                    title: "Festa de aniversário da Maria",
                    details: "A festa de aniversário da Maria será realizada no dia 20/12/2021 às 20h.",
                    slug: generateSlug("Festa de aniversário da Maria"),
                    maximumAttendees: 20,
                }
            }),
            prisma.event.create({
                data: {
                    id: randomUUID(),
                    title: "Lançamento do livro do João",
                    details: "O lançamento do livro do João será realizado no dia 20/12/2021 às 20h.",
                    slug: generateSlug("Lançamento do livro do João"),
                    maximumAttendees: 20,
                }
            }),
        ])

    const [attendee1, attendee2, attendee3, attendee4, attendee5, attendee6, attendee7, attendee8, attendee9] =
        await Promise.all([
            prisma.attendee.create({
                data: {
                    name: "João",
                    email: "João@gmail.com",
                    eventId: event1.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "Maria",
                    email: "Maria@gmail.com",
                    eventId: event1.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "João",
                    email: "João@gmail.com",
                    eventId: event2.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "Maria",
                    email: "Maria@gmail.com",
                    eventId: event2.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "João",
                    email: "João@gmail.com",
                    eventId: event3.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "Maria",
                    email: "Maria@gmail.com",
                    eventId: event3.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "João",
                    email: "João@gmail.com",
                    eventId: event4.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "Maria",
                    email: "Maria@gmail.com",
                    eventId: event4.id,
                }
            }),
            prisma.attendee.create({
                data: {
                    name: "João para o João",
                    email: "João2@gmail.com",
                    eventId: event4.id,
                }
            })
        ])

    await Promise.all([
        prisma.checkIn.create({
            data: {
                attendeeId: attendee1.id,
            }
        }),
        prisma.checkIn.create({
            data: {
                attendeeId: attendee2.id,
            }
        }),
        prisma.checkIn.create({
            data: {
                attendeeId: attendee3.id,
            }
        }),
        prisma.checkIn.create({
            data: {
                attendeeId: attendee5.id,
            }
        }),
    ])


}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect()
})
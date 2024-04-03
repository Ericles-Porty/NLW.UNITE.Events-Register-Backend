import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEvent } from "./routes/events/create-event";
import { registerForEvent } from "./routes/attendee/register-for-event";
import { getEvents } from "./routes/events/get-events";
import { getEvent } from "./routes/events/get-event";
import { getAttendeeBadge } from "./routes/attendee/get-attendee-badge";
import { checkIn } from "./routes/check-in/check-in";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { getEventAttendees } from "./routes/attendee/get-event-attendees";
const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
    origin: '*',
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'Pass.in API',
            description: 'API para gerenciamento de eventos e check-in de participantes',
            version: '1.0.0',
            contact: {
                name: 'Pass.in',
                email: '',
                url: 'https://github.com/Ericles-Porty'
            },
            license: {
                name: 'Apache-2.0 license',
            },
        },
        tags: [
            { name: 'Events', description: 'Event management' },
            { name: 'Attendees', description: 'Attendee management' },
            { name: 'Check-in', description: 'Check-in management' },
        ],
        basePath: '/',
        host: 'localhost:3333',
        schemes: ['http'],
        swagger: '2.0',
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
    routePrefix: '/',
})

// Routes

app.register(createEvent);
app.register(getEvents);
app.register(getEvent);

app.register(registerForEvent);
app.register(getEventAttendees)
app.register(getAttendeeBadge);

app.register(checkIn);

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port http://localhost:3333");
});
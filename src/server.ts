import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEvent } from "./routes/events/create-event";
import { registerForEvent } from "./routes/attendee/register-for-event";
import { getEvents } from "./routes/events/get-events";
import { getEvent } from "./routes/events/get-event";
import { getAttendeeBadge } from "./routes/attendee/get-attendee-badge";
import { checkInEvent } from "./routes/check-in/check-in-event";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvents);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkInEvent);

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port http://localhost:3000");
});
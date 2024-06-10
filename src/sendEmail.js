import { emailSender } from "wasp/server/email";

// In some action handler...
const info = await emailSender.send({
  from: {
    name: "John Doe",
    email: "john@doe.com",
  },
  to: "user@domain.com",
  subject: "Saying hello",
  text: "Hello world",
  html: "Hello <strong>world</strong>",
});
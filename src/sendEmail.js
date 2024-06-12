import { emailSender } from "wasp/server/email";

export const sendEmail = async (to, subject, textContent, htmlContent) => {
  try {
    const info = await emailSender.send({
      from: {
        name: "Dennis Koh",
        email: "denniskoh135@gmail.com",
      },
      to: to,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });
    console.log('Email sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

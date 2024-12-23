"use server";

import { contactAction } from "@/lib/safe-action";
import { contactFormSchema } from "@/types/zodType";
import nodemailer from "nodemailer";

export const sendEmail = contactAction
  .schema(contactFormSchema)
  .action(async ({ parsedInput: { ...formData } }) => {
    const lastName = formData.lastName;
    const firstName = formData.firstName;
    const email = formData.email;
    const message = formData.message;

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true pour SSL, false pour TLS
      auth: {
        user: process.env.EMAIL_USER, // Email d'expéditeur
        pass: process.env.EMAIL_PASS, // Mot de passe ou App Password
      },
    });

    // Options pour l'e-mail
    const sendEmail = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Destinataire
      subject: "Nouveau message depuis le portfolio",
      text: `
        Nom: ${lastName} ${firstName}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <p><strong>Nom:</strong> ${lastName} ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return sendEmail;
  });

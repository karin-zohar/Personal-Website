import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface ContactFormData {
  name?: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export const sendContactEmail = async (data: ContactFormData) => {
  const mailBody = `
Name: ${data.name || "N/A"}
Email: ${data.email}
Company: ${data.company || "N/A"}
Phone: ${data.phone || "N/A"}

Message:
${data.message}
  `;

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `🔥 New message from ${data.name || "Unknown"} via contact form`,
    text: mailBody,
  });
};

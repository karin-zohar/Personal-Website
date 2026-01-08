import { sendContactEmail } from "../utils/email.js";

export interface ContactRequest {
  name?: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;

export async function handleContact(
  body: ContactRequest
): Promise<{ success?: boolean; error?: string }> {
  const { name, email, message, phone, company } = body;

  if (!email || !message || !name) {
    return { error: "Missing required fields" };
  }

  if (!emailRegex.test(email)) {
    return { error: `Invalid email provided: ${email}` };
  }

  if (!nameRegex.test(name)) {
    return { error: `Invalid name provided: ${name}` };
  }

  try {
    await sendContactEmail({ name, email, message, phone, company });
    return { success: true };
  } catch (err) {
    console.error("Error sending email:", err);
    return { error: "Failed to send email" };
  }
}

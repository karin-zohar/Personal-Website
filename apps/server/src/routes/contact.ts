import { sendContactEmail } from "../utils/email.js";

export interface ContactRequest {
  name?: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export async function handleContact(
  body: ContactRequest
): Promise<{ success?: boolean; error?: string }> {
  const { name, email, message, phone, company } = body;

  if (!email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    await sendContactEmail({ name, email, message, phone, company });
    return { success: true };
  } catch (err) {
    console.error("Error sending email:", err);
    return { error: "Failed to send email" };
  }
}

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log("Testing Resend API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");
  
  const { data, error } = await resend.emails.send({
    from: "DondaX <onboarding@resend.dev>",
    to: "adelekeolamiposi@gmail.com",
    subject: "Test email",
    html: "<p>Test</p>",
  });

  if (error) {
    console.error("Resend API Error:", error);
  } else {
    console.log("Success:", data);
  }
}

test();

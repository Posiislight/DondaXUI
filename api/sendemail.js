import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      zip_code,
      motorcycle_model,
      color,
      quantity,
      frequency,
      additional_features,
    } = req.body;

    // Validate required fields with specific messages
    const missing = [];
    if (!first_name) missing.push("First name is required");
    if (!last_name) missing.push("Last name is required");
    if (!email) missing.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("Please enter a valid email address");
    if (!phone) missing.push("Phone number is required");

    if (missing.length > 0) {
      return res.status(400).json({ error: missing.join(". ") });
    }

    const features =
      additional_features && additional_features.length > 0
        ? additional_features.join(", ")
        : "None";

    const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 19);

    const htmlContent = `
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New Motorcycle Order</h2>
        <h3>Customer Information:</h3>
        <p>
          Name: ${first_name} ${last_name}<br>
          Email: ${email}<br>
          Phone: ${phone}<br>
          Address: ${address}<br>
          City: ${city}<br>
          Zip Code: ${zip_code}
        </p>
        <h3>Order Details:</h3>
        <p>
          Model: ${motorcycle_model}<br>
          Color: ${color}<br>
          Quantity: ${quantity}<br>
          Frequency: ${frequency}<br>
          Additional Features: ${features}
        </p>
        <p>Submitted on: ${submittedAt}</p>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "DondaX <enquiry@dondaxlimited.com>", // Replace with your verified domain and sender email e.g. "orders@dondaxlimited.com"
      to: "enquiry@dondaxlimited.com",
      subject: `New Order from ${first_name} ${last_name}`,
      html: htmlContent,
    });

    if (error) {
       console.error("Resend API error:", error);
       return res.status(400).json({ error: JSON.stringify(error) });
    }

    return res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    console.error("Internal Server error:", err);
    return res.status(500).json({ error: err.message });
  }
}
import type { APIRoute } from "astro";
import Brevo from "@getbrevo/brevo";

const ApiClient = Brevo.ApiClient;
const SendSmtpEmail = Brevo.SendSmtpEmail;
const TransactionalEmailsApi = Brevo.TransactionalEmailsApi;


export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get("first_name");
  const lastName = data.get("last_name");
  const fullName = firstName + " " + lastName;
  const email = data.get("email");
  const phone = data.get("phone");
  const company = data.get("company");
  const message = data.get("message");

  // Validate the data - you'll probably want to do more than this
  if (!firstName || !lastName || !email || !phone || !company || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  let defaultClient = ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = import.meta.env.BREVO_API_KEY;

  let apiInstance = new TransactionalEmailsApi();
  let sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.subject = "New contact from eeturantanen.dev";
  sendSmtpEmail.htmlContent = `
  <html>
    <body>
      <h1>You've got a new contact from {{params.fullname}}!</h1>
      <p>
      Here's the information:<br /><br />
      Name: {{params.fullname}}<br />
      Email: {{params.email}}<br />
      Company: {{params.company}}<br />
      Message: {{params.message}}
      </p>
    </body>
  </html>
  `;
  sendSmtpEmail.sender = { name: fullName, email: email };
  sendSmtpEmail.to = [
    { email: "eeturantanen.dev@gmail.com", name: "Eetu Rantanen" },
  ];
  sendSmtpEmail.replyTo = { email: email, name: fullName };
  sendSmtpEmail.headers = {
    "content-type": "application/json",
    accept: "application/json",
  };
  sendSmtpEmail.params = {
    fullname: fullName,
    email: email,
    company: company,
    message: message,
  };

  try {
    // Send the email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      "Email sent successfully. Response: " + JSON.stringify(response)
    );
    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Error sending email",
      }),
      { status: 500 }
    );
  }
};

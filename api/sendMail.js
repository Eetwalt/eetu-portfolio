import postmark from 'postmark';

export default async function (req, res) {
  try {
    const { first_name, last_name, email, phone, company, message } = req.body;

    const fullName = first_name + ' ' + last_name;

    // Send an email:
    let client = new postmark.ServerClient("1668480f-b733-4c04-abc1-e5516ea7cbde");

    await client.sendEmail({
      "From": "eetu@eeturantanen.fi",
      "To": "eetu@eeturantanen.fi",
      "Subject": "New contact from DEV portfolio!",
      "HtmlBody": `
        <html>
          <body>
            <h1>You've got a new contact from ${fullName}!</h1>
            <p>
              Here's the information:<br /><br />
              Name: ${fullName} <br />
              Email: ${email} <br />
              Phone: ${phone} <br />
              Company: ${company} <br />
              Message: ${message}				
            </p>
          </body>
        </html>
      `,
      "TextBody": "New contact, please respond",
      "MessageStream": "outbound"
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

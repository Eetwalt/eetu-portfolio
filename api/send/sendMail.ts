export async function handleRequest(request: any) {
  const data = await request.formData();
  const firstName = data.get("first_name");
  const lastName = data.get("last_name");
  const fullName = firstName + " " + lastName;
  const email = data.get("email");
  const phone = data.get("phone");
  const company = data.get("company");
  const message = data.get("message");

  let send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "https://www.eeturantanen.dev",
          "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
          "personalizations": [
              {
                  "to": [
                      {
                          "email": "eetu@eeturantanen.fi",
                          "name": "Eetu Rantanen"
                      }
                  ]
              }
          ],
          "from": {
              "email": "eetu@eeturantanen.dev",
              "name": "Eetu's Portfolio"
          },
          "subject": "New contact from DEV portfolio site",
          "content": [
              {
                  "type": "text/html",
                  "value": `
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
                  `
              }
          ]
      })
  });

  // only send the mail on "POST", to avoid spiders, etc.
  if (request.method === "POST") {
      const resp = await fetch(send_request);
      const respText = await resp.text();
      return new Response(respText, {
          status: resp.status,
          statusText: resp.statusText,
          headers: {
              "content-type": "text/plain",
              "Access-Control-Allow-Origin": "https://www.eeturantanen.dev",
              "Access-Control-Allow-Methods": "POST",
          }
      });
  } else {
      return new Response("Method Not Allowed", {
          status: 405,
          statusText: "Method Not Allowed",
          headers: {
              "content-type": "text/plain",
              "Access-Control-Allow-Origin": "https://www.eeturantanen.dev",
              "Access-Control-Allow-Methods": "POST",
          }
      });
  }
}
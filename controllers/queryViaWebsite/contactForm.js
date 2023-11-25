const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = async (req, res) => {
  const body = req.body;


  const message = `
    <p>Hi Khoshow, please contact the following person looking for your service.</p>
      Name: ${body.name}\r\n
      Email: ${body.email}\r\n
      Subject:${body.subject}\r\n
      Message: ${body.message}
    `;

  await sgMail
    .send({
      from: `khoshow.developer@gmail.com`,
      personalizations: [
        {
          to: [
            {
              email: "khoshow@gmail.com",
            },
          ],
          bcc: [
            {
              email: "khoshow.official@gmail.com",
            },
          ],
        },
      ],

      subject: `Test My English Online New message from ${body.name} via website`,
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    })
    .then((data) => {
      return res.status(200).json({ status: "OK", response: data });
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(400).json({
        error: error,
      });
    });
};

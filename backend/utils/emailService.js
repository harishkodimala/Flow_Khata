import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
console.log("BREVO_USER:", process.env.BREVO_USER);
console.log("BREVO_PASS EXISTS:", !!process.env.BREVO_PASS);
console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);

const transporter = nodemailer.createTransport({

  host: "smtp-relay.brevo.com",

  port: 2525,

  secure: false,

  auth: {

    user: process.env.BREVO_USER,

    pass: process.env.BREVO_PASS

  }

});

// Verify SMTP

transporter.verify((error) => {

  if (error) {

    console.error(
      "SMTP ERROR:",
      error.message
    );

  } else {

    console.log(
      "SMTP READY"
    );

  }

});

// Welcome Email

export const sendWelcomeEmail = async (

  customerEmail,

  customerName,

  temporaryPassword

) => {

  try {

    const info =
      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.SENDER_EMAIL}>`,

        to:
          customerEmail,

        subject:
          "Welcome to Khata Flow",

        html: `
          <h2>Hello ${customerName}</h2>

          <p>
            Welcome to Khata Flow.
          </p>

          <p>
            Email:
            ${customerEmail}
          </p>

          <p>
            Temporary Password:
            ${temporaryPassword}
          </p>

          <p>
            Please change your password after login.
          </p>

          <a href="${process.env.CLIENT_URL}/login">
            Login
          </a>
        `

      });

    console.log(
      "Message ID:",
      info.messageId
    );

    console.log(
      "Welcome email sent"
    );

  } catch (error) {

    console.error(
      "Welcome Email Error:",
      error.message
    );

  }

};

// Statement Email

export const sendStatementEmail = async (

  customerEmail,

  customerName,

  pdfPath

) => {

  try {

    import fs from "fs";

console.log(
  "PDF EXISTS:",
  fs.existsSync(pdfPath)
);

console.log(
  "PDF PATH:",
  pdfPath
);

    await transporter.sendMail({

      from:
        `"Khata Flow" <${process.env.SENDER_EMAIL}>`,

      to:
        customerEmail,

      subject:
        "Your Khata Statement",

      html: `
        <h2>Hello ${customerName}</h2>

        <p>
          Attached is your latest Khata Statement.
        </p>
      `,

      attachments: [

        {

          filename:
            "Khata-Statement.pdf",

          path:
            pdfPath

        }

      ]

    });

    console.log(
      "Statement email sent"
    );

  } catch (error) {

    console.error(
      "Statement Email Error:",
      error.message
    );

  }

};

// Contact Form

export const sendContactEmail = async (

  name,

  email,

  message

) => {

  try {

    await transporter.sendMail({

      from:
        `"Khata Flow" <${process.env.SENDER_EMAIL}>`,

      to:
        process.env.SENDER_EMAIL,

      subject:
        `Khata Flow Contact - ${name}`,

      html: `
        <h2>New Contact Message</h2>

        <p>
          Name: ${name}
        </p>

        <p>
          Email: ${email}
        </p>

        <p>
          Message:
        </p>

        <p>
          ${message}
        </p>
      `

    });

    console.log(
      "Contact email sent"
    );

  } catch (error) {

    console.error(
      "Contact Email Error:",
      error.message
    );

  }

};
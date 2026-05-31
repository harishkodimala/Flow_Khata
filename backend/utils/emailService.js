import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter =
  nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.BREVO_USER,

      pass:
        process.env.BREVO_PASS

    }

  });

// Verify SMTP Connection

transporter.verify(

  (error) => {

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

  }

);

// Welcome Email

export const sendWelcomeEmail =
  async (

    customerEmail,

    customerName,

    temporaryPassword

  ) => {

    try {

      console.log("BREVO_USER:", process.env.BREVO_USER);
      console.log("BREVO_PASS EXISTS:", !!process.env.BREVO_PASS);

      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.BREVO_USER}>`,

        to:
          customerEmail,

        subject:
          "Welcome to Khata Flow",

        html: `

        <div style="
          max-width:600px;
          margin:auto;
          font-family:Arial,sans-serif;
          background:#f8fafc;
          padding:30px;
        ">

          <div style="
            background:#2563eb;
            color:white;
            padding:25px;
            text-align:center;
            border-radius:12px 12px 0 0;
          ">

            <h1>Khata Flow</h1>

            <p>
              Customer Account Created Successfully
            </p>

          </div>

          <div style="
            background:white;
            padding:30px;
            border:1px solid #e5e7eb;
            border-top:none;
          ">

            <h2>
              Hello ${customerName},
            </h2>

            <p>

              Welcome to
              <strong>
                Khata Flow
              </strong>

            </p>

            <div style="
              background:#f1f5f9;
              padding:20px;
              border-radius:10px;
              margin:20px 0;
            ">

              <p>

                <strong>
                  Email:
                </strong>

                ${customerEmail}

              </p>

              <p>

                <strong>
                  Temporary Password:
                </strong>

                ${temporaryPassword}

              </p>

            </div>

            <p>

              Please change your
              password after first login.

            </p>

            <div
              style="
                text-align:center;
                margin-top:30px;
              "
            >

              <a

                href="${process.env.CLIENT_URL}/login"

                style="
                  background:#2563eb;
                  color:white;
                  padding:12px 24px;
                  border-radius:8px;
                  text-decoration:none;
                "

              >

                Login Now

              </a>

            </div>

          </div>

        </div>

        `

      });

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

export const sendStatementEmail =
  async (

    customerEmail,

    customerName,

    pdfPath

  ) => {

    try {

      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.BREVO_USER}>`,

        to:
          customerEmail,

        subject:
          "Your Khata Statement",

        html: `

          <div style="
            font-family:Arial,sans-serif;
          ">

            <h2>
              Hello ${customerName},
            </h2>

            <p>

              Attached is your latest
              Khata Statement.

            </p>

            <p>

              Thank you for using
              Khata Flow.

            </p>

          </div>

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

// Contact Form Email

export const sendContactEmail =
  async (

    name,

    email,

    message

  ) => {

    try {

      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.BREVO_USER}>`,

        to:
          process.env.BREVO_USER,

        subject:
          `Khata Flow Contact - ${name}`,

        html: `

          <h2>
            New Contact Message
          </h2>

          <p>

            <strong>Name:</strong>
            ${name}

          </p>

          <p>

            <strong>Email:</strong>
            ${email}

          </p>

          <p>

            <strong>Message:</strong>

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
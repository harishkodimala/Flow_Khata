import nodemailer from "nodemailer";
import { config } from "dotenv";

config();


console.log(
  process.env.EMAIL_USER
);

const transporter = nodemailer.createTransport({

  host: "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  auth: {

    user: process.env.BREVO_USER,

    pass: process.env.BREVO_PASS

  }

});

  transporter.verify((error, success) => {

  if (error) {

    console.log(
      "SMTP ERROR:",
      error
    );

  } else {

    console.log(
      "SMTP READY"
    );

  }

});

export const sendWelcomeEmail =
  async (

    customerEmail,

    customerName,

    temporaryPassword

  ) => {


      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.EMAIL_USER}>`,

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

            <h1 style="
              margin:0;
              font-size:30px;
            ">
              Khata Flow
            </h1>

            <p style="
              margin-top:10px;
              opacity:0.9;
            ">
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

              Welcome to <strong>Khata Flow</strong>.

              Your account has been created by your shopkeeper.

            </p>

            <div style="
              background:#f1f5f9;
              padding:20px;
              border-radius:10px;
              margin:25px 0;
            ">

              <p>
                <strong>Email:</strong>
                ${customerEmail}
              </p>

              <p>
                <strong>Temporary Password:</strong>
                ${temporaryPassword}
              </p>

            </div>

            <div style="
              background:#fef2f2;
              border-left:4px solid #dc2626;
              padding:15px;
              margin:20px 0;
            ">

              <strong>
                Important:
              </strong>

              Please change your password immediately after your first login.

            </div>

            <div style="
              text-align:center;
              margin-top:30px;
            ">

              <a
                href="${process.env.CLIENT_URL}/login"
                style="
                  background:#2563eb;
                  color:white;
                  padding:12px 24px;
                  text-decoration:none;
                  border-radius:8px;
                  display:inline-block;
                  font-weight:bold;
                "
              >

                Login to Khata Flow

              </a>

            </div>

          </div>

          <div style="
            text-align:center;
            padding:20px;
            color:#64748b;
            font-size:14px;
          ">

            <p>
              Thank you for using Khata Flow
            </p>

            <p>
              © 2026 Khata Flow
            </p>

          </div>

        </div>

        `

      });

      console.log(
        "Welcome email sent successfully"
      );


  };


export const sendStatementEmail =
  async (

    customerEmail,

    customerName,

    pdfPath

  ) => {

    try {

      await transporter.sendMail({

        from:
          `"Khata Flow" <${process.env.EMAIL_USER}>`,

        to:
          customerEmail,

        subject:
          "Your Khata Statement",

        html: `

          <div style="
            font-family:Arial,sans-serif;
            padding:20px;
          ">

            <h2>
              Hello ${customerName},
            </h2>

            <p>

              Attached is your latest
              Khata Statement.

            </p>

            <p>

              Please review your
              transaction history
              and current balance.

            </p>

            <br>

            <p>

              Thank you,

              <br>

              Khata Flow Team

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
        "Statement email sent successfully"
      );

    } catch (error) {

      console.error(
        "Statement Email Error:",
        error.message
      );

      throw error;

    }

  };


  export const sendContactEmail =
  async (
    name,
    email,
    message
  ) => {

    try {

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          process.env.EMAIL_USER,

        subject:
          `Khata Flow Contact - ${name}`,

        html: `

          <h2>New Contact Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>

        `

      });

    } catch (error) {

      console.error(
        "Contact Email Error:",
        error.message
      );

      throw error;

    }

  };
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// console.log("USER:", process.env.SMTP_USER);
// console.log("PASS length:", process.env.SMTP_PASS?.length);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) return console.error("Verify error:", err);
  console.log("Server ready:", success);
});
export default transporter
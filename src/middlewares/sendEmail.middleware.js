import nodemailer from "nodemailer";
import { customErrorHandler } from "./errorHandeler.middleware.js";
import { forgotPassword } from "../views/forgotPassword.view.js";

const config = {
  service: "gmail",
  auth: {
    user: process.env.OFFCIAL_EMAIL,
    pass: process.env.OFFCIAL_PASSWORD,
  },
};

export const sendEmail = async (email, otp, name) => {
  try {
    const transporter = nodemailer.createTransport(config);
    const message = {
      from: "Social Media App <noreply@gmail.com>",
      to: email,
      subject: "Your One-Time Password (OTP) for Password Reset.",
      html: forgotPassword(otp, name),
    };
    // Sending Mail through the transporter
    await transporter.sendMail(message);
  } catch (error) {
    throw customErrorHandler(500, "Error while sending otp to email!");
  }
};

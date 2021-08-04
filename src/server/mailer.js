import dotenv from "dotenv";
import * as MailService from "@sendgrid/mail";
dotenv.config();

MailService.setApiKey(process.env.SG_API_KEY);

const sendMail = (msg) => {
    MailService
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(`Mail Error: ${error}`)
      })
}

export default sendMail;
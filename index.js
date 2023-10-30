import express from "express";
import cors from "cors";
import { dataroute } from "./Routers/datarouter.js";
import authroute from "./Routers/authrouter.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import payment from "./Routers/payrouter.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

function sentEmail(mailbody) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MUSER,
        pass: process.env.MPASS,
      },
    });

    var mail_option = {
      from: "agragunath27@gmail.com",
      to: mailbody.email,
      subject: "Ticket Confirmation",
      text: `name : ${mailbody.name}    
      from : ${mailbody.from}
      to : ${mailbody.to}
      date : ${mailbody.date}
      time : ${mailbody.time}
      count : ${mailbody.count}`,
    };

    transporter.sendMail(mail_option, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ msg: "Rejected" });
      } else {
        return resolve({ msg: "Email sent" });
      }
    });
  });
}

app.get("/email", (req, res) => {
  sentEmail()
    .then((response) => res.send(response.msg))
    .catch((err) => res.send(err.msg));
});

app.post("/email", (req, res) => {
  const mailbody = req.body;
  sentEmail(mailbody)
    .then((response) => res.send(response.msg))
    .catch((err) => err.msg);
});
app.use("/tickets", dataroute);
app.use("/users", authroute);
app.use("/", payment);

app.listen(5000, () => {
  console.log("http://localhost:5000");
});

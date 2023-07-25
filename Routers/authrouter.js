import express from "express";
import bcrypt from "bcrypt";
import { addEntity, getOneEntity } from "../DB/db-utils.js";
import jwt from "jsonwebtoken";

const authroute = express.Router();

authroute.post("/", async (req, res) => {
  const userbody = req.body;
  await bcrypt.hash(userbody.password, 10, async (err, hash) => {
    const hashed = hash;
    userbody.password = hashed;
    await addEntity("users", userbody);
    res.send("user registered");
  });
});

authroute.post("/login", async (req, res) => {
  const userbody = req.body;
  const userpass = userbody.password;
  const db = await getOneEntity("users", userbody.email);
  console.log(db);
  //   res.send(db);
  await bcrypt.compare(userpass, db.password, async (err, result) => {
    let usertoken = "";
    console.log(result);
    if (result) {
      await jwt.sign(
        { ...db },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          usertoken = token;
        }
      );
      delete db.password;
      res.send({
        ...db,
        accesstoken: usertoken,
        msg: "Token genereated sucessfully",
      });
    } else {
      res.send({ msg: "Invalid Credentials" });
    }
  });
});

export default authroute;

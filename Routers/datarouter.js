import express from "express";
import {
  addEntity,
  deleteEntity,
  editEntity,
  getAllEntity,
  getOneEntityHis,
  getOneTicket,
} from "../DB/db-utils.js";
import { authchk } from "../middelware/auth-chk.js";

const dataroute = express.Router();

dataroute.get("/health", authchk, (req, res) => {
  res.send("up and running");
});

dataroute.post("/", authchk, async (req, res) => {
  const tickobj = req.body;
  await addEntity("tickets", tickobj);
  res.send("added successfully");
});

dataroute.get("/", authchk, async (req, res) => {
  const data = await getAllEntity("tickets");
  // console.log(data);
  res.send(data);
});

dataroute.get("/history/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log("sfdf", email);
  const data = await getOneEntityHis("bookhistory", email);
  console.log("asdaddfsf", data);
  res.send(data);
});

dataroute.put("/:id", authchk, async (req, res) => {
  const editobj = req.body;
  const id = req.params;
  // console.log(id.id);

  await editEntity("tickets", id.id, editobj);

  res.send("updated succesfully");
});

dataroute.delete("/:id", authchk, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await deleteEntity("tickets", id);
  res.send({ msg: "deleted successfully" });
});

dataroute.get("/:id", authchk, async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  res.send(await getOneTicket("tickets", id));
});

dataroute.put("/", authchk, async (req, res) => {
  const obj = req.body;
  delete obj._id;

  await editEntity("tickets", obj.no, obj);

  res.send("updated succesfully");
});

dataroute.post("/bookhistory", async (req, res) => {
  const obj = req.body;
  delete obj._id;
  delete obj.available;
  // console.log("asdasdas", obj);
  await addEntity("bookhistory", obj);

  res.send("added successfully");
});

export { dataroute };

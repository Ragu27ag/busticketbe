import client from "./db-client.js";

const addEntity = async (name, obj) => {
  return await client.db("Travels").collection(name).insertOne(obj);
};

const getAllEntity = async (name) => {
  return await client.db("Travels").collection(name).find({}).toArray();
};

const editEntity = async (name, id, obj) => {
  return await client
    .db("Travels")
    .collection(name)
    .updateOne({ no: id }, { $set: obj });
};

const getOneEntity = async (name, obj) => {
  return await client.db("Travels").collection(name).findOne({ email: obj });
};

const getOneEntityHis = async (name, obj) => {
  return await client
    .db("Travels")
    .collection(name)
    .find({ email: obj })
    .toArray();
};

const getOneEntityHisno = async (name, obj) => {
  return await client
    .db("Travels")
    .collection(name)
    .find({ no: obj })
    .toArray();
};

const getOneTicket = async (name, obj) => {
  return await client.db("Travels").collection(name).findOne({ no: obj });
};

const deleteEntity = async (name, id) => {
  return await client.db("Travels").collection(name).deleteOne({ no: id });
};
export {
  addEntity,
  getAllEntity,
  editEntity,
  deleteEntity,
  getOneEntity,
  getOneTicket,
  getOneEntityHis,
  getOneEntityHisno,
};

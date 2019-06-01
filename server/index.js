require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const {
  getAllCustomers,
  postCustomer,
  updateCustomer,
  deleteCustomer
} = require("./controller/customerController");

const { SERVER_PORT, CONNECTION_STRING } = process.env;

// make connection to mongo database
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("mongo connected");
  });

app.get("/api/customer", getAllCustomers);

app.post("/api/customer", postCustomer);

app.put("/api/customer/:id", updateCustomer);

app.delete("/api/customer/:id", deleteCustomer);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server up and running on ${port}`));

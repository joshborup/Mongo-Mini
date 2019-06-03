require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

app.use(express.json());
const {
  getAllCustomers,
  postCustomer,
  updateCustomer,
  deleteCustomer
} = require("./controller/customerController");

const { SERVER_PORT } = process.env;

app.get("/api/customer", getAllCustomers);

app.post("/api/customer", postCustomer);

app.put("/api/customer/:id", updateCustomer);

app.delete("/api/customer/:id", deleteCustomer);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server up and running on ${port}`));

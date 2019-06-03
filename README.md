# Project Summary

## Setup

- `fork` and `clone` this repository.

- `cd` into the project directory.
- Run `npm i`
- create a `.env` file in the root of your project folder with the appropriate values, use the `.env.example` as a reference

## Step 1

### Summary

In this step, we'll install `mongoose` into our project and require it in `server/index.js`.

### Instructions

- Run `npm i mongoose`

- Open `server/index.js`
- Require `mongoose` and set it equal to `mongoose`.
- Destructure `CONNECTION_STRING` from `process.env`;
- Call `mongoose.connect()` and pass in the `CONNECTION_STRING`
- Finally add a `.then` and pass in a callback function that will console log that the connection was successful and a `.catch` that will console.log the error if the connection was unsuccessful

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

mongoose.connect(CONNECTION_STRING).then(() => {
  console.log("mongoose connected");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
```

</details>

## Step 2

### Summary

In this step we'll begin by modeling our data structure. We can do this by writing a schema and giving that to mongoose so it knows how to build documents with the data we pass in.

---

Terms to know
Vocab:

<details>

<summary>Database (mongodb)</summary>

A physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.

</details>

<br>

<details>

<summary>Collection</summary>

A grouping of MongoDB documents. A collection is the equivalent of an SQL table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection have a similar or related purpose.

</details>

<br>

<details>

<summary>Document</summary>

A record in a MongoDB collection and the basic unit of data in MongoDB. Documents are analogous to JSON objects but exist in the database in a more type-rich format known as BSON.

</details>

### Vocab Solution

### Instructions

- Start by creating a collections directory, with a file named `customer.js` inside.

  - the names of files are arbitrary but will help to follow the mini

- Require mongoose at the top of the file and set it equal to `mongoose`.

- declare a variable called `customerSchema` and set it equal to `new mongoose.Schema()` with an object that will represent how we would like our data to look, the object should have the following properties

  - `name`: set equal to an object with a `type:String` property, and a `requried:true` property

  - `email`: set equal to an object with a `type:String` property, `requried:true` property, and a `unique:true`

  - `date_joined`: set equal to an object with a `type:Date` property, and a `default` property with a value of `Date().toLocaleString()`

- export `mongoose.model("customer", customerSchema)`
  - collection names should be singular and lowercase

### Solution

<details>

<summary> <code> collections/customer.js </code> </summary>

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date_joined: {
    type: Date,
    default: Date().toLocaleString()
  }
});

module.exports = mongoose.model("customer", customerSchema);
```

</details>

## Step 3

### Summary

In this step, we'll begin setting up our endpoint handler functions, specifically the function to read all of our customers from the customer collection collection

### Instructions

- `cd` into `customerController.js`

- require the customer collection (exported from step 2) at the top of the controller file and set it equal to `Customer`
  - convention is to capitalize a collection when importing and using it
- We can use the find method on our collection to find specific entries, in this case we want all entries so we can just pass an empty object and it will return every document in our collection
  - locate the `getAllCustomers` method and call `Customer.find()` and pass in an empty object
  - other common read queries are `findById` and `findOne`
- Because the find method is a Promise, we can attach both a `.then` and a `.catch` and return the appropriate response

### Solution

<details>

<summary> <code> server/customerController.js </code> </summary>

```js
const Customer = require("../Schema/customer");
module.exports = {
  getAllCustomers: (req, res) => {
    Customer.find({}).then(customers => {
      res.status(200).send(customers);
    });
  }
};
```

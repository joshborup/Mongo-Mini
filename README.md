# MongoDB mini

<img src='./mongologo.png'/>

### What?

MongoDB is a [Document Oriented database](https://en.wikipedia.org/wiki/Document-oriented_database) which is another way to say we can store our application's data in a JSON-like document format

### Why?

- The document model maps to the objects in your application code, making data easy to work with
- Free to use
- Data in MongoDB has a flexible schema. insertions are enforced at the Schema level which can be updated on the fly, this allows us to dynamically modify the schema without downtime.
- Better horizonal scaling when it comes to larger applications that have a alot of data
- Eliminates the need for expensive join operations

**Note:** Your application's needs should drive which type of database you use, as NoSQL and SQL have added benefits and drawbacks depending on the scope of the application. If you are unsure which solution is best for you, you can reference this guide [Choosing a data store](./Choosing.pdf)

### Vocab

**Mongodb** - is an open source database management system (DBMS) that uses a document-oriented database model which supports various forms of data.

**Database** - a structured set of data held in a computer, especially one that is accessible in various ways

**Collection** - A grouping of MongoDB documents. A collection is the equivalent of an `RDBMS` table. A collection exists within a single database.

**Document** - A record in a MongoDB `collection` and the basic unit of data in MongoDB. `Documents` are analogous to `JSON` objects but exist in the database in a more type-rich format known as `BSON`.

**field** - A name-value pair in a document. A document has zero or more fields. Fields are analogous to columns in relational databases.

### Data structure comparisons to SQL

| Document Based Database |       comparison        | Relational based Database |
| :---------------------- | :---------------------: | ------------------------: |
| Mongo                   |       **server**        |                PostgreSQL |
| database                |      **database**       |                  database |
| collection              |  **grouping of data**   |                     table |
| document                |  **individual record**  |                       row |
| field                   | **single unit of data** |                    column |

## Project Summary

**Note:**
This project assumes you have already set up a mongoDB server on [MongoDb.com](https://www.mongodb.com/cloud/atlas) using [The Atlas Setup Guide](https://github.com/joshborup/MongoDB-Atlas-Setup) and have a connection string with your networks IP address whitelisted, you can alternatively set up mongo on your local machine and use that.

In this project, we will connect a server to our `mongoDB` database and set up our server's `CRUD` endpoints using `mongoose`. `mongoose` is an [ODM (object document mapper)](https://en.wikipedia.org/wiki/Object-relational_mapping#Object-oriented_databases)

## Setup

- `fork` and `clone` this repository.
- `cd` into the project directory.
- Run `npm i`
- run `npm start` and head over to [localhost 4000](http://localhost:4000) to get familiar with the project UI
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

Because we are using an [ORM/ODM](https://en.wikipedia.org/wiki/Object-relational_mapping) which will map the data to our language of choice, we can use the built in JavaScript types to define what specific data types we should expect when entering in out data

- String,
- Number,
- Date,
- Boolean,
- ObjectId (mongo datatype and the default type for primary keys),
- Array

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

A record in MongoDB is a document, which is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.

The advantages of using documents are:

- Documents (i.e. objects) correspond to native data types in many programming languages.
- Embedded documents and arrays reduce need for expensive joins.
- Dynamic schema supports documents with different key and value pairs existing in the same collection.

</details>

### Instructions

- Start by creating a `collections` directory inside of the `server`, with a file named `customer.js` inside.
  - the names of files are arbitrary but will help to follow the mini
- Require mongoose at the top of the file and set it equal to `mongoose`.
- declare a variable called `customerSchema` and set it equal to `new mongoose.Schema()` with an object passed in that will represent how we would like our data to look, the object should have the following properties
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

In this step, we'll begin setting up our endpoint handler functions, specifically the function to read all of our customers from the customer collection.

### Instructions

- `cd` into `customerController.js`
- require the customer collection (exported from step 2) at the top of the controller file and set it equal to `Customer`
  - convention is to capitalize a collection when importing and using it
- We can use the find method on our collection to find specific entries, in this case we want all entries so we can just pass an empty object and it will return every document in our customer collection
  - locate the `getAllCustomers` method and call `Customer.find()` and pass in an empty object
  - other common read queries are `findById` and `findOne`
- Because the find method is a Promise, we can attach both a `.then` and a `.catch` and return the appropriate response

### Solution

<details>

<summary> <code> customerController.js </code> </summary>

```js
const Customer = require("../collections/customer");
module.exports = {
  getAllCustomers: (req, res) => {
    Customer.find({})
      .then(customers => {
        return res.status(200).send(customers);
      })
      .catch(err => console.log(err));
  }
};
```

</details>

## Step 4

### Summary

In this step, we'll set up our post endpoint handler function so that we can add new customers to our collection to be tracked.

### Instructions

- Locate the `postCustomer` method inside of `customerController.js`
- Create a variable called customer and set it equal to a `new` instance of the customer schema with the `name` and `email` destructured from `req.body` passed in as properties on an object literal
- invoke the `.save()` method on the customer variable
- the `.save()` method in mongoose accepts a callback with what we would like to do after we have successfully updated our found customer document.
  - the callback will have one argument `err`
  - write an if statement to send an error back if an error exists, otherwise we will send the found customers
- inside the logic of your callback, you will want to find all customers and `res.send` them back as the response.

Data Flow:

endpoint hit `=>` function handler runs `=>` new document inserted into the collection `=>` find all customers including the recently made customer and send to front

### Solution

<details>

<summary> <code> customerController.js </code> </summary>

```js
const Customer = require("../collections/customer");
module.exports = {
  getAllCustomers: (req, res) => {
    Customer.find({}).then(customers => {
      res.status(200).send(customers);
    });
  },
  postCustomer: (req, res) => {
    const { name, email } = req.body;

    const customer = new Customer({
      name,
      email
    });

    customer.save(err => {
      if (err) {
        res
          .status(200)
          .send("there was an error when attempting to modify this resource");
      }
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  }
};
```

</details>

## Step 5

### Summary

In this step, we'll set up the ability to update documents within our collection, specifically the email address of our customer.

### Instructions

- Find the `updateCustomer` method in the `customerController.js`
- Access the `Customer` collection imported at the top and call the `findById` method
  - Pass in the `id` being sent back from `req.params`
- Chain a `.then()` to the `findById` method and pass in a callback that will take in the found customer as an argument
- access the `email` property on the found customer and set it equal to the email variable that is destructured from `req.query`
- we can save these changes to the database by invoking the `.save()` method on the found customer like this `customer.save()`
  - The `.save()` method accepts a callback that will have any errors encountered when attempting to save to our database passed in as an argument.
  - if there is an error send an error message to the front
- If there isnt an error, we will want to access the `Customer` collection and send back all of our customers to the front. (use your `getAllCustomers` method as an example on how to get all and send to the front)

### Solution

<details>

<summary> <code> customerController.js </code> </summary>

```js
updateCustomer(req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;

    Customer.findById(id).then(foundCustomer => {

      foundCustomer.email = email;
      foundCustomer.save(err => {
        if(err) {
          res.status(400).send('an error occurred when attempting to save your changes')
        }
        Customer.find({}).then(customers => {
          res.status(200).send(customers);
        });
      });
    });
  }
```

</details>

## Step 6

### Summary

Were going to finish out our crud endpoints with our `delete`, we are going to access the built in methods on our collection, to find a customer by their id and delete them. Finally return all customers to the front

### Instructions

- Find the `deleteCustomer` method in the `customerController.js`
- Access the `Customer` collection imported at the top and call the `findByIdAndDelete` method
  - make sure to pass the id being destructured from `req.params` as an argument
- Chain a `.then()` to the `findByIdAndDelete` method and pass in a callback that will take in the a variable holding info about the deletion that happened
- Finally, access the `Customer` collection and send back all of our customers to the front. (use your `getAllCustomers` method as an example on how to get all and send to the front)

### Solution

<details>

<summary> <code> customerController.js </code> </summary>

```js
deleteCustomer(req, res, next){
    const { id } = req.params;
    Customer.findByIdAndDelete(id).then(deletedCustomer => {
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  }
```

</details>

## Step 7 Validation

### Summary

Mongoose gives us the ability to add custom middleware and validators to check values being inserted prior to insertion

Go explore the docs for mongoose middleware to get the information you need to complete the challenge below

- [Mongoose Validation Docs](https://mongoosejs.com/docs/validation.html)

- [Mongoose Middleware Docs](https://mongoosejs.com/docs/middleware.html)

### Instructions

- Open `collections/customer.js` and locate the email property on the customer schema
- Add a `validate` property to the email configuration object and set it equal to an object
- The validate object should have a propery called validator and that is set equal to a function
  - the function will have an argument passed in that will represent the email that needs to be validated
  - check to see if the passed in email string contains an "`@`" symbol, if it does, return true, otherwise return false

### Solution

<details>

<summary> <code> customer.js </code> </summary>

```js
const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        const validEmail = email.includes("@");
        return validEmail;
      }
    }
  },
  date_joined: {
    type: Date,
    default: Date()
  }
});
```

</details>

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so I can review your changes and merge them into the master repo and branch.

# Project Summary

## Setup

- `fork` and `clone` this repository.
- `cd` into the project directory.
- Run `npm i mongoose express dotenv`

## Step 1

### Summary

In this step, we'll install `mongoose` into our project and require it in `index.js`.

### Instructions

- Require and configure `dotenv` at the top of the file.
- Require `express`.
- Require `mongoose` underneath `express`.
- Destructure `CONNECTION_STRING` from `process.env`;
- Finally add a `.then` and pass in a callback function that will console log that the connection was successful

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

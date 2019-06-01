const Customer = require("../Schema/customer");

module.exports = {
  getAllCustomers: (req, res) => {
    Customer.find({}).then(customers => {
      res.status(200).send(customers);
    });
  },
  postCustomer: (req, res) => {
    const { name, email } = req.body;
    // create a new Customer with your Customer schema and pass in the correct values
    // when creating data, we dont want to write to the DB directly, we want to run this through our validators
    const customer = new Customer({
      name,
      email
    });

    customer.save(err => {
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  },
  updateCustomer: (req, res) => {
    const { id } = req.params;
    const { email } = req.query;
    console.log(id, email);

    Customer.f;
    Customer.findOne({ _id: id }).then(foundCustomer => {
      console.log(foundCustomer);
      foundCustomer.email = email;
      foundCustomer.save(err => {
        Customer.find({}).then(customers => {
          res.status(200).send(customers);
        });
      });
    });
  },
  deleteCustomer: (req, res) => {
    const { id } = req.params;
    console.log(id);
    // ok to delete things directly as we dont care about validators
    Customer.deleteOne({ _id: id }).then(customer => {
      console.log("info about deletion ===>", customer);
      // send all customers to the front

      Customer.find({}).then(customers => {
        console.log("info about deletion ====>", customer);
        res.status(200).send(customers);
      });
    });
  }
};

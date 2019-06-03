module.exports = {
  getAllCustomers: (req, res, next) => {},
  postCustomer: (req, res, next) => {
    const { name, email } = req.body;
    // create a new Customer with your Customer schema and pass in the correct values
    // when creating data, we dont want to write to the DB directly, we want to run this through our validators
  },
  updateCustomer: (req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;
  },
  deleteCustomer: (req, res, next) => {
    const { id } = req.params;
  }
};

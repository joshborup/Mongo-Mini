module.exports = {
  getAllCustomers: (req, res) => {},
  postCustomer: (req, res) => {
    const { name, email } = req.body;
    // create a new Customer with your Customer schema and pass in the correct values
    // when creating data, we dont want to write to the DB directly, we want to run this through our validators
  },
  updateCustomer: (req, res) => {
    const { id } = req.params;
    const { email } = req.query;
  },
  deleteCustomer: (req, res) => {
    const { id } = req.params;
  }
};

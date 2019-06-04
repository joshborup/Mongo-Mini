module.exports = {
  getAllCustomers: (req, res, next) => {},
  postCustomer: (req, res, next) => {
    const { name, email } = req.body;
  },
  updateCustomer: (req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;
  },
  deleteCustomer: (req, res, next) => {
    const { id } = req.params;
  }
};

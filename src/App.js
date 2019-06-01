import React, { Component } from "react";
import "./App.css";
import CustomerForm from "./components/CustomerForm";
import CustomerDisplay from "./components/CustomerDisplay";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.postCustomer = this.postCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    axios
      .get("/api/customer")
      .then(res => {
        this.setState({
          customers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  postCustomer(name, email) {
    axios
      .post("/api/customer", { name, email })
      .then(res => {
        this.setState({
          customers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  updateCustomer(id, email) {
    console.log(id, email);
    axios
      .put(`/api/customer/${id}?email=${email}`)
      .then(res => {
        this.setState({
          customers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  deleteCustomer(id) {
    axios
      .delete(`/api/customer/${id}`)
      .then(res => {
        this.setState({
          customers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { customers } = this.state;

    return (
      <div className="App">
        <CustomerDisplay
          customers={customers}
          deleteCustomer={this.deleteCustomer}
          updateCustomer={this.updateCustomer}
        />
        <CustomerForm postCustomer={this.postCustomer} />
      </div>
    );
  }
}

export default App;

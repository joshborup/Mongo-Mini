import React, { Component } from "react";
import { MdPersonAdd } from "react-icons/md";
export default class CustomerForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: ""
    };
  }

  handleName(name) {
    this.setState({
      name: name
    });
  }

  handleEmail(email) {
    this.setState({
      email: email
    });
  }

  render() {
    const { name, email } = this.state;
    const { postCustomer } = this.props;
    return (
      <div className="customer-form">
        <form
          onSubmit={e => {
            e.preventDefault();
            postCustomer(name, email);
          }}
        >
          <h1>
            <span> Add A Customer</span> <MdPersonAdd />
          </h1>
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={e => this.handleName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              value={email}
              onChange={e => this.handleEmail(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

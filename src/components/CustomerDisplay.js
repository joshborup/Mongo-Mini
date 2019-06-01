import React, { Component } from "react";
import { MdPerson } from "react-icons/md";
class CustomerDisplay extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }
  render() {
    const { customers, deleteCustomer, updateCustomer } = this.props;
    const { email } = this.state;
    const mappedCustomers = customers.map(element => {
      return (
        <div key={element._id} className="customer">
          <div>
            <div>
              <span className="icon">
                <MdPerson />
              </span>
              <div>
                <span>Name: </span> <span className="data">{element.name}</span>
              </div>
              <div>
                <span>Email: </span>
                <span className="data">{element.email}</span>
              </div>
              <div>
                <span>Date Joined: </span>
                <span className="data">
                  {new Date(element.date_joined).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div>
              <button onClick={() => deleteCustomer(element._id)}>
                Delete
              </button>
            </div>
          </div>
          <details>
            <summary>Update Customer Info</summary>
            <div>
              <div>
                <label>New Email: </label>
                <input
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <button
                className="update"
                onClick={() => {
                  updateCustomer(element._id, email);
                  this.setState({ email: "" });
                }}
              >
                Update
              </button>
            </div>
          </details>
        </div>
      );
    });
    return <div className="customer-container">{mappedCustomers}</div>;
  }
}

export default CustomerDisplay;

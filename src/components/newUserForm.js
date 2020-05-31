import React from "react";
import axios from "../apis/axios"
import { Button, Icon, Form, Modal } from "semantic-ui-react";

class Input extends React.Component {
  state = { name: "", email: [], phone: [], err: { name: undefined, email: undefined, phone: undefined } }
  onPhoneNumber = async (num) => {
    const msg = (await axios.post("/validate", { field: "phone", value: num })).data

    alert(msg.err ? msg.err : msg);
    if (msg.err) return false;
    else return true;

  };
  onEmail = async (email) => {
    const msg = (await axios.post("/validate", { field: "email", value: email })).data

    alert(msg.err ? msg.err : msg);
    if (msg.err) return false;
    else return true;
  };
  submit = () => {

  }
  render = () => {
    return (
      <Modal
        trigger={
          <Button floated="right" primary>
            Add User
          </Button>
        }
        centered={false}
      >
        <Modal.Header></Modal.Header>
        <Modal.Content image>
          <Form>
            <Form.Group inline>
              <Form.Input label="Name" placeholder="Name"
                name="name"
                error={this.state.err.name} required />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                label="Phone Number"
                placeholder="Phone Number"
                name="phone"
                error={this.state.err.phone}
                required
              />
              <Icon
                name="add"
                color="green"
                size="large"
                onClick={this.onPhoneNumber}
              />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                label="E-mail"
                placeholder="E-mail"
                name="email"
                error={this.state.err.email}
              />
              <Icon
                name="add"
                color="green"
                size="large"
                onClick={this.onEmail}
              />
            </Form.Group>
            <Form.Button type="submit" onClick={this.submit} primary>
              Submit
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  };
}

export default Input;

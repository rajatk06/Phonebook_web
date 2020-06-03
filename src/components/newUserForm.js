import React from "react";
import axios from "../apis/axios"
import _ from "lodash"
import { Button, Icon, Form, Modal, Label } from "semantic-ui-react";
// eslint-disable-next-line
const default_state = {
  _id: "",
  name: "",
  email: [], phone: [],
  phn_err: undefined, email_err: undefined,
  modalOpen: false,
  curr_email: "", curr_phone: ""
}
class Input extends React.Component {
  state = { ...default_state }

  static getDerivedStateFromProps = (props, state) => {
    if (props.formType === "Edit" && !state.modalOpen) return { ...props.formData, modalOpen: true }
    return null;
  }
  onPhoneNumber = async () => {
    const num = this.state.curr_phone;
    if (num.length !== 10) {
      this.setState({ phn_err: "Phone No. invalid" }); return;
    }
    if (this.state.phone.includes(num)) {
      this.setState({ phn_err: "Phone No. already registered" }); return;
    }
    const msg = (await axios.post("/validate", { field: "phone", value: num })).data

    if (msg.err) this.setState({ phn_err: msg.err })
    else this.setState({ phone: [...this.state.phone, num], curr_phone: "", phn_err: undefined });

  };
  onEmail = async () => {
    const email = this.state.curr_email
    // eslint-disable-next-line
    if (!email.length || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
      this.setState({ email_err: "Invalid E-mail" }); return;
    } if (this.state.email.includes(email)) {
      this.setState({ email_err: "E-mail already registered" })
      return;
    }
    const msg = (await axios.post("/validate", { field: "email", value: email })).data

    if (msg.err) this.setState({ email_err: msg.err })
    else this.setState({ email: [...this.state.email, email], curr_email: "", email_err: undefined });
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  removeTag = (field, t) => {
    this.setState({ [field]: this.state[field].filter(tag => tag !== t) });
  };
  renderTags = (field) => this.state[field].map((tag, i) => {
    return (
      <Label key={i} color="orange" size="large">
        {tag}
        <Icon
          name="delete"
          link
          onClick={() => {
            this.removeTag(field, tag);
          }}
        />
      </Label>
    );
  });
  submit = async () => {
    if (!this.state.phone.length) this.setState({ phn_err: "Phone No. required" })
    else {
      let user_data;
      if (this.state._id === "") {
        user_data = _.omit(this.state, ["_id", "err", "curr_phone", "curr_email", "modalOpen"]);
        const msg = (await axios.post("/users", user_data)).data
        alert(msg.err ? msg.err : msg);
      }
      else {
        user_data = _.omit(this.state, ["err", "curr_phone", "curr_email", "modalOpen"])
        const msg = (await axios.put("/users", user_data)).data
        alert(msg.err ? msg.err : msg);
      }
      this.props.resetType(user_data);
      this.setState({ ...default_state })
    }
  }
  render = () => {
    return (
      <Modal
        trigger={
          <Button onClick={() => this.setState({ modalOpen: true })} floated="right" primary>
            Add User
          </Button>
        }
        centered={false}
        open={this.state.modalOpen}
        onClose={() => {
          this.props.resetType();
          this.setState({ ...default_state })
        }}
        closeIcon
      >
        <Modal.Header>{this.props.formType} User</Modal.Header>
        <Modal.Content image>
          <Form>
            <Form.Group inline>
              <Form.Input label="Name" placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                label="Phone Number"
                placeholder="Phone Number"
                name="curr_phone"
                value={this.state.curr_phone}
                onChange={this.handleChange}
                error={this.state.phn_err}
              />
              <Icon
                name="add"
                color="green"
                size="large"
                onClick={this.onPhoneNumber}
              />
            </Form.Group>
            <Form.Group> {this.renderTags("phone")}</Form.Group>
            <br />
            <Form.Group inline>
              <Form.Input
                label="E-mail"
                placeholder="E-mail"
                name="curr_email"
                value={this.state.curr_email}
                onChange={this.handleChange}
                error={this.state.email_err}
              />
              <Icon
                name="add"
                color="green"
                size="large"
                onClick={this.onEmail}
              />
            </Form.Group>
            <Form.Group> {this.renderTags("email")}</Form.Group>
            <br />
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

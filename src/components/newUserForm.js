import React from "react";
import axios from "../apis/axios"
import _ from "lodash"
import { Button, Icon, Form, Modal, Label } from "semantic-ui-react";
// eslint-disable-next-line
const default_state = {
  _id: "",
  name: "",
  email: [], phone: [],
  err: undefined,
  modalOpen: false,
  curr_email: "", curr_phone: ""
}
class Input extends React.Component {
  state = { ...default_state }

  static getDerivedStateFromProps = (props, state) => {
    //console.log(props)
    if (props.formType === "Edit" && !state.modalOpen) return _.assign(props.formData, { modalOpen: true })
    return { modalOpen: false }
  }
  onPhoneNumber = async () => {
    const num = this.state.curr_phone;
    const msg = (await axios.post("/validate", { field: "phone", value: num })).data

    if (msg.err) return false;
    else {
      if (num.length !== 10) this.setState({ err: "Phone No. invalid" })
      else if (this.state.phone.includes(num)) this.setState({ err: "Phone No. already added" })
      else this.setState({ phone: [...this.state.phone, num], curr_phone: "", err: undefined });
    }
  };
  onEmail = async () => {
    const email = this.state.curr_email
    const msg = (await axios.post("/validate", { field: "email", value: email })).data

    if (msg.err) return false;
    // eslint-disable-next-line
    else if (email.length && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email) && !this.state.email.includes(email))
      this.setState({ email: [...this.state.email, email], curr_email: "" });
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
    if (!this.state.phone.length) this.setState({ err: "Phone No. required" })
    else {
      if (this.state._id === "") {
        const msg = (await axios.post("/users", _.omit(this.state, ["_id", "err", "curr_phone", "curr_email", "modalOpen"]))).data
        console.log(msg)
      }
      else {
        const msg = (await axios.put("/users", _.omit(this.state, ["err", "curr_phone", "curr_email", "modalOpen"]))).data
        console.log(msg)
      }
    }
    this.setState({ ...default_state })
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
        onClose={() => this.setState({ modalOpen: false })}
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
                error={this.state.err}
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

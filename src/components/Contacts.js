import React from "react";
import axios from "../apis/axios";
import {
  List,
  Segment,
  Icon,
  Accordion,
  Pagination,
  Dimmer,
  Loader
} from "semantic-ui-react";
const LIMIT = 4;
class Contacts extends React.Component {
  state = {
    activeIndex: 0,
    users: [],
    total: 0,
    value: "",
    fetching: false
  };

  componentDidMount = () => {
    this.fetchUsers(0);
    this.props.setFetch(this.fetchUsers);
  };

  componentDidUpdate = () => {
    if (this.props.searchValue !== this.state.value) {
      // eslint-disable-next-line
      this.state.value = this.props.searchValue;
      this.fetchUsers(0);
    }
  };

  fetchUsers = async (page = 0) => {
    this.setState({ fetching: true });
    let val = this.state.value;
    val = val.trim();
    val = val.replace(/[/^ *$/]{2,}/g, " ");
    const path =
      val && val.length
        ? `/users?page=${page}&value=${val}`
        : `/users?page=${page}`;
    const { users, total } = (await axios.get(path)).data;
    if (users)
      setTimeout(() => {
        this.setState({ users, total, fetching: false });
      }, 300);
  };
  onUserDelete = async (_id, i) => {
    const msg = (await axios.delete(`/users?_id=${_id}`)).data;
    this.fetchUsers((i + 1) / LIMIT);
    alert(msg.err ? msg.err : msg);
  };
  onUserEdit = (i) => {
    this.props.editRqst("Edit", { ...this.state.users[i] });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  pageChange = (e, { activePage }) => {
    this.fetchUsers(activePage - 1);
  };
  renderUser = (user, i) => {
    const { activeIndex } = this.state;
    return (
      <Accordion key={user._id} fluid styled>
        <Accordion.Title
          active={activeIndex === i}
          index={i}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {user.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === i}>
          <Segment>
            <div
              style={{
                display: "flex",
                overflow: "auto",
                paddingBottom: "1rem"
              }}
            >
              <List>
                {user.phone.map((no, ind) => (
                  <List.Item icon="phone" key={ind} content={no} />
                ))}
              </List>
              <div style={{ marginLeft: "15%" }}>
                <List>
                  {user.email.map((email, ind) => (
                    <List.Item icon="mail" key={ind} content={email} />
                  ))}
                </List>
              </div>
              <div style={{ position: "relative", width: "100%" }}></div>
              <div style={{ display: "flex" }}>
                <Icon
                  name="delete"
                  color="red"
                  size="big"
                  onClick={() => this.onUserDelete(user._id, i)}
                />
                <Icon
                  name="edit"
                  color="green"
                  size="big"
                  onClick={() => this.onUserEdit(i)}
                />
              </div>
            </div>
          </Segment>
        </Accordion.Content>
      </Accordion>
    );
  };
  render() {
    return (
      <>
        {this.state.fetching ? (
          <Segment style={{ height: "25vh" }}>
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          this.state.users.map((user, i) => this.renderUser(user, i))
        )}
        <br />
        {this.state.total > LIMIT ? (
          <center>
            <Pagination
              defaultActivePage={1}
              totalPages={this.state.total / LIMIT}
              onPageChange={this.pageChange}
            />
          </center>
        ) : null}
      </>
    );
  }
}

export default Contacts;

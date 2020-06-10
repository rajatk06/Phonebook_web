import React from "react";
import { Input, Icon, Dropdown } from "semantic-ui-react";

class Search extends React.Component {
  constructor() {
    super();
    this.state = { val: "", opr: "name" };
  }

  SearchSubmit = () => {
    this.props.setValue(this.state);
  };
  render = () => {
    return (
      <>
        <Dropdown
          inline
          name="opr"
          style={{ width: "10%", margin: "0 0 0 1rem" }}
          options={[
            {
              key: "name",
              text: "Name",
              value: "name"
            },
            {
              key: "phone",
              text: "Phone No.",
              value: "phone"
            },
            {
              key: "email",
              text: "E-mail",
              value: "email"
            }
          ]}
          onChange={(e, { name, value }) => this.setState({ [name]: value })}
          defaultValue={"name"}
        />
        <Input
          style={{ width: "40%" }}
          name="val"
          onChange={(e, { name, value }) => this.setState({ [name]: value })}
          icon={
            <Icon
              name="search"
              onClick={this.SearchSubmit}
              inverted
              circular
              link
            />
          }
          placeholder="Search..."
        />
      </>
    );
  };
}

export default Search;

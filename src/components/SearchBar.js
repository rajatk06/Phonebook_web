import React from "react";
import { Input, Icon } from "semantic-ui-react";

class Search extends React.Component {
  state = { value: "" }
  SearchSubmit = async () => {
    this.props.setValue(this.state.value)
  }
  render = () => {
    return (
      <Input
        style={{ width: "40%" }}
        name="value"
        onChange={(e, { name, value }) => this.setState({ [name]: value })}
        icon={<Icon name="search" onClick={this.SearchSubmit} inverted circular link />}
        placeholder="Search..."
      />
    );
  };
}

export default Search;

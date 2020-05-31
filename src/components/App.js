import React from "react";
import { Segment } from "semantic-ui-react";

import NewForm from "./newUserForm";
import Search from "./SearchBar";
import Contacts from "./Contacts";

class App extends React.Component {
  state = { value: "" }
  render = () => {
    return (
      <div style={{ margin: "0 15vw 0 15vw" }}>
        <Segment style={{ marginTop: "2rem" }}>
          <Search setValue={(value) => this.setState({ value })} />
          <NewForm />
        </Segment>
        <br />
        <Contacts searchValue={this.state.value} />
      </div>
    );
  };
}

export default App;

import React from "react";
import { Segment } from "semantic-ui-react";

import NewForm from "./newUserForm";
import Search from "./SearchBar";
import Contacts from "./Contacts";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      val: "",
      opr: "name",
      formType: "Add",
      formData: {},
      fetch: () => {}
    };
  }

  render = () => {
    return (
      <div style={{ margin: "0 15vw 0 15vw" }}>
        <Segment style={{ marginTop: "2rem" }}>
          <Search setValue={(val) => this.setState(val)} />
          <NewForm
            formType={this.state.formType}
            formData={this.state.formData}
            resetType={(user) => {
              this.setState({ formType: "Add", formData: user });
              this.state.fetch();
            }}
          />
        </Segment>
        <br />
        <Contacts
          searchValue={{ val: this.state.val, opr: this.state.opr }}
          setFetch={(fetch) => this.setState({ fetch })}
          editRqst={(formType, formData) =>
            this.setState({ formType, formData })
          }
        />
      </div>
    );
  };
}

export default App;

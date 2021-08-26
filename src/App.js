import React, { Component } from "react";
import shortid from "shortid";

import { alert, defaultModules } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";

import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import Contacts from "./components/Contacts/Contacts";

import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { name: "Misha", id: "001", number: "645-17-19" },
      { name: "Masha", id: "002", number: "443-89-12" },
      { name: "Dasha", id: "003", number: "459-12-56" },
    ],
    filter: "",
  };

  filterleInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  handleSubmit = (data) => {
    const id = shortid.generate();
    const contactObject = { ...data, id };
    if (
      this.state.contacts.find(
        (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `${data.name} is olready in contacts`,
      });
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contactObject],
      }));
    }
  };
  deleteContact = (e) => {
    const { id } = e.currentTarget;
    const visiblecontact = this.state.contacts.filter(
      (contacts) => !contacts.id.includes(id)
    );
    this.setState({ contacts: visiblecontact });
  };

  render() {
    const { filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visiblecontact = this.state.contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <Form submit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filterInput={this.filterleInputChange} filterValue={filter} />
        <Contacts
          contacts={visiblecontact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;

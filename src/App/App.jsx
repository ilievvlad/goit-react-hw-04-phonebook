import { Component } from "react";
import { Container, Title } from "./App.styled";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from "Components/ContactForm/ContactForm";
import { ContactList } from "Components/ContactList/ContactList";
import { Filter } from "Components/Filter/Filter";

const STORAGE_KEY = 'contacts';

export class App extends Component {
	state = {
		contacts: [],
		filter: ''
	};

	componentDidMount() {
		const storedContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
		if (storedContacts) {
			this.setState({ contacts: storedContacts });
		}
	};

	componentDidUpdate(_, prevState) {
		const { contacts } = this.state;
		if (prevState.contacts !== contacts) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
		}
	};

	handleAddContact = ({ name, number }) => {
		const names = this.state.contacts.map(contact => contact.name);
		if (names.indexOf(name) >= 0) {
			Notify.failure(`${name} is already in contacts !`);
			return;
		}
		this.setState(prevState => {
			return {
				contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
			};
		});
	};

	handleDelete = idx => {
		this.setState(prevState => {
			const newContactsList = prevState.contacts.filter(contact => contact.id !== idx);
			return { contacts: newContactsList };
		});
	};

	handleFilter = e => {
		this.setState({ filter: e.target.value });
	};

	handleContacts = () => {
		const { filter, contacts } = this.state;

		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		);
	};

	render() {
		const { filter } = this.state;

		return (
			<Container>
				<Title>Phonebook</Title>
				<ContactForm onSubmit={this.handleAddContact} />

				<Title>Contacts</Title>
				<Filter value={filter} onFilter={this.handleFilter} />
				<ContactList contacts={this.handleContacts()} onDelete={this.handleDelete} />
			</Container>
		);
	}
};

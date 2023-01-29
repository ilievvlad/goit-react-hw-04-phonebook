import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container, Title } from "./App.styled";

import { ContactForm } from "Components/ContactForm/ContactForm";
import { ContactList } from "Components/ContactList/ContactList";
import { Filter } from "Components/Filter/Filter";

const STORAGE_KEY = 'contacts';

export const App = () => {
	const [contacts, setContacts] = useState(() => {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
	});
	const [filter, setFilter] = useState('');

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
	}, [contacts]);

	const addContact = ({ name, number }) => {
		const names = contacts.map(contact => contact.name);

		if (names.indexOf(name) >= 0) {
			Notify.failure(`${name} is already in contacts !`);
			return;
		}

		setContacts(prevContacts => [
			...prevContacts, { id: nanoid(), name, number }
		]);
	}

	const deleteContact = idx => {
		setContacts(prevState => [
			...prevState.filter(contact => contact.id !== idx)
		]);
	};

	const changeFilter = filter => {
		setFilter(filter);
	};

	const getFilteredContacts = () => {
		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		);
	};

	return (
		<Container>
			<Title>Phonebook</Title>
			<ContactForm onSubmit={addContact} />

			<Title>Contacts</Title>
			<Filter value={filter} onFilter={changeFilter} />
			<ContactList contacts={getFilteredContacts()} onDelete={deleteContact} />
		</Container>
	);
}

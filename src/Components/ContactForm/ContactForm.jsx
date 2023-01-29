import { useState } from 'react';
import { PropTypes } from "prop-types";

import { Form, Title, Input, Button } from "./ContactForm.styled";

export const ContactForm = ({ onSubmit }) => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const data = { name, number };

	const handleChange = e => {
		switch (e.target.name) {
			case 'name':
				setName(e.target.value);
				break;

			case 'number':
				setNumber(e.target.value);
				break;

			default:
				return 0;
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(data);
		setName('');
		setNumber('');
	};



	return (
		<Form onSubmit={handleSubmit}>
			<label>
				<Title>Name</Title>
				<Input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					placeholder="Enter your name"
					value={name}
					onChange={handleChange}
				/>
			</label>
			<label>
				<Title>Number</Title>
				<Input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					placeholder="Enter your phone"
					value={number}
					onChange={handleChange}
				/>
			</label>
			<Button type="submit">Add contact</Button>
		</Form>
	);
};

ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
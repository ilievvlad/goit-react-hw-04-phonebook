import { PropTypes } from "prop-types";
import { Input, Label, Title } from "./Filter.styled";

export const Filter = ({ value, onFilter }) => {

	return (
		<Label>
			<Title>Find contacts by name</Title>
			<Input
				type="text"
				placeholder="Enter contact name"
				value={value}
				onChange={e => onFilter(e.target.value)}
			/>
		</Label>
	);
};

Filter.propTypes = {
	value: PropTypes.string.isRequired,
	onFilter: PropTypes.func.isRequired
};
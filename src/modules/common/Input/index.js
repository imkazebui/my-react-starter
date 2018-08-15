import React from 'react';
import { connect } from 'react-redux';

import { Input } from 'reactstrap';

import { seat_list, year_list } from '../../../constants';

import { getListBranchesAction } from '../../common/App';

class TBSelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { dispatch, listBranches, token } = this.props;
		if (listBranches.length === 0) {
			dispatch(getListBranchesAction(token));
		}
	}
	render() {
		const { name, id, onChange, value, listBranches, isDisabled = false, province = false } = this.props;
		return (
			<Input type="select" name={name} id={id} onChange={onChange} value={value} disabled={isDisabled}>
				{listBranches.length > 0 &&
					listBranches.map(item => (
						<option key={item.id} value={province ? item.display_name : item.id}>
							{item.display_name}
						</option>
					))}
			</Input>
		);
	}
}
export default connect(
	state => ({ listBranches: state.app.listBranches, token: state.auth.token }),
	dispatch => ({ dispatch })
)(TBSelectInput);

export const SeatInput = ({ name, id, onChange, value, isDisabled = false }) => {
	return (
		<Input type="select" name={name} id={id} onChange={onChange} value={value} disabled={isDisabled}>
			{seat_list.length > 0 &&
				seat_list.map((item, id) => (
					<option key={id} value={item}>
						{item}
					</option>
				))}
		</Input>
	);
};

export const YearInput = ({ name, id, onChange, value, isDisabled = false }) => {
	return (
		<Input type="select" name={name} id={id} onChange={onChange} value={value} disabled={isDisabled}>
			{year_list.length > 0 &&
				year_list.map((item, id) => (
					<option key={id} value={item}>
						{item}
					</option>
				))}
		</Input>
	);
};

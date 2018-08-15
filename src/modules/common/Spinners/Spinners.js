import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Modal, ModalBody } from 'reactstrap';

import { connect } from 'react-redux';

import 'spinkit/css/spinkit.css';
import styles from './styles.scss';

class Spinners extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			this.props.isFetching && (
				<Modal fade={false} isOpen={true} id="spinners">
					<div className="sk-fading-circle">
						<div className="sk-circle1 sk-circle" />
						<div className="sk-circle2 sk-circle" />
						<div className="sk-circle3 sk-circle" />
						<div className="sk-circle4 sk-circle" />
						<div className="sk-circle5 sk-circle" />
						<div className="sk-circle6 sk-circle" />
						<div className="sk-circle7 sk-circle" />
						<div className="sk-circle8 sk-circle" />
						<div className="sk-circle9 sk-circle" />
						<div className="sk-circle10 sk-circle" />
						<div className="sk-circle11 sk-circle" />
						<div className="sk-circle12 sk-circle" />
					</div>
				</Modal>
			)
		);
	}
}

export default connect(state => ({ isFetching: state.app.isFetching }))(Spinners);

import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="app-footer">
				<span>
					<a href="#">Express</a> &copy; 2018 ThanhBuoi Inc.
				</span>
				<span className="ml-auto">
					Powered by <a href="https://mobytelab.com/">MobyteLab</a>
				</span>
			</footer>
		);
	}
}

export default Footer;

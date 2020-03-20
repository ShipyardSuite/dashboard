import React, { Component } from 'react';

import { LoadingSpinner } from './../';
import { Container, Button, Menu, Segment, Image } from 'semantic-ui-react';
import { getFromStorage } from './../../utils/storage';

export default class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	logout() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			fetch('/auth/api/logout?id=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					localStorage.removeItem('botany-bay');

					window.location.replace('http://localhost:8080/auth/login');
				}
			});
		}
	}

	handleItemClick(name) {
		this.setState({ activeItem: name });
	}

	render() {
		const { isLoading } = this.props;

		return (
			<div>
				<LoadingSpinner isLoading={isLoading} unmountOnHide />
				{!isLoading && (
					<Container fluid>
						<Button onClick={this.logout.bind(this)}>Logout</Button>
						<div>{this.props.children}</div>
					</Container>
				)}
			</div>
		);
	}
}

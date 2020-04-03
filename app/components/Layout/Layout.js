'use strict';

import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { LoadingSpinner } from './../LoadingSpinner';
import { getFromStorage } from './../../utils/storage';

/**
 * Default class for react Application
 * @class App
 */
export default class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			token: [],
			user: [],
			projects: []
		};
	}

	componentDidMount() {
		document.title = 'Dashboard';

		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			this.setState({ token: obj.token }, () => {
				//this.getUser();
			});
		}
	}

	logout() {
		const { token } = this.state;

		if (token) {
			fetch(`http://${window.location.host}/auth/api/logout?id=` + token)
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						localStorage.removeItem('botany-bay');

						window.location.replace(`http://${window.location.host}/auth/login`);
					}
				});
		}
	}

	getUser() {}

	getProjects() {}

	/**
	 * Renders the current react component.
	 * @method render
	 */
	render() {
		const { isLoading } = this.props;
		return (
			<div>
				<LoadingSpinner isLoading={isLoading} unmountOnHide />
				{!isLoading && (
					<Container fluid>
						<Button onClick={this.logout.bind(this)}>Logout User</Button>
						<div>{this.props.children}</div>
					</Container>
				)}
			</div>
		);
	}
}

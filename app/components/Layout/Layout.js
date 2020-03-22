import React, { Component } from 'react';

import { LoadingSpinner } from './../';
import { Container, Button, Menu, Segment, Image } from 'semantic-ui-react';
import { getFromStorage } from './../../utils/storage';

export default class Layout extends Component {
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
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			this.setState({ token: obj.token }, () => {
				this.getUser();
			});
		}
	}

	logout() {
		const { token } = this.state;

		if (token) {
			fetch('/auth/api/logout?id=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					localStorage.removeItem('botany-bay');

					window.location.replace('http://localhost:8080/auth/login');
				}
			});
		}
	}

	getUser() {
		const { token } = this.state;

		if (token) {
			fetch('/user/api/?id=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState(
						{
							loggedIn: true,
							user: json.data.user
						},
						() => {
							this.getUserProjects();
						}
					);
				}
			});
		} else {
			this.setState({
				loggedIn: false
			});
		}
	}

	/**
 	* @todo Method should get a list of all user projects
 	* @body Project microservice needs to be implemented and connected to this.
 	*/
	getUserProjects() {}

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
						<Button onClick={this.logout.bind(this)}>Logout User</Button>
						<div>{this.props.children}</div>
					</Container>
				)}
			</div>
		);
	}
}

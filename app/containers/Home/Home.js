'use strict';

import React from 'react';

import { Layout } from './../../components';

import { getFromStorage } from './../../utils/storage';

/**
 * Default class for react Application
 * @class App
 */
export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: ''
		};
	}

	componentDidMount() {
		document.title = 'Dashboard';

		const obj = getFromStorage('botany-bay');

		if (obj && obj.token !== '') {
		} else {
			window.location.replace(`http://${window.location.host}/auth/login`);
		}

		if (obj && obj.token) {
			const { token } = obj;

			fetch(`http://${window.location.host}/auth/api/token?token=` + token)
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						this.setState({
							token,
							isLoading: false
						});
					} else {
						this.setState({
							isLoading: false,
							userData: []
						});
					}
				});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	/**
	 * Renders the current react component.
	 * @method render
	 */
	render() {
		const { isLoading } = this.state;

		return <Layout isLoading={isLoading}>Dashboard Home</Layout>;
	}
}

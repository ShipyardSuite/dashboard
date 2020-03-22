'use strict';

import React, { Component } from 'react';

import { Segment, Loader, Dimmer } from 'semantic-ui-react';

import { Layout } from './../../components';
import { getFromStorage } from './../../utils/storage';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			userData: []
		};
	}

	componentDidMount() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token !== '') {
		} else {
			window.location.replace('http://localhost:8080/auth/login');
		}

		if (obj && obj.token) {
			const { token } = obj;

			fetch('/auth/api/token?id=' + token).then((res) => res.json()).then((json) => {
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

	render() {
		const { isLoading } = this.state;

		return <Layout isLoading={isLoading}>test</Layout>;
	}
}

export default Home;

/*

*/

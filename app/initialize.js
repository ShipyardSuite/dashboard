'use strict';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from 'App';

import { Home } from './containers';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Router>
			<App>
				<Switch>
					<Route exact path="*/" component={Home} />
				</Switch>
			</App>
		</Router>,
		document.querySelector('#app')
	);
});

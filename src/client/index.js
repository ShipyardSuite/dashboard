import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import { Overview, NotFound } from './containers';
import { Layout } from './components';

document.addEventListener('DOMContentLoaded', () => 
{
    ReactDOM.render(
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="*/overview" component={Overview} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>,
        document.querySelector('#app')
    );
});

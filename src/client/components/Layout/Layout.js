import React from 'react';
import { 
    withRouter, 
        
    // NavLink
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { i18nManager } from '@shipyardsuite/i18n-manager';

import { 
    Container,
    Grid
} from 'semantic-ui-react';

import './Layout.sass';

class Layout extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = {
            language: navigator.language.slice(0,2) || 'en'
        };

        this.i18nManager = new i18nManager(this.state.language);
    }

    render() 
    {
        return (
            <Container fluid className="Layout">
                <Grid celled='internally'>
                    <Grid.Row className="outline">
                        <Grid.Column width={3} className="sidebar">
                            Sidebar...
                        </Grid.Column>
                        <Grid.Column width={13} className="content">
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
                
        );
    }
}

Layout.propTypes = {
    children: PropTypes.array
};

export default withRouter(Layout);



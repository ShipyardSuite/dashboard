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

//import './Layout.sass';

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
            <Container fluid>
                <Grid celled='internally'>
                    <Grid.Row style={{ height: '100vh' }}>
                        <Grid.Column width={3} style={{ padding: 0, background: '#1b1c1d' }}>
                            Sidebar...
                        </Grid.Column>
                        <Grid.Column width={13} style={{ padding: 0 }}>
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

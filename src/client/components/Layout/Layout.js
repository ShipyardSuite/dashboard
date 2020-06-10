import React from 'react';
import { 
    withRouter, 
        
    // NavLink
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { i18nManager } from '@shipyardsuite/i18n-manager';

import { LoadingSpinner } from './../';

import { 
    Container,
    Grid,
    Button,
    Header,
    Image
} from 'semantic-ui-react';

import { getFromStorage, sidebarMenu } from './../../utils';

import './Layout.sass';

class Layout extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = {
            language: navigator.language.slice(0,2) || 'en',
            menuItems: sidebarMenu,
            user: [],
            token: '',
            isLoading: true,
            activeMenu: 'overview',
        };

        this.i18nManager = new i18nManager(this.state.language);
    }

    componentDidMount()
    {
        const obj = getFromStorage('botany-bay');

        if (obj && obj.token)
        {
            const { token } = obj;
    
            fetch(`http://${window.location.host}/auth/api/token?token=` + token)
                .then((res) => res.json())
                .then((json) =>
                {
                    if (json.success)
                    {
                        this.setState({
                            token,
                            isLoading: false
                        }, () =>
                        {
                            this.getUser();
                        });
                    } 
                    else 
                    {
                        this.redirectToLogin();
                    }
                });
        }
        else 
        {
            this.redirectToLogin();
        }
    }

    redirectToLogin()
    {
        window.location.replace(`http://${window.location.host}/auth/login`);
    }

    getUser()
    {
        fetch(`/user/api/token?token=${this.state.token}`).then((res) => res.json()).then((json) =>
        {
            console.log(json);

            if (json.success)
            {
                //this.setState({ user: json.data.user, isLoading: false }, () =>
                //{
                    
                    //this.getProjects();
                //});
            }
        });
    }

    handleItemClick(name)
    {
        this.setState({ activeMenu: name });
    }

    render()
    {
        const { isLoading, activeMenu, menuItems, user } = this.state;

        console.log(user);

        return (
            <div>
                {isLoading ?
                    (
                        <LoadingSpinner isLoading={isLoading} unmountOnHide />
                    ) : (
                        <Container fluid className="Layout">
                            <Grid celled='internally'>
                                <Grid.Row className="outline">
                                    <Grid.Column width={3} className="sidebar-area">

                                        <Button fluid secondary attached="top" className="user-button">
                                            <Header as='h4' textAlign="left" inverted>
                                                <Image size="tiny" circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
                                                <Header.Content>
                                                    {user.email}
                                                    <Header.Subheader>TestProject1</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Button>

                                    </Grid.Column>
                                    <Grid.Column width={13} className="content-area">

                                        {this.props.children}

                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    )
                }
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.array
};

export default withRouter(Layout);

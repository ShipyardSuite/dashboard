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
    Icon,
    Grid,
    Button,
    Header,
    Menu,
    Image,
    Segment,
    Sidebar
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
            sectionSelector: false
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
                            token
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
            if (json.success)
            {
                this.setState({ user: json.data.user, isLoading: false }, () =>
                {
                    
                    //this.getProjects();
                });
            }
        });
    }

    handleItemClick(name)
    {
        this.setState({ activeMenu: name });
    }

    handleSectionSelector(state)
    {
        this.setState({ sectionSelector: state });
    }

    render()
    {
        const { isLoading, activeMenu, menuItems, user, sectionSelector } = this.state;

        console.log(sectionSelector);

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

                                        <Segment raised style={{ padding: 0, borderRadius: 0, margin: 0, boxShadow: 'none' }}>

                                            <Sidebar.Pushable>
                                                <Sidebar
                                                    as={Menu}
                                                    direction="left"
                                                    animation="push"
                                                    style={{ background: '#ffffff', boxShadow: 'none' }}
                                                    fluid
                                                    secondary
                                                    onHide={() => this.handleSectionSelector.bind(this, false )}
                                                    visible={sectionSelector}
                                                >
                                                    <Menu.Menu position='right'>
                                                        <Menu.Item as='a'>
                                                            <Icon name='home'/>
                                                            Project
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='chart line'/>
                                                            Statistics
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='box'/>
                                                            Assets
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='trophy'/>
                                                            Achievements
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='gamepad'/>
                                                            Messaging
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='language'/>
                                                            Translations
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='currency'/>
                                                            Currencies
                                                        </Menu.Item>
                                                        <Menu.Item as='a'>
                                                            <Icon name='gamepad'/>
                                                            Game Server
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Button icon="cancel" circular onClick={this.handleSectionSelector.bind(this, false)}></Button>
                                                        </Menu.Item>
                                                    </Menu.Menu>
                                                </Sidebar>
                                                <Sidebar.Pusher>
                                                    <Segment basic >
                                                        <Grid >
                                                            <Grid.Row>
                                                                <Grid.Column width={8}>
                                                                    <Header as="h4">Section Header</Header>
                                                                </Grid.Column>
                                                                <Grid.Column width={8}>                                            
                                                                    <Button icon="th" circular floated="right" onClick={this.handleSectionSelector.bind(this, true)}></Button>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>                                        
                                                    </Segment>
                                                </Sidebar.Pusher>
                                            </Sidebar.Pushable>
                                        </Segment>

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

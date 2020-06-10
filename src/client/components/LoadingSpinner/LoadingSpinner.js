import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Segment, Loader, Dimmer, Transition } from 'semantic-ui-react';

import './LoadingSpinner.sass';

export default class LoadingSpinner extends Component
{
    constructor(props)
    {
        super(props);
    }
	
    render()
    {
        const { isLoading } = this.props;

        return (
            <Transition visible={isLoading} animation="fade" duration={500}>
                <Segment className="LoadingSpinner" basic>
                    <Dimmer active inverted>
                        <Loader size="massive" />
                    </Dimmer>
                </Segment>
            </Transition>
        );
    }
}

LoadingSpinner.propTypes = {
    isLoading: PropTypes.bool
};

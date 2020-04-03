import React, { Component } from 'react';

import { Segment, Loader, Dimmer, Transition } from 'semantic-ui-react';

export default class ExampleComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { isLoading } = this.props;

		return (
			<Transition visible={isLoading} animation="fade" duration={500}>
				<Segment basic style={{ height: '100vh' }}>
					<Dimmer active inverted>
						<Loader size="massive" />
					</Dimmer>
				</Segment>
			</Transition>
		);
	}
}

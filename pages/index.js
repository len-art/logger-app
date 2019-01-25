import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raiseError: false,
    };
  }

  componentDidUpdate() {
    if (this.state.raiseError) {
      throw new Error('Houston, we have a problem');
    }
  }

  handleTestUpdateClick = () => {
    this.props.store.handleTestChange();
  };

  raiseError = () => {
    this.setState({ raiseError: true });
  };

  render() {
    return (
      <div>
        {this.props.store.test}
        <button onClick={() => this.handleTestUpdateClick()}>Test update</button>
        <button onClick={() => this.raiseError()}>Test error reporting</button>
      </div>
    );
  }
}

export default IndexPage;

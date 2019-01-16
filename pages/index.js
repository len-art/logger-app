import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CONSTANTS_TEST } from 'constants';

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
    console.log(this.props.store);
    this.props.store.example.setTest();
  }

  raiseError = () => {
    this.setState({ raiseError: true });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>{CONSTANTS_TEST}</div>
        <div>{this.props.store.example.test}</div>
        <button onClick={() => this.handleTestUpdateClick()}>Test update</button>
        <button onClick={() => this.raiseError()}>Test error reporting</button>
      </div>
    );
  }
}

export default IndexPage;

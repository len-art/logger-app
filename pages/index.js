import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CONSTANTS_TEST } from 'constants';

@inject('store')
@observer
class IndexPage extends Component {
  componentDidMount() {
    // this.props.store.example.testAction('UPDATED');
  }

  handleTestUpdateClick = () => {
    console.log(this.props.store);
    this.props.store.example.setTest();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>{CONSTANTS_TEST}</div>
        <div>{this.props.store.example.test}</div>
        <button onClick={() => this.handleTestUpdateClick()}>Test update</button>
      </div>
    );
  }
}

export default IndexPage;

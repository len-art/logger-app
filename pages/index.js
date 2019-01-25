import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const columns = ['day', 'start', 'end', 'hours', 'description'];
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
        <h1>Work logger</h1>
        <p>Log your work hours</p>
        <div className="justFlex">
          {/* buttons */}
          <button>Start work day</button>
          <button>End</button>
        </div>
        <div>
          <div className="list">
            {columns.map(name => (
              <div key={name} className={name}>
                {name}
              </div>
            ))}
            {columns.map(name => (
              <div key={name} className={name}>
                nekaj
              </div>
            ))}
          </div>
        </div>
        <style jsx>
          {`
            .justFlex {
              display: flex;
            }
            .list {
              display: grid;
              grid-template-columns: repeat(4, 0.5fr) 3fr;
              grid-template-areas: 'day start end hours description';
              grid-column-gap: 10px;
              grid-row-gap: 10px;
            }
            .list > div {
              padding: 10px;
              background-color: #eee;
            }
          `}
        </style>
      </div>
    );
  }
}

export default IndexPage;

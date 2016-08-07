import React from 'react';
import ReactDOM from 'react-dom';

class Box extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box">
        <b>Current box:</b> {this.props.content || 'No content'}
      </div>
    );
  }

}


class BoxList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let key = 0;
    let boxeNodes = this.props.list.map(item => {
      key++;
      return <Box key={key} content={item}/>;
    });

    return (
      <div className="box-list">
        <Box/>
        {boxeNodes}
      </div>
    );
  }

}

BoxList.defaultProps = {
  list: ['A', 'B', 'C']
};


ReactDOM.render(<BoxList/>, document.getElementById('content'));

export default Box;

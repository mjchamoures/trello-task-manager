// component for a task card that is a child of a StatusPanel comp


import React from 'react';
import { Col, Row, Panel, Form } from 'react-bootstrap';



class TaskCard extends React.Component {


  constructor(props) {

    super(props);

  }

  render() {

    var cardTitle = (<h4>{this.props.title}</h4>)

    return (

      <Panel >
        {cardTitle}
        {this.props.description}
      </Panel>

    );

  }



}

export default TaskCard;
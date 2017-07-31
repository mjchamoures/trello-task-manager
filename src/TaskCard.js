// component for a task card that is a child of a StatusPanel comp


import React from 'react';
import { Col, Row, Panel, Form } from 'react-bootstrap';



class TaskCard extends React.Component {


  constructor(props) {

    super(props);

  }

  render() {

    return (

      <Panel>

        <span 
          className={"glyphicon glyphicon-remove small pull-right"} 
          style={{"cursor" : "pointer", "color" : "red"}}
          onClick={() => this.props.removeTaskClickHandler(this.props.taskId)}>
        </span>

        <h4 style={{ "wordBreak": "break-word" }}> 
          {this.props.title} 
          <span 
            className={"glyphicon glyphicon-pencil small"} 
            style={{"cursor" : "pointer", "marginLeft": "5px"}}
            onClick={this.testFunc}>
          </span>
        </h4>

        {this.props.description}
      </Panel>

    );

  }

  testFunc() {

    console.log("Dd");
  }



}

export default TaskCard;
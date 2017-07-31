// component for a task card that is a child of a StatusPanel comp


import React from 'react';
import { Col, Row, Panel, Form, ControlLabel } from 'react-bootstrap';



class TaskCard extends React.Component {


  constructor(props) {

    super(props);
    this.editTaskClickHandler = this.editTaskClickHandler.bind(this);

  }

  render() {

    return (

      <Panel>

        <span 
          className={"glyphicon glyphicon-remove small pull-right aria-hidden='true'"} 
          style={{"cursor" : "pointer", "color" : "red"}}
          onClick={() => this.props.removeTaskClickHandler(this.props.taskId)}>
        </span>

        <h4 style={{ "wordBreak": "break-word" }}> 
          {this.props.title} 
          <span 
            className={"glyphicon glyphicon-pencil small aria-hidden='true'"} 
            style={{"cursor" : "pointer", "marginLeft": "5px"}}
            onClick={this.editTaskClickHandler}>
          </span>
        </h4>

        {this.props.description}

        <div style={{"marginTop" : "10px"}}>
          <span className={"glyphicon glyphicon-time small pull-left aria-hidden='true'"} style={{"top" : "5px"}}></span>
          <span className={"small"} style={{"paddingLeft":"5px"}}>{this.props.updatedAt}</span>
        </div>
      </Panel>

    );

  }

  editTaskClickHandler() {

    var currentTask = {
      taskId : this.props.taskId,
      title : this.props.title,
      description : this.props.description
    };

    this.props.editTaskClickHandler(currentTask);

  }



}

export default TaskCard;
/* component for a task card that is a child of a TaskPanel comp
 * 
 * Author : Michael Chamoures
 * Date : 7/31/17
 *
 */ 

import React from 'react';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

class TaskCard extends React.Component {


  constructor(props) {

    super(props);
    this.editTaskClickHandler = this.editTaskClickHandler.bind(this);

  }

  render() {

    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <div>
      <Panel>

        <span 
          className={"glyphicon glyphicon-remove small pull-right aria-hidden='true'"} 
          style={{"cursor" : "pointer", "color" : "red"}}
          onClick={() => this.props.removeTaskClickHandler(this.props.task.taskId)}>
        </span>

        <h4 style={{ "wordBreak": "break-word" }}> 
          {this.props.task.title} 
          <span 
            className={"glyphicon glyphicon-pencil small aria-hidden='true'"} 
            style={{"cursor" : "pointer", "marginLeft": "5px", "color":"darkcyan"}}
            onClick={this.editTaskClickHandler}>
          </span>
        </h4>

        {this.props.task.description}

        <div style={{"marginTop" : "10px"}}>
          <span className={"glyphicon glyphicon-time small pull-left aria-hidden='true'"} style={{"top" : "5px"}}></span>
          <span className={"small"} style={{"paddingLeft":"5px"}}>{this.props.task.updatedAt}</span>
        </div>
      </Panel>
      </div>
    ));

  }

  editTaskClickHandler() {
    var currentTask = {
      taskId : this.props.task.taskId,
      title : this.props.task.title,
      description : this.props.task.description
    };

    this.props.editTaskClickHandler(currentTask);

  }

}

const taskSource = {
  beginDrag(props) {    
    return {      
      index: props.index,
      panelId: props.task.panelId,
      task: props.task
    };
  },

  endDrag(props, monitor) {
    // nothing for now
  }
};


const taskTarget = {};

export default flow(
  DropTarget("TASKCARD", taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("TASKCARD", taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(TaskCard);
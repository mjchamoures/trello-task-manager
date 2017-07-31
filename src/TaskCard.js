// component for a task card that is a child of a StatusPanel comp


import React from 'react';
import { Col, Row, Panel, Form, ControlLabel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';




class TaskCard extends React.Component {


  constructor(props) {

    super(props);
    this.editTaskClickHandler = this.editTaskClickHandler.bind(this);

  }

  render() {

    const { card, isDragging, connectDragSource, connectDropTarget } = this.props;

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
      statusId: props.task.statusId,
      task: props.task
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult(); 

    // if ( dropResult && dropResult.statusId !== item.listId ) {
    //   props.removeCard(item.index);
    // }
  }
};



const taskTarget = {

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().statusId;  

    // Don't replace items with themselves
    // if (dragIndex === hoverIndex) {
    //   return;
    // }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if ( props.statusId === sourceListId ) {
      props.moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }   
  }
};

export default flow(
  DropTarget("TASKCARD", taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("TASKCARD", taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(TaskCard);
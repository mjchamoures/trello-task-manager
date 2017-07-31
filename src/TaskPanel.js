/* generic status panel that contains a list of Task Cards
 * 
 * Author : Michael Chamoures
 * Date : 7/31/17
 *
 * NOTE: Used https://github.com/rafaelquintanilha/experiments/tree/master/sortable-target as example for dragNDrop
 */ 

import React from 'react';
import { Panel, Button, Modal } from 'react-bootstrap';
import TaskCard from './TaskCard.js';
import TaskCardAddEditModal from './TaskCardAddEditModal.js';
import { DropTarget } from 'react-dnd';


class TaskPanel extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      showModal : false,
      currentTask : {},
      actionType : ""
    };

    this.saveTaskClickHandler = this.saveTaskClickHandler.bind(this);
    this.editTaskClickHandler = this.editTaskClickHandler.bind(this);
    this.addTaskClickHandler = this.addTaskClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.moveTask = this.moveTask.bind(this);
  }

  render() {

    var taskCards = [];

    for(var i = 0; i < this.props.tasks.length; i++) {
      var taskCard = (
        <TaskCard
          index={i}
          task={this.props.tasks[i]}
          key={this.props.tasks[i].taskId} 
          removeTaskClickHandler={(taskId) => this.props.removeTaskClickHandler(taskId)}
          editTaskClickHandler={(task) => this.editTaskClickHandler(task)}
          moveTask={this.moveTask}
        />
      );
      taskCards.push(taskCard);
    };

    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        <Panel style={{"background" : "#f5f5f5"}}>
          
          <h4 style={{"fontWeight" : "bold"}}>{this.props.title}</h4>
          
          {taskCards}

          <Button bsSize="small" onClick={this.addTaskClickHandler}>Add Task</Button>
        </Panel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <TaskCardAddEditModal 
            saveTaskClickHandler={this.saveTaskClickHandler}
            type={this.state.actionType}
            task={this.state.currentTask}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );

  }

  addTaskClickHandler() {
    this.setState({
      showModal : true,
      currentTask : {"title" : "", "description" : ""},
      actionType : "create"
    });
  }

  editTaskClickHandler(task) {

    this.setState({
      showModal : true,
      currentTask : {taskId : task.taskId, title : task.title, description : task.description},
      actionType : "update"
    });

  }

  closeModal() {
    this.setState({
      showModal : false,
      currentTask : {"title" : "", "description" : ""}
    });
  }

  saveTaskClickHandler(task) {
    var newTask = {
      title : task.title,
      description : task.description,
      panelId : this.props.panelId,
      taskId : task.taskId
    };

    this.props.saveTaskClickHandler(newTask);
    this.closeModal();
  }

  moveTask(dragTask, hoverIndex) {
    dragTask.panelId = hoverIndex;
    this.props.saveTaskClickHandler(dragTask);
  }


};

const taskTarget = {
  drop(props, monitor, component ) {
    const { panelId } = props;
    const sourceObj = monitor.getItem();    
    if ( panelId !== sourceObj.panelId ) component.moveTask(sourceObj.task, panelId);
    return {
      panelId: panelId
    };
  }
}

export default DropTarget("TASKCARD", taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(TaskPanel);








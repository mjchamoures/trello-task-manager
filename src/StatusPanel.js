// generic status panel


import React from 'react';
import { Row, Col, Panel, Button, Modal } from 'react-bootstrap';
import TaskCard from './TaskCard.js';
import AddEditTaskCard from './AddEditTaskCard.js';
import { DropTarget } from 'react-dnd';


class StatusPanel extends React.Component {


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

    var statusTitle = (<h4 style={{"fontWeight" : "bold"}}>{this.props.title}</h4>)
    const { canDrop, isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        <Panel style={{"background" : "#f5f5f5"}}>
          
          {statusTitle}
          
          {taskCards}

          <Button bsSize="small" onClick={this.addTaskClickHandler}>Add Task</Button>
        </Panel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <AddEditTaskCard 
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
    var task = {
      title : task.title,
      description : task.description,
      statusId : this.props.statusId,
      taskId : task.taskId
    };

    this.props.saveTaskClickHandler(task);
    this.closeModal();
  }

  moveTask(dragTask, hoverIndex) {
    // var dragTask = this.props.tasks[dragIndex];
    dragTask.statusId = hoverIndex;

    this.props.saveTaskClickHandler(dragTask);

  }


};

const taskTarget = {
  drop(props, monitor, component ) {
    const { statusId } = props;
    const sourceObj = monitor.getItem();    
    if ( statusId !== sourceObj.statusId ) component.moveTask(sourceObj.task, statusId);
    return {
      statusId: statusId
    };
  }
}

export default DropTarget("TASKCARD", taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(StatusPanel);








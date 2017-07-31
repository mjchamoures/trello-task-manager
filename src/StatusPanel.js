// generic status panel


import React from 'react';
import { Row, Col, Panel, Button, Modal } from 'react-bootstrap';
import TaskCard from './TaskCard.js';
import AddEditTaskCard from './AddEditTaskCard.js';


class StatusPanel extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      showModal : false
    };

    this.saveTaskClickHandler = this.saveTaskClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  render() {

    var taskCards = [];

    for(var i = 0; i < this.props.tasks.length; i++) {
      var taskCard = (
        <TaskCard
          taskId={this.props.tasks[i].taskId} 
          title={this.props.tasks[i].title}
          description={this.props.tasks[i].description}
          updatedAt={this.props.tasks[i].updatedAt}
          key={this.props.tasks[i].taskId} 
          removeTaskClickHandler={(taskId) => this.props.removeTaskClickHandler(taskId)}
          editTaskClickHandler={() => this.editTaskClickHandler()}
        />
      );
      taskCards.push(taskCard);
    };

    var statusTitle = (<h4 style={{"fontWeight" : "bold"}}>{this.props.title}</h4>)

    return (
      <div>
        <Panel style={{"background" : "#f5f5f5"}}>
          
          {statusTitle}
          
          {taskCards}

          <Button bsSize="small" onClick={this.openModal}>Add Task</Button>
        </Panel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <AddEditTaskCard 
            saveTaskClickHandler={this.saveTaskClickHandler}
            type="create"
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );

  }

  openModal() {
    this.setState({
      showModal : true
    });
  }

  closeModal() {
    this.setState({
      showModal : false
    });
  }

  saveTaskClickHandler(task) {
    var task = {
      title : task.name,
      description : task.description,
      statusId : this.props.statusId,
      taskId : task.taskId
    };

    this.props.saveTaskClickHandler(task);
    this.closeModal();
  }




};


export default StatusPanel;


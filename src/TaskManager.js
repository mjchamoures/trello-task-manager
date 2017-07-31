// Task Manager


import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import StatusPanel from './StatusPanel.js';
import TaskManagerService from './TaskManagerService.js';


class TaskManager extends React.Component {


  constructor(props) {
    super(props);

    // based on this.props.projectId, fetch list of tasks
    // ex task structure would be:
    /*

      {
        taskId : 0,
        title : "Build View",
        description : "Need to build the View component for a task",
        statusId : 0,// maps to which status panel it belongs in 
        createdAt : "7/26/17"
        updatedAt : "7/27/17"
      }

    */
    this.taskManagerService = new TaskManagerService();
    var tasks = this.taskManagerService.getAllTasks();
    this.state = {
      tasks : tasks
    };

    this.saveTaskClickHandler = this.saveTaskClickHandler.bind(this);
    this.removeTaskClickHandler = this.removeTaskClickHandler.bind(this);

  }

  render() {

    var statusPanels = [];

    for(var i = 0; i < this.props.statusPanels.length; i++) {
      var tasks = this.state.tasks.filter((task) => {
        return task.statusId === this.props.statusPanels[i].statusId;
      });

      var statusPanel = (

        <Col xs={12} sm={4}>
          <StatusPanel 
            tasks={tasks} 
            title={this.props.statusPanels[i].title}
            statusId={this.props.statusPanels[i].statusId}
            key={this.props.statusPanels[i].statusId}
            saveTaskClickHandler={(task) => this.saveTaskClickHandler(task)}
            removeTaskClickHandler={this.removeTaskClickHandler}
          />
        </Col>

      );

      statusPanels.push(statusPanel);
    }

    return (

      <Row>

        {statusPanels}

      </Row>
    );

  }

  saveTaskClickHandler(task) {

    var newTasks = this.taskManagerService.addTask(task);

    this.setState({
      tasks: newTasks
    });
  }

  updateTaskDragDropHandler(task) {
    var newTasks = this.taskManagerService.addTask(task);

    this.setState({
      tasks: newTasks
    });

  }

  removeTaskClickHandler(taskId) {
    var newTasks = this.taskManagerService.removeTask(taskId);

    this.setState({
      tasks: newTasks
    });
  }






};


export default TaskManager;


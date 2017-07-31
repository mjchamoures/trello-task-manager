/* component managing tasks across status panels...calls service, etc.
 * 
 * Author : Michael Chamoures
 * Date : 7/31/17
 *
 */ 

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TaskPanel from './TaskPanel.js';
import TaskManagerService from './TaskManagerService.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TaskManager extends React.Component {


  constructor(props) {
    super(props);

    this.taskManagerService = new TaskManagerService();
    
    var tasks = this.taskManagerService.getAllTasks();

    this.state = {
      tasks : tasks
    };

    this.saveTaskClickHandler = this.saveTaskClickHandler.bind(this);
    this.removeTaskClickHandler = this.removeTaskClickHandler.bind(this);

  }

  render() {

    var taskPanels = [];

    /* Group tasks by their panelId (status) */
    var taskMap = {};
    this.state.tasks.forEach((task) => {
        const panelId = task.panelId;
        if (panelId in taskMap) {
          taskMap[panelId].push(task);
        } else {
          taskMap[panelId] = [task];  
        }
    });

    /* Build TaskPanel component for all panels defined by App.js */
    for(var i = 0; i < this.props.taskPanels.length; i++) {
      /* Filter out tasks specific to current taskPanel */
      var tasks = taskMap[this.props.taskPanels[i].panelId] || [];

      /* Build TaskPanel dom object */
      var taskPanel = (

        <Col xs={12} sm={4} key={i}>
          <TaskPanel 
            tasks={tasks} 
            title={this.props.taskPanels[i].title}
            panelId={this.props.taskPanels[i].panelId}
            key={this.props.taskPanels[i].panelId}
            saveTaskClickHandler={(task) => this.saveTaskClickHandler(task)}
            removeTaskClickHandler={this.removeTaskClickHandler}
          />
        </Col>

      );

      /* Add current component to the list */
      taskPanels.push(taskPanel);
    }

    return (

      <Row>

        {taskPanels}

      </Row>
    );

  }

  /* Called from save of TaskCardAddEditModal, or when a task is moved beween panels */
  saveTaskClickHandler(task) {
    var newTasks = [];

    // if task already exists, call update service, else call add service
    newTasks = typeof task.taskId !== "undefined" ? this.taskManagerService.updateTask(task) : this.taskManagerService.addTask(task);

    this.setState({
      tasks: newTasks
    });
  }

  /* Called when 'x' remove option is clicked from a TaskCard component */
  removeTaskClickHandler(taskId) {
    var newTasks = this.taskManagerService.removeTask(taskId);

    this.setState({
      tasks: newTasks
    });
  }

};

export default DragDropContext(HTML5Backend)(TaskManager);


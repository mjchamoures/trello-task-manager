// generic status panel


import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import TaskCard from './TaskCard.js';


class StatusPanel extends React.Component {


  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {

    var taskCards = [];

    for(var i = 0; i < this.props.tasks.length; i++) {
      var taskCard = (
        <TaskCard
          title={this.props.tasks[i].title}
          description={this.props.tasks[i].description}
          updatedAt={this.props.tasks[i].updatedAt}
          key={this.props.tasks[i].taskId} 
        />
      );
      taskCards.push(taskCard);
    };

    var statusTitle = (<h4 style={{"font-weight" : "bold"}}>{this.props.title}</h4>)

    return (

      <Panel style={{"background" : "#f5f5f5"}}>
        {statusTitle}
        {taskCards}
      </Panel>

    );

  }
};


export default StatusPanel;


// component for adding a new task card or updating an existing task card


import React from 'react';
import { Col, Row, Panel, Form, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}


class AddEditTaskCard extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      title : this.props.task.title,
      description : this.props.task.description,
      isValid : this.props.task.taskId ? true : false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.saveClickHandler = this.saveClickHandler.bind(this);

  }

  render() {

    var modalTitle = this.props.type === "create" ? "Create New Task" : "Edit Existing Task";

    return (
        <div>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FieldGroup
                id="taskName"
                type="text"
                label="Task Name"
                placeholder="Enter Name"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <FormGroup>
                <ControlLabel>Task Description</ControlLabel>
                <FormControl componentClass="textarea"
                  id="taskDescription"
                  style={{"maxWidth": "100%"}}
                  placeholder="Enter Description"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.props.closeModal()}>Cancel</Button>
            <Button bsStyle="primary" disabled={!this.state.isValid} onClick={this.saveClickHandler}>Save</Button>
          </Modal.Footer>
        </div>
    );

  }

  handleTitleChange(event) {
    var newTitle = event.target.value;
    this.setState({
      title: newTitle,
      isValid : newTitle !== ""
    });
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  saveClickHandler() {
    var task = {
      taskId : this.props.task.taskId,
      title : this.state.title,
      description : this.state.description
    }
    this.props.saveTaskClickHandler(task);
  }

}

export default AddEditTaskCard;
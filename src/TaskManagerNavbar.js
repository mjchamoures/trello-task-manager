import React from 'react';

class TaskManagerNavbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <nav className={"navbar navbar-default"}>
        <div className={"container-fluid"}>
          <div className={"navbar-header"}>
            <a className={"navbar-brand"} href="#">Trello Task Manager</a>
          </div>
        </div>
      </nav>

    );
  }
}

export default TaskManagerNavbar;
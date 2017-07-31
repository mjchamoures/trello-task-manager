// service file for all task related requests
// for now just mocking REST calls


class TaskManagerService {

  constructor() {

    this.tasks = [];
    this.idSequence = 0;

  }

  getAllTasks() {

    // var tasks = [
    //   {
    //     taskId : 0,
    //     title : "task 0",
    //     description : "Need to build the View component for a task",
    //     statusId : 0,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 1,
    //     title : "task 1",
    //     description : "Need to build the View component for a task",
    //     statusId : 0,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 2,
    //     title : "task 2",
    //     description : "Need to build the View component for a task",
    //     statusId : 1,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 3,
    //     title : "task 3",
    //     description : "Need to build the View component for a task",
    //     statusId : 1,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 4,
    //     title : "task 4",
    //     description : "Need to build the View component for a task",
    //     statusId : 2,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 5,
    //     title : "task 5",
    //     description : "Need to build the View component for a task",
    //     statusId : 2,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   },
    //   {
    //     taskId : 6,
    //     title : "task 6",
    //     description : "Need to build the View component for a task",
    //     statusId : 1,// maps to which status panel it belongs in 
    //     createdAt : "7/26/17",
    //     updatedAt : "7/27/17"
    //   }

    // ];


    return this.tasks;

  }

  addTask(task) {
    var newTask = {
      taskId : this.idSequence++,
      title : task.title,
      description : task.description,
      statusId : task.statusId,
      createdAt : "7/26/17", // TODO use timestamp
      updatedAt : "7/26/17" // TODO use timestamp

    }
    this.tasks.push(newTask);

    return this.tasks;

  }

  updateTask(task) {

    for(var i = 0; i < this.tasks.length; i++) {
      if(task.taskId === this.tasks[i].taskId) {
        this.tasks[i] = task;
        break;
      }
    }

    return this.tasks;

  }


  removeTask(taskId) {

    for(var i = 0; i < this.tasks.length; i++) {
      if(taskId === this.tasks[i].taskId) {
        this.tasks.splice(i, 1);
        break;
      }
    }

    return this.tasks;

  }


};

export default TaskManagerService;
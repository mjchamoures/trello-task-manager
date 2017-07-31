/* service file for all task related requests....for now just mocking REST calls
 * 
 * Author : Michael Chamoures
 * Date : 7/31/17
 *
 */ 

class TaskManagerService {

  constructor() {

    this.tasks = [];
    this.idSequence = 0;

  }

  getAllTasks() {

    return this.tasks;

  }

  addTask(task) {
    var createdAt = new Date().toString();
    var newTask = {
      taskId : this.idSequence++,
      title : task.title,
      description : task.description,
      panelId : task.panelId,
      createdAt : createdAt,
      updatedAt : createdAt
    };

    this.tasks.push(newTask);

    return this.tasks;

  }

  updateTask(task) {

    task.updatedAt = new Date().toString();

    for(var i = 0; i < this.tasks.length; i++) {
      if(task.taskId === this.tasks[i].taskId) {
        this.tasks[i] = Object.assign(this.tasks[i], task);
        break;
      }
    }

    return this.tasks.sort((a,b) => a.updatedAt > b.updatedAt);

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
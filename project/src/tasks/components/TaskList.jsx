import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateTaskInput from './CreateTaskInput.jsx';
import * as tasksActions from '../tasks.actions';
import { sortedTasksListSelector } from '../tasks.selectors';
import Task from './Task.jsx';

class TaskList extends Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  render() {
    const tasksList = this.props.tasks;
    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.props.createTask} />
        <ul className="list">
          {tasksList.map(tasks => (
            <Task
              key={tasks.id}
              {...tasks}
              onChange={() => this.props.updateTask(tasks.id)}
              onDelete={() => this.props.deleteTask(tasks.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = state => ({
  tasks: sortedTasksListSelector(state),
});

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
};

export default connect(mapState, mapDispatch)(TaskList);

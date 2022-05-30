import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const taskJsx = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type='checkbox' checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>{props.removeTask(task.id)}}>X</button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <div>{taskJsx}</div>
                <div>
                    <button onClick={()=>{props.changeTodoListFilter('all')}}>All</button>
                    <button onClick={()=>{props.changeTodoListFilter('active')}}>Active</button>
                    <button onClick={()=>{props.changeTodoListFilter('completed')}}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
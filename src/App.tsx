import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType}   from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(  [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "REACT/REDUX", isDone: false},

    ])
    // let [newTask, setTask] = useState<TaskType>({id: 1,
    //     title: '',
    //     isDone: true})
    let addTask = (e:string) => {
        let task: TaskType = {id: v1(), title: e, isDone: false}
        setTasks([task,...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID:string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    const changeTodoListFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }
    const changeIsDone = (id:string, isDone: boolean) => {
        setTasks(tasks.map(e => e.id===id ? {...e, isDone: isDone}: e))
    }
    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter = {changeTodoListFilter}
                changeIsDone = {changeIsDone}
                addTask = {addTask}
                filter = {filter}
            />
        </div>
    );
}

export default App;

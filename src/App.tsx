import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(  [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
        {id: 4, title: "REACT", isDone: false},

    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID:number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    const changeTodoListFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }
    const changeIsDone = (id:number, isDone: boolean) => {
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
            />
        </div>
    );
}

export default App;

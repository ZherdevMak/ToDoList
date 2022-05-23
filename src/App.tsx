import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Meat", isDone: true},
        {id: 2, title: "Fish", isDone: true},
        {id: 3, title: "Beer", isDone: true}
    ]
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks_1}/>
            <TodoList title={'What to buy'} tasks={tasks_2}/>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true}
    ]
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks_1}/>
            <TodoList title={'What to do'} tasks={tasks_1}/>
            <TodoList title={'What to learn'} tasks={tasks_1}/>
            <TodoList title={'What to buy'} tasks={tasks_1}/>
            {/*/!*<TodoList title={'What to read'} tasks={tasks_1}/>*!/*/}
            {/*/!*<TodoList title={'What to learn'}/>*!/*/}
            {/*/!*<TodoList title={'What to buy'}/>*!/*/}
            {/*/!*<TodoList title={'What to read'}/>*!/*/}
        </div>
    );
}

export default App;

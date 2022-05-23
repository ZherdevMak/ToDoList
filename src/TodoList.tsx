import React from 'react';
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
}
const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li>
                        <input type="checkbox" checked={props.tasks[0].isDone}/>
                        <span>{props.tasks[0].title}</span>
                    </li>
                    {/*<li>*/}
                    {/*    <input type="checkbox" checked={props.tasks[1].isDone}/>*/}
                    {/*    <span>{props.tasks[1].title}</span>*/}
                    {/*</li>*/}


                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
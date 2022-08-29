import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType} from '../../App';
import './ToDoLIst.css'
import {AddItemsForm} from '../AddItemsForm/AddItemsForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListsID: string) => void
    changeFilter: (value: FilterValuesType, toDoListsID: string) => void
    addTask: (title: string, toDoListsID: string) => void
    filter: FilterValuesType
    changeStatus: (taskId: string, isDone: boolean, toDoListsID: string) => void
    removeToDoList: (toDoListsID: string) => void
}

export function Todolist(props: PropsType) {
    const tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }

        return <li key={t.id}>
            <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const onClickRemoveToDoListHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.removeToDoList(props.id)
    }


    const addTask = (title: string) => {
      props.addTask(title, props.id)
    }
    return <div>
        <h3>
            {props.title}
            <button onClick={onClickRemoveToDoListHandler}>x</button>
        </h3>
        <AddItemsForm addItem={addTask}/>
        <ul>
            {tasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}



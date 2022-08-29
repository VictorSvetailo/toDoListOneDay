import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType} from '../../App';
import './ToDoLIst.css'
import {AddItemsForm} from '../AddItemsForm/AddItemsForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
    changeTaskTitle: (taskId: string, changeTitle: string, toDoListsID: string) => void
    changeToDoListTitle: (changeTitle: string, id: string) => void
}

export function Todolist(props: PropsType) {
    const tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitleHandler = (changeTitle: string) => {
            props.changeTaskTitle(t.id, changeTitle, props.id)
        }

        return <li key={t.id}>
            <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} changeTitle={changeTitleHandler}/>
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const onClickRemoveToDoListHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.removeToDoList(props.id)
    }

    const changeTitleToDoListHandler = (changeTitle: string) => {
        props.changeToDoListTitle(changeTitle, props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTitleToDoListHandler}/>
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



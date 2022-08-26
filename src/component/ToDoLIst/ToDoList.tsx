import React, {MouseEvent, FC, ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterTasksValueType} from '../../App';
import './ToDoLIst.css'


type PropsType = {
    id: string
    titleToDoList: string
    tasks: Array<ArrayTasksType>
    removeTask: (id: string, toDoListID: string) => void
    filterTask: (value: FilterTasksValueType, toDoListID: string) => void
    addTask: (titleNewTask: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    filter: FilterTasksValueType
    removeToDoList: (toDoListID: string) => void
}

export type ArrayTasksType = {
    id: string
    title: string
    isDone: boolean
}


export const ToDoList: FC<PropsType> = (props) => {

    const [error, setError] = useState<null | string>(null)

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }

        return (
            <li className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" onChange={onChangeCheckboxHandler} checked={t.isDone}/>{t.title}
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const onClickFilterAllHandler = () => props.filterTask('all', props.id)
    const onClickFilterActiveHandler = () => props.filterTask('active', props.id)
    const onClickFilterCompletedHandler = () => props.filterTask('completed', props.id)

    const [titleNewTask, setTitleNewTask] = useState('')
    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value)
        setError('')
    }
    const onClickAddTaskTitle = (e: MouseEvent<HTMLButtonElement>) => {
        if (titleNewTask.trim() !== '') {
            props.addTask(titleNewTask.trim(), props.id)
            setTitleNewTask('')
        } else {
            setError('error')
        }
    }
    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            if (titleNewTask !== '') {
                props.addTask(titleNewTask.trim(), props.id)
                setTitleNewTask('')
            } else if (titleNewTask === '') {
                setError('error')
            }
        }
    }

    const onClickRemoveHandler = (e: MouseEvent<HTMLButtonElement>) => {
      props.removeToDoList(props.id)
    }


    return (
        <div>
            <h3>{props.titleToDoList} <button onClick={onClickRemoveHandler}>x</button></h3>
            <div>
                <input
                    value={titleNewTask}
                    onChange={onChangeTextHandler}
                    onKeyPress={onKeyPressAddTaskHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTaskTitle}>+</button>
                <div className="height">
                    {error ? <p className={'error-message'}>Field title dont undefined</p> : ''}
                </div>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter == 'all' ? 'active-filter' : ''}
                        onClick={onClickFilterAllHandler}>All
                </button>
                <button className={props.filter == 'active' ? 'active-filter' : ''}
                        onClick={onClickFilterActiveHandler}>Active
                </button>
                <button className={props.filter == 'completed' ? 'active-filter' : ''}
                        onClick={onClickFilterCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};


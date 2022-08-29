import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }


    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <span>
            {editMode === true
                ? <input autoFocus onChange={changeTitleHandler} onBlur={activateViewMode} value={title}/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>}
        </span>
    )
}